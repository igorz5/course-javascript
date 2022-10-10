/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
const addDivButton = homeworkContainer.querySelector('#addDiv');
let currentDiv = null;
let dragStartX = 0;
let dragStartY = 0;

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function getRandomHexColor() {
  let color = '';
  for (let i = 0; i < 6; ++i) {
    color += Math.floor(Math.random() * 16).toString(16);
  }

  return '#' + color;
}

function mouseDownHandler(e) {
  if (currentDiv) return;

  currentDiv = e.target;
  dragStartX = e.clientX - e.target.offsetLeft;
  dragStartY = e.clientY - e.target.offsetTop;
}

function mouseUpHandler(e) {
  if (!currentDiv) return;

  e.preventDefault();

  currentDiv = null;
}

function mouseMoveHandler(e) {
  if (!currentDiv) return;

  e.preventDefault();

  const x = e.clientX - dragStartX;
  const y = e.clientY - dragStartY;

  currentDiv.style.left = x + 'px';
  currentDiv.style.top = y + 'px';
}

export function createDiv() {
  const div = document.createElement('div');
  const w = rand(50, 150);
  const h = rand(50, 150);
  div.className = 'draggable-div';
  div.style.backgroundColor = getRandomHexColor();
  div.style.width = w + 'px';
  div.style.height = h + 'px';
  div.style.left = rand(0, window.innerWidth - w) + 'px';
  div.style.top = rand(0, window.innerHeight - h) + 'px';
  div.style.userSelect = 'none';

  div.addEventListener('mousedown', mouseDownHandler);

  return div;
}

document.addEventListener('mouseup', mouseUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);
