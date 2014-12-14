(function(window) {
    'use strict';

    var Blob = window.Blob;
    var File = window.File;
    var FileList = window.FileList;
    var FormData = window.FormData;

    var isSupported = (Blob && File && FileList && FormData);
    var toString = Object.prototype.toString;
    var forEach = Array.prototype.forEach;
    var map = Array.prototype.map;

    if (!isSupported) return;

    /**
     * Returns type of anything
     * @param {Object} any
     * @returns {String}
     */
    function getType(any) {
        return toString.call(any).slice(8, -1);
    }
    /**
     * Converts path to FormData name
     * @param {Array} path
     * @returns {String}
     */
    function toName(path) {
        var array = map.call(path, function(value) {
            return '[' + value + ']';
        });
        array[0] = path[0];
        return array.join('');
    }

    /**
     * Converts object to FormData
     * @param {Object} object
     * @returns {FormData}
     */
    function toFormData(object) {
        var form = new FormData();
        var cb = function(node, value, key, path) {
            var type = getType(value);

            switch (type) {
                case 'Array':
                    break; // step into
                case 'Object':
                    break; // step into
                case 'FileList':
                    forEach.call(value, function(item, index) {
                        var way = path.concat(index);
                        var name = toName(way);
                        form.append(name, item);
                    });
                    return true; // prevent step into
                case 'File':
                    var name = toName(path);
                    form.append(name, value);
                    return true; // prevent step into
                case 'Blob':
                    var name = toName(path);
                    form.append(name, value, value.name);
                    return true; // prevent step into
                default:
                    var name = toName(path);
                    form.append(name, value);
                    return true; // prevent step into
            }
        };

        Object.traverse(object, cb, null, null, true);

        return form;
    }

    // export
    Object.toFormData = toFormData;

}(window));