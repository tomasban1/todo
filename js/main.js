
const h1Dom = document.querySelector('h1');
const formDom = document.forms[0];
const textImput = formDom.querySelector('input[type="text"]');
const colorImput = formDom.querySelector('input[type="color"]');
const submitBtn = formDom.querySelector('button');
const listDom = document.querySelector('.list');
const toastDom = document.getElementById('toast');
const msgtitle = toastDom.querySelector('.title');
const msgText = document.getElementById('msg');
const exitPopUpBtn = document.querySelector('.close > button');



let todoData = [];
const localToDoData = localStorage.getItem('tasks');

if (localToDoData !== null) {
    todoData = JSON.parse(localToDoData);
    renderList();
}


submitBtn.addEventListener('click', e => {
    e.preventDefault();


    const validationMsg = isValidText(textImput.value);
    if (validationMsg !== true) {
        showToastError(validationMsg);
        return;
    }

    todoData.push({
        state: 'todo',
        task: textImput.value.trim(),
        color: colorImput.value,
        createdAt: Date.now(),
    });

    localStorage.setItem('tasks', JSON.stringify(todoData))

    textImput.value = '';
    renderList();

    showToastSuccess('Task created successfully');
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
            <article class="item" data-state="${todo.state}" style="border-left-color: ${todo.color};">
                <div class="date">${formatTime(todo.createdAt)}</div>
                <div class="state">Task completed</div>
                <div class="text">${todo.task}</div>
                <form class="hidden">
                <input type="text" value="${todo.task}">
                    <button class="update" type="submit">Update</button>
                    <button class="cancel" type="button">Cancel</button>
                </form>
                <div class="actions">
                    <button class="done">Done</button>
                    <div class="divider"></div>
                    ${todo.state === 'done' ? '' : '<button class="edit">Edit</button>'}
                    <button class="delete">Delete</button>
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

        const updateBtn = articleDom.querySelector('button.update');
        if (updateBtn !== null) {
            updateBtn.addEventListener('click', e => {
                e.preventDefault();
                todoData[i].task = updateImputDom.value.trim();

                const validationMsg = isValidText(updateImputDom.value);
                if (validationMsg !== true) {
                    showToastError(validationMsg);
                    return;
                }
                localStorage.setItem('tasks', JSON.stringify(todoData))
                renderTaskList();
                showToastInfo('Information successfully updated.');
            });
        }


        const cancelBtn = articleDom.querySelector('button.cancel');
        if (cancelBtn !== null) {
            cancelBtn.addEventListener('click', () => {
                editFormDom.classList.add('hidden');
            });
        }


        const doneBtn = articleDom.querySelector('button.done');
        if (doneBtn !== null) {
            doneBtn.addEventListener('click', () => {
                todoData[i].state = 'done';
                localStorage.setItem('tasks', JSON.stringify(todoData));
                renderTaskList();
            })
        }


        const editBtn = articleDom.querySelector('button.edit');
        if (editBtn !== null) {
            editBtn.addEventListener('click', () => {
                editFormDom.classList.remove('hidden')
            });
        }


        const deleteBtn = articleDom.querySelector('button.delete');
        if (deleteBtn !== null) {
            deleteBtn.addEventListener('click', () => {
                todoData.splice(i, 1)
                showToastSuccess('Task successfully deleted.');
                localStorage.setItem('tasks', JSON.stringify(todoData))
                renderTaskList();
            });
        }

    }
}

function formatTime(timeInMs) {
    const now = new Date(timeInMs);
    const currentDate = new Date().toJSON().slice(0, 10);
    let hours = now.getHours();
    let minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    let seconds = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
    if (hours < 10) {
        '0' + hours
    }

    return `Task created ${currentDate}, ${hours}:${minutes}:${seconds}`
}
function isValidText(text) {
    if (text.trim() === '') {
        return 'Text field should not be composed of spaces'
    }
    if (text === '') {
        return 'Text field should not be empty'
    }
    if (text[0].toUpperCase() !== text[0]) {
        return 'The first letter should be uppercase.'
    }


    return true;

}

function showToast(state, title, msg) {
    toastDom.classList.add('active');
    toastDom.dataset.state = state;
    msgtitle.textContent = title;
    msgText.textContent = msg;
}

function showToastSuccess(msg) {
    showToast('success', 'Success', msg);
}

function showToastInfo(msg) {
    showToast('info', 'Info', msg);
}

function showToastWarning(msg) {
    showToast('warning', 'Warning', msg);
}

function showToastError(msg) {
    showToast('error', 'Error', msg);
}


exitPopUpBtn.addEventListener('click', () => {
    toastDom.classList.remove('active')
})


const sortingListDom = document.querySelector('.list-actions');
const sortingButtons = sortingListDom.querySelectorAll('button');

const sortingBtnTime09 = sortingButtons[0];
sortingBtnTime09.addEventListener('click', () => {
    sortingListDom.querySelector('.active').classList.remove('active');
    sortingBtnTime09.classList.add('active');
    todoData.sort((a, b) => a.createdAt - b.createdAt);
    renderTaskList();
});

const sortingBtnTime90 = sortingButtons[1];
sortingBtnTime90.addEventListener('click', () => {
    sortingListDom.querySelector('.active').classList.remove('active');
    sortingBtnTime90.classList.add('active');
    todoData.sort((a, b) => b.createdAt - a.createdAt);
    renderTaskList();
});

const sortingBtnColorAZ = sortingButtons[2];
sortingBtnColorAZ.addEventListener('click', () => {
    sortingListDom.querySelector('.active').classList.remove('active');
    sortingBtnColorAZ.classList.add('active');
    todoData.sort((a, b) => (a.color < b.color) ? -1 : (a.color === b.color) ? 0 : 1);
    renderTaskList();
});

const sortingBtnColorZA = sortingButtons[3];
sortingBtnColorZA.addEventListener('click', () => {
    sortingListDom.querySelector('.active').classList.remove('active');
    sortingBtnColorZA.classList.add('active');
    todoData.sort((a, b) => (b.color < a.color) ? -1 : (b.color === a.color) ? 0 : 1);
    renderTaskList();
});

const sortingBtnNameAZ = sortingButtons[4];
sortingBtnNameAZ.addEventListener('click', () => {
    sortingListDom.querySelector('.active').classList.remove('active');
    sortingBtnNameAZ.classList.add('active');
    todoData.sort((a, b) => (a.task < b.task) ? -1 : (a.task === b.task) ? 0 : 1);
    renderTaskList();
});

const sortingBtnNameZA = sortingButtons[5];
sortingBtnNameZA.addEventListener('click', () => {
    sortingListDom.querySelector('.active').classList.remove('active');
    sortingBtnNameZA.classList.add('active');
    todoData.sort((a, b) => (b.task < a.task) ? -1 : (b.task === a.task) ? 0 : 1);
    renderTaskList();
});