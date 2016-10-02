angular.module('app')
        .filter("capitalize", function () {
            return function (text) {
                if (text !== null) {
                    return text.substring(0, 1).toUpperCase() + text.substring(1);
                }
            };
        })
        .filter("toUpper", function () {
            return function (text) {
                if (text !== null) {
                    return text.toUpperCase();
                }
            };
        })
        .filter("maxLength", function () {
//            {{ user.nombre | maxLength : 5 | capitalize }}
            return function (text, max) {
                if (text !== null) {
                    if (text.length > max) {
                        return text.substring(0, max) + "...";
                    }
                    if (text.length <= max) {
                        return text;
                    }
                }
            };
        })
        ;