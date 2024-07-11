
const h1Dom = document.querySelector('h1');
const formDom = document.forms[0];
const textImput = formDom.querySelector('input');
const submitBtn = formDom.querySelector('button');
const listDom = document.querySelector('.list');
const actionDom = listDom.querySelectorAll('button');
const doneBtn = actionDom[0];
const editBtn = actionDom[1];
const deleteBtn = actionDom[2];



let listNum = 0;
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    listDom.classList.remove('empty');
    if (listDom.textContent.includes('Empty')) {
        listDom.textContent = '';
    }

    h1Dom.textContent = `To do (${listNum += 1})`;

    let HTML = `
        <article class="item">
            <div class="text">${textImput.value}</div>
            <div class="actions">
                <button>Done</button>
                <div class="divider"></div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </article>`
    listDom.innerHTML += HTML;
    textImput.value = '';

    const actionDom = listDom.querySelectorAll('button');
    const doneBtn = actionDom[0];
    const editBtn = actionDom[1];
    const deleteBtn = actionDom[2];




});


document.body.addEventListener('click', function (e) {
    if (e.target == submitBtn) {
        doneBtn.addEventListener('click', () => {
            console.log('labas');
        });
    }
});

/* 
editBtn.addEventListener('click', () => {
    console.log('Labas edit');
}); */