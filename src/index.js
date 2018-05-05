/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {

    for (var i = 0; i < array.length; i++ ) {
        fn (array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let results = [];

    for (let i = 0; i < array.length; i++ ) {
        results.push(fn(array[i], i, array) );
    }

    return results;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let initialVal = initial ? initial : array[0];
    let increment = initial ? 0 : 1;

    for (let i = increment; i < array.length; i++) {
        initialVal = fn(initialVal, array[i], i, array);
    }

    return initialVal;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
 upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    return Object.keys(obj).map(function (name) {

        return name.toUpperCase();
    });
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

function slice(array, from, to=array.length) {

    if (arguments.length <= 1) {
        return array
    }

    let newArr = [],
        length = array.length;

    if (from < 0) {
        from = length + from;
    }

    if (to < 0) {
        to = length + to;
    }

    for (let i = 0; i < length; i++) {
        if (i >= from && i < to) {
            newArr.push(array[i]);
        }
    }

    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });
}

/*const createProxy = obj => new Proxy(obj, {
    set(obj, prop, value) {
        obj[prop] = value * value;

        return true;
    }
});*/

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
