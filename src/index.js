var StringMask = require('string-mask')

module.exports = require('angular')
  .module('angular-phone-input', [])
  .directive('phoneNumber', phoneDirective)
  .name

function phoneDirective () {
  return {
    restrict: 'EA',
    require: 'ngModel',
    link: link
  }
}

function link (scope, element, attrs, ctrl) {
  var phoneMask = new StringMask('000-000-0000')

  function removeNonDigits (value) {
    return value.replace(/[^0-9]/g, '')
  }

  function applyPhoneMask (value) {
    var formatedValue
    formatedValue = phoneMask.apply(value) || ''
    return formatedValue.trim().replace(/[^0-9]$/, '')
  }

  function formatter (value) {
    if (ctrl.$isEmpty(value)) {
      return value
    }

    return applyPhoneMask(removeNonDigits(value))
  }

  function parser (value) {
    if (ctrl.$isEmpty(value)) {
      return value
    }

    var formatedValue = applyPhoneMask(removeNonDigits(value))
    var actualValue = removeNonDigits(formatedValue)

    if (ctrl.$viewValue !== formatedValue) {
      ctrl.$setViewValue(formatedValue)
      ctrl.$render()
    }

    return actualValue
  }

  function validator (value) {
    var valid = ctrl.$isEmpty(value) || (value.length > 9)
    ctrl.$setValidity('phoneNumber', valid)
    return value
  }

  ctrl.$formatters.push(formatter)
  ctrl.$formatters.push(validator)
  ctrl.$parsers.push(parser)
  ctrl.$parsers.push(validator)
}
