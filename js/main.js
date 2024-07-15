
const h1Dom = document.querySelector('h1');
const formDom = document.forms[0];
const textImput = formDom.querySelector('input');
const submitBtn = formDom.querySelector('button');
const listDom = document.querySelector('.list');
const toastDom = document.getElementById('toast');
const msgtitle = toastDom.querySelector('.title');
const msgText = document.getElementById('msg');
const exitPopUpBtn = document.querySelector('.close > button');



const todoData = [];
let listNum = 0;
submitBtn.addEventListener('click', e => {
    e.preventDefault();

    if (textImput.value === ''
        || textImput.value[0].toUpperCase() !== textImput.value[0]) {
        listNum = 0
    } else {
        h1Dom.textContent = `To do (${listNum += 1})`;
    }


    if (!isValidText(textImput.value)) {
        return;
    }

    todoData.push({
        task: textImput.value.trim(),
        createdAt: Date.now(),
    });

    toastDom.classList.add('active');
    toastDom.setAttribute('data-state', 'success');
    msgtitle.textContent = 'GREAT SUCCESS!';
    msgText.textContent = 'Task successfully added.'

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
            if (!isValidText(updateImputDom.value)) {
                listNum += 0;
                return;
            }
            todoData[i].task = updateImputDom.value.trim();

            toastDom.classList.add('active');
            toastDom.setAttribute('data-state', 'info');
            msgtitle.textContent = 'GREAT SUCCESS!';
            msgText.textContent = 'Your task has been successfully updated'

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

            toastDom.classList.add('active');
            toastDom.setAttribute('data-state', 'success');
            msgtitle.textContent = 'GREAT SUCCESS!';
            msgText.textContent = 'Task successfully deleted'

            renderTaskList();
        });
    }
}

function formatTime(timeInMs) {
    const now = new Date(timeInMs);
    const currentDate = new Date().toJSON().slice(0, 10);
    let hours = now.getHours();
    let minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    let seconds = now.getSeconds();
    if (hours < 10) {
        '0' + hours
    }
    if (minutes < 10) {
        '0' + minutes
    }
    return `Task created ${currentDate}, ${hours}:${minutes}:${seconds}`
}
function isValidText(text) {
    if (text.trim() === '') {
        toastDom.classList.add('active');
        toastDom.setAttribute('data-state', 'warning');
        msgtitle.textContent = 'SORRY...';
        msgText.textContent = 'Text field should not be empty'
        return false
    }
    if (text[0].toUpperCase() !== text[0]) {
        toastDom.classList.add('active');
        toastDom.setAttribute('data-state', 'warning');
        msgtitle.textContent = 'SORRY...';
        msgText.textContent = 'The first letter should be uppercase.'
        return false
    }
    listNum = 0

    return true;

}

exitPopUpBtn.addEventListener('click', () => {
    toastDom.classList.remove('active')
})
