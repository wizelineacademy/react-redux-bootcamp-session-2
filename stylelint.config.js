module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  rules: {
    'declaration-property-value-disallowed-list': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
};
