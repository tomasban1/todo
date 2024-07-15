
const h1Dom = document.querySelector('h1');
const formDom = document.forms[0];
const textImput = formDom.querySelector('input');
const submitBtn = formDom.querySelector('button');
const listDom = document.querySelector('.list');



const todoData = [];
let listNum = 0;
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    listDom.classList.remove('empty');

    h1Dom.textContent = `To do (${listNum += 1})`;

    if (textImput.value.length === 0) {
        return;
    }

    todoData.push({
        task: textImput.value,
        createdAt: Date.now(),
    });


    textImput.value = '';
    renderList();
});

function renderList() {
    if (todoData.length === 0) {
        renderEmptyList();
    } else {
        renderTaskList();
    }
}

function renderEmptyList() {
    listDom.classList.add('empty');
    listDom.textContent = 'Empty';
}

function renderTaskList() {
    let HTML = ``;
    for (const todo of todoData) {
        HTML += `
            <article class="item">
                <div class="date">${formatTime(todo.createdAt)}</div>
                <div class="text">${todo.task}</div>
                <form class="hidden">
                <input type="text">
                    <button type="submit">Update</button>
                    <button type="button">Cancel</button>
                </form>
                <div class="actions">
                    <button>Done</button>
                    <div class="divider"></div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </article>`
    }
    listDom.innerHTML = HTML;
    listDom.classList.remove('empty');


    const articlesDom = document.querySelectorAll('article');

    for (let i = 0; i < articlesDom.length; i++) {
        const articleDom = articlesDom[i];
        const editFormDom = articleDom.querySelector('form');
        const updateImputDom = editFormDom.querySelector('input');
        const buttonsDom = articleDom.querySelectorAll('button');

        const updateBtn = buttonsDom[0];
        updateBtn.addEventListener('click', e => {
            e.preventDefault();
            todoData[i].task = updateImputDom.value;
            renderTaskList();
        });

        const cancelBtn = buttonsDom[1];
        cancelBtn.addEventListener('click', () => {
            editFormDom.classList.add('hidden');
        });

        const editBtn = buttonsDom[3];
        editBtn.addEventListener('click', () => {
            editFormDom.classList.remove('hidden')
        });

        const deleteBtn = buttonsDom[4];
        deleteBtn.addEventListener('click', () => {
            todoData.splice(i, 1)
            h1Dom.textContent = `To do (${listNum -= 1})`;
            renderTaskList();
        });
    }
}

function formatTime(timeInMs) {
    const now = new Date();
    const currentDate = new Date().toJSON().slice(0, 10);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `Task created ${currentDate}, ${hours}:${minutes}`
}
