/*
 object-to-formdata v0.1.0
 https://github.com/nervgh/object-to-formdata
*/
(function(window) {
    'use strict';

    var Blob = window.Blob;
    var File = window.File;
    var FileList = window.FileList;
    var FormData = window.FormData;

    var isSupported = (Blob && File && FileList && FormData);
    var forEach = Array.prototype.forEach;
    var map = Array.prototype.map;

    if (!isSupported) return;

    /**
     * Returns "true" if any is Blob
     * @param {*} any
     * @returns {Boolean}
     */
    function isBlob(any) {
        return any instanceof Blob;
    }
    /**
     * Returns "true" if any is File
     * @param {*} any
     * @returns {Boolean}
     */
    function isFile(any) {
        return any instanceof File;
    }
    /**
     * Returns "true" if any is isFileList
     * @param {*} any
     * @returns {Boolean}
     */
    function isFileList(any) {
        return any instanceof FileList;
    }
    /**
     * Returns "true" if any is object
     * @param {*} any
     * @returns {Boolean}
     */
    function isObject(any) {
        return any instanceof Object;
    }
    /**
     * Returns "true" if any is array
     * @param {*} any
     * @returns {Boolean}
     */
    function isArray(any) {
        return any instanceof Array;
    }
    /**
     * Returns "true" if any is object
     * @param {*} any
     * @returns {Boolean}
     */
    function isPlainObject(any) {
        if (!isObject(any)) return false;
        var prototype = Object.getPrototypeOf(any);
        return Object.prototype === prototype;
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
     * Converts object to FormData & returns it
     * @param {Object} object
     * @returns {FormData}
     */
    function toFormData(object) {
        var form = new FormData();
        var cb = function(node, value, key, path) {
            if (isObject(value)) {
                if (isFileList(value)) {
                    forEach.call(value, function(item, index) {
                        var way = path.concat(index);
                        var name = toName(way);
                        form.append(name, item);
                    });
                    return true;
                } else if (isFile(value)) {
                    var name = toName(path);
                    form.append(name, value);
                    return true;
                } else if (isBlob(value)) {
                    var name = toName(path);
                    form.append(name, value, name);
                    return true;
                } else if (!isArray(value) && !isPlainObject(value)) {
                    return true;
                }
            } else {
                var name = toName(path);
                form.append(name, value);
            }
        };

        Object.traverse(object, cb, null, null, true);

        return form;
    }

    // export
    Object.toFormData = toFormData;

}(window));