/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import { loadAndSortTowns } from './functions';
import './towns.html';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return loadAndSortTowns();
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let towns = [];
let townsLoaded = false;

loadingBlock.classList.add('hidden');
loadingFailedBlock.classList.add('hidden');
filterBlock.classList.add('hidden');

retryButton.addEventListener('click', () => {
  tryLoadTowns();
});

filterInput.addEventListener('input', function () {
  tryLoadTowns().then(() => showFilteredTowns(this.value));
});

function tryLoadTowns() {
  loadingBlock.classList.remove('hidden');
  loadingFailedBlock.classList.add('hidden');
  filterBlock.classList.add('hidden');

  return new Promise((res) => {
    if (townsLoaded) {
      res();
      return;
    }

    loadAndSortTowns()
      .then((data) => {
        towns = data;
        townsLoaded = true;

        loadingBlock.classList.add('hidden');
        filterBlock.classList.remove('hidden');

        res();
      })
      .catch(() => {
        loadingFailedBlock.remove('hidden');
      })
      .finally(() => {
        loadingBlock.classList.add('hidden');
      });
  });
}

function showFilteredTowns(filter) {
  filterResult.innerHTML = '';

  if (filter) {
    for (const town of towns) {
      if (isMatching(town.name, filter)) {
        const el = document.createElement('div');
        el.textContent = town.name;

        filterResult.appendChild(el);
      }
    }
  }
}

export { loadTowns, isMatching };
