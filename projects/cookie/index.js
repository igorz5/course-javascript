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

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
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

filterNameInput.addEventListener('input', function (e) {
  displayCookies(e.target.value);
});

addButton.addEventListener('click', () => {
  const name = addNameInput.value;
  const value = addValueInput.value;

  if (name.length !== 0 && value.length !== 0) {
    addCookie(name, value);
  }
});

function getCookies() {
  if (document.cookie.length === 0) {
    return {};
  }

  const split = document.cookie.split('; ');
  return split.reduce((acc, str) => {
    const [k, v] = str.split('=');
    acc[k] = v;

    return acc;
  }, {});
}

function addCookie(name, value) {
  document.cookie = `${name}=${value}`;

  displayCookies(filterNameInput.value);
}

function deleteCookie(cookie) {
  document.cookie = `${cookie}=;expires=${new Date(0)}`;
}

function displayCookies(filter = '') {
  listTable.innerHTML = '';

  const cookies = getCookies();
  for (const [k, v] of Object.entries(cookies)) {
    if (!k.includes(filter) && !v.includes(filter)) {
      continue;
    }

    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const value = document.createElement('td');
    const deleteWrap = document.createElement('td');
    const deleteBtn = document.createElement('button');

    name.textContent = k;
    value.textContent = v;
    deleteBtn.textContent = 'Delete';
    deleteWrap.append(deleteBtn);

    deleteBtn.addEventListener('click', () => {
      deleteCookie(k);

      tr.remove();
    });

    tr.append(name, value, deleteWrap);
    listTable.append(tr);
  }
}

displayCookies();
