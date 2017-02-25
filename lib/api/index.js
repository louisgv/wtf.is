"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WTF = function () {
  function WTF() {
    _classCallCheck(this, WTF);
  }

  _createClass(WTF, null, [{
    key: "is",
    value: function is(name) {

      // TODO: Get CWD

      // TODO: If CWD is `bin`, invoke `man $filename`

      // TODO: If `man` success, print out the data.

      // TODO: If `man` returns nothing, continue

      // TODO: Check if filename exist in our database.

      // TODO: If name exist, get the metadata for this file

      // TODO: Get a list of sibling directory

      // TODO: If 50% of sibling directory doesn't
      // match data.siblingDirs, role up a FLAG for unreliable data.


      // TODO: Get a list of sibling files

      // TODO: If 50% of sibling files doesn't
      // match data.siblingDirs, role up a FLAG for unreliable data.


      // TODO: Get filesize

      // TODO: If file size is bigger than data.maxSize,
      // roll up a FLAG for unconventional file

      // TODO: If the filesize is smaller than data.minSize,
      // roll up a FLAG for unconventional file

      return {
        usage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        siblings: ['node_modules']
      };
    }
  }]);

  return WTF;
}();

exports.default = WTF;
;