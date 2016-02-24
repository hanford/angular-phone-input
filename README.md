## angular-phone-input

[Live Demo!](https://hanford.github.io/angular-phone-input)

[![NPM][star-icon]][star-url]

#### Installation  
Installation is super easy, simply add the dependencies to your build and add the ```phone-input``` attribute to your input.

```
# use npm
$ npm install angular-phone-input --save
```

Add angular-phone-input to your dependencies

```
// your app
angular
  .module('yourApp', ['angular-phone-input'])
  .controller('SampleController', function () {})
```

```
// template.html
<input ng-model="value" phone-number type="tel">
```

[star-icon]: https://nodei.co/npm/angular-phone-input.png?downloads=true
[star-url]: https://npmjs.org/package/angular-phone-input
