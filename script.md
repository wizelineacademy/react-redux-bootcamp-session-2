Hi, I'm going to talk about some redux libraries to handle async code

But first lets recap on redux,
redux store on its simplest it has 3 parts, dispatch, getState, and subscribe 
the store is created by providing a reducer
* a reducer is intended to be a pure function, which will hold the state and react based on actions.
  - Pure function is a function that does not have side effects and is predictable, like example
  - Impure function is the opposite, like example
  - It needs initial state and accepts a plain object called action which contain at least a `type` which then can trigger a change in the current state
    - reducer example, how it works on its own reducer(initialState, action) => state
* a redux store is like, example
  const createStore = (reducer) => { 
    let state;
    const listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener())
    }
    const subscribe = (listener) => listeners.push(listener);
    dispatch({ type: 'SomeKeyThatNoOneShouldUseAsAType' })
    return {
      listeners, getState, dispatch,
    }
  }
* It uses the observer pattern for notifying about changes, what is observer?
  subject maintains a list of observers and notifies them about changes.
  example of it, observe state change
    - also Dispatch plain object, and talk about action creators which is just a function that constructs the plain object.

Now that you have the idea of how it works, lets go back to libraries for async code.

So redux tells you, that your actions should be plain objects.

so you can do example:
  getUserData(email)
    .then((userData) => dispatch(userLoaded(userData)))
    .catch((error) => dispatch(userError(email, error)))
or with callbacks
  getUserData(email, onUserData, onError);
  onUserData(userData) {
    dispatch(userLoaded(userData))
  }
  onError(error) {
    dispatch(userLoaded(userData))
  }

Although that may work for simple case scenarios, if you want to reuse your code, then you have to inject the dispatch all over the place
  If you add dispatch to the callback signature of the method, then altering this original signature can introduce breaking changes which may not be that good

So basically redux solved that issue by enabling users to add something called middleware
which by definition is bridge to fill gaps between applications and tools
 - Go here if you want to dig into the origins: https://github.com/reduxjs/redux/pull/55
So that is what it does, it fills some gaps like what if I want to dispatch some async code?
Then the middleware runs on top of the create store so it can tune up the dispatch method, which enables us to perform actions other than just plain objects.

so how that works?
  - add other parameters to the create store, which chan be a function that acts as an enhancer
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(rootReducer); // curry FTW explain curry/composition (https://stackoverflow.com/questions/36273977/are-currying-and-composition-the-same-concept-in-javascript#:~:text=they%20are%20related%20concepts%2C%20but,pre%2Ddefine%20part%20of%20one.)
  }
  - as mentioned it works on top of create store, as it will add more functionalities, it sends the function itself so the enhancer has to create the store, and send the reducer
  - they also provided a function that acts as this enhancer applyMiddleware which takes an array of middlewares
    - the signature for a middleware is ({dispatch, getState}) => (next) => (action) => {} https://redux.js.org/faq/design-decisions#why-does-the-middleware-signature-use-currying
    - this function tunes up the dispatch function using composition, taking the idea from routers like next, where you chain the calls of every middleware so the output of the first middleware is the input of the next middleware
    - explain simple applyMiddleware

Now you may have a general idea of the middleware we will focus on the signature:
({dispatch, getState}) => (next) => (action) => {} 
we can create middlewares that are simple as a logger like:
  const logger = ({dispatch, getState}) => (next) => (action) => {
    console.log(action)
    return next(action);
  } 

or we can create something as complex redux-sagas or redux-thunk
redux thunk is the simplest, why?
  const thunk = ({dispatch, getState}) => (next) => (action) => {
    if (typeof action === 'function') {
      action(dispatch)  // has to be dispatch to start over in case of triggering a new function call
    }
    return next(action);
  } 

  thunk, logger
  thunk => logger

  getUser(email) => (dispatch) => {
    return getUserData(email)
      .then((userData) => dispatch(userLoaded(userData)))
      .catch((error) => dispatch(userError(email, error)))
  }

const promise = dispatch(getUser(email))
promise.then(console.log) // will log the last action
exampleeeee!!!


But now lest go to something heavy, redux-sagas, this was created with testing in mind, it make your code looks synchronous, and you business logic functions may get focused on do their stuff and not worrying about the dispatch :iuck:
but you have to understand how a generator works? what is a generator
a function that allows you to pause and re-enter the function as needed.
generator example plus trick of `const y = yield (x + 2)` https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator

I will not go over the codebase for that as yeah is really complex and it will a lot of sessions to cover it, but I will go with some basic examples for that
first you need to configure your store add your middleware (hot wo to do it?)
and yes, you guess right (I know you don't), you also need to start the main generator by running your saga
sagaMiddleware.run(rootSaga);

function* rootSaga() {
  yield 1;
}
run simple example

but the true power comes when you use the effects they provide like `take` or `put`
function* rootSaga() {
  yield take('INCREMENT_COUNTER');
  yield put(counterIncrement());
}

what if I want to do listen for every increment action? use a `while` loop or `takeEvery`

what if I have multiple options, like increment or decrement?

function *counterIncrement() {
  yield put(counterIncrement());
}

function* rootSaga() {
    cont task = fork yield takeEvery(['INCREMENT_COUNTER'], counterIncrement);
    yield takeEvery(['DECREMENT_COUNTER'], counterIncrement); 
}

//multiple option 1
function *counterStuff(action) {
  if (action.type === 'INCREMENT.....)
}

function* rootSaga() {
    yield takeEvery(['INCREMENT_COUNTER', 'DECREMENT_COUNTER'], counterStuff);
}

// better
function* rootSaga() {
    yield all([incrementCounter(), decrementCounter()]);
}

// option B using fork or spawn, fork returns the task which enables soft cancellation.
how to cancel task example

// using call instead of direct execution of the generator, mainly for testing.

// example with channels

By now you have seen sagas and thunks working on its own, they don't even know or care about react
So lets go to a simple example an app to take notes
  basically it can create/update/delete text, counter, to do list or drawing notes
    - Notes have title
    - Text is a textarea
    - Counter is a field where you can add any counters and add a name to the counter
    - To Do list is a list of fields where you can add new items check them uncheck them and remove them
    - Drawing just lets you draw in a canvas, the image is saved as text (because it must be serializable)
      - Drawing is saved if there are changes and if the user haven't made any changes for N milliseconds.
    - Notes can be imported or exported

Default code
Thunks
  - Code with some thunk that listens for changes every N milliseconds for canvas
  - Code to handle import/export
Sagas
  - Code with saga that listens for changes every N milliseconds for canvas
  - Code to handle import/export
Connect them by using react-redux


