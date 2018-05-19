/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    upCookie();
});

addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    upCookie();
});

function filterCookie (full, part) {
    const hasMatch = full.toLowerCase().search(new RegExp(part.toLocaleLowerCase(), 'i')) < 0;

    return hasMatch ? false : true;
}

function listCookie (cookie) {

    if (filterNameInput.value) {

        for (var i = 0; i < cookie.length; i++) {
            if (filterCookie(cookie[i], filterNameInput.value)) {
                addCookie(cookie);

                return;
            }
        }
    } else {
        addCookie(cookie);
    }
}

function upCookie() {
    listTable.innerHTML = '';

    if (document.cookie) {
        var cookieArray = document.cookie.split('; ');

        cookieArray.forEach(function (item) {
            return listCookie(item.split('='));
        });
    }
}

upCookie();

function addCookie (cookie) {
    let tr = document.createElement('tr'),
        buttonDell = document.createElement('button'),
        fragment = document.createDocumentFragment();

    buttonDell.innerText = 'Убрать cookie';

    buttonDell.addEventListener('click', function () {
        let cookieTimer = new Date();

        cookieTimer.setTime(cookieTimer.getTime() - 1);
        document.cookie = cookie[0] += '=; expires=' + cookieTimer.toGMTString();
        upCookie();
    });

    cookie.forEach(function (item) {
        let td = document.createElement('td');

        td.innerText = item;
        fragment.appendChild(td);
    });

    let td = document.createElement('td');

    td.appendChild(buttonDell);
    fragment.appendChild(td);
    tr.appendChild(fragment);
    listTable.appendChild(tr);
}
