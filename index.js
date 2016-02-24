var StringMask = require('string-mask')

angular.module('angular-phone-input')
  .directive('phoneInput', function () {
    var phoneMaskUS = new StringMask('(000) 000-0000')

    function removeNonDigits (value) {
      return value.replace(/[^0-9]/g, '')
    }

    function applyPhoneMask (value) {
      var formatedValue
      formatedValue = phoneMaskUS.apply(value) || ''
      return formatedValue.trim().replace(/[^0-9]$/, '')
    }

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
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
          ctrl.$setValidity('usPhoneNumber', valid)
          return value
        }

        ctrl.$formatters.push(formatter)
        ctrl.$formatters.push(validator)
        ctrl.$parsers.push(parser)
        ctrl.$parsers.push(validator)
      }
    }
  })
