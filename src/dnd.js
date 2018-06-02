/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const elementDiv = document.createElement('div');

    elementDiv.className = 'draggable-div';
    elementDiv.style.height = getRandomVal(30, 600) + 'px';
    elementDiv.style.width = getRandomVal(30, 600) + 'px';
    elementDiv.style.left = getRandomVal(0, 600) + 'px';
    elementDiv.style.top = getRandomVal(0, 600) + 'px';
    elementDiv.style.position = 'absolute';
    elementDiv.style.backgroundColor = getRandomColor();

    return elementDiv;
}

function getRandomVal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var r = getRandomVal(0, 255);
    var g = getRandomVal(0, 255);
    var b = getRandomVal(0, 255);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.onmousedown = function (e) {

        var coords = getCoords(target),
            coordX = e.pageX - coords.left,
            coordY = e.pageY - coords.top;

        target.style.position = 'absolute';
        document.body.appendChild(target);
        moveRect(e);

        function moveRect(e) {
            target.style.top = e.pageY - coordY + 'px';
            target.style.left = e.pageX - coordX + 'px';
        }

        document.onmousemove = function (e) {
            moveRect(e);
        };

        target.onmouseup = function () {
            document.onmousemove = null;
            target.onmouseup = null;
        };

    };

    target.ondragstart = function () {
        return false;
    };

    function getCoords(elem) {
        const box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
