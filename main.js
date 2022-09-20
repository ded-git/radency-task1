import { storageNotes, buttonCreate, imgCatgSrc, month } from "./constants.js";

const main = document.querySelector('#main');//list
const createBtn = document.querySelector('#createBtn');//createBTN
createBtn.classList.add('btn-create')
const addBtn = document.querySelector('#addBtn');//addBtn
const formInput = document.querySelector('#formInput');//input

//form inputs
let inputName = document.querySelector('#inputName');
let inputCatg = document.querySelector('#inputCatg');
let inputContent = document.querySelector('#inputContent');
let inputDate = document.querySelector('#inputDate');

// 
let category = document.querySelector('#category');
let archive = document.querySelector('#archive')

createBtn.addEventListener('click', toggleAddingForm)
addBtn.addEventListener('click', addNewTask)

renderList(storageNotes);
renderCategory(storageNotes);

function toggleAddingForm() {
    buttonCreate.active = !buttonCreate.active;
    createBtn.innerHTML = buttonCreate.active ? buttonCreate.noVal : buttonCreate.yesVal;
    formInput.classList.toggle('form--hidden');
}

function addNewTask(event) {
    event.preventDefault();

    let newItemList = {
        id: storageNotes.length + 1,
        isArchived: false,
        title: inputName.value,
        created: `
        ${month[new Date().getMonth()].slice(0, 3)} 
        ${(String(new Date().getDate()).length == 2)
                ? new Date().getDate() : '0' + new Date().getDate()}, 
         ${new Date().getFullYear()}`,
        category: inputCatg.value,
        content: inputContent.value,
        dates: [inputDate.value.split('-').reverse().join('-').replace(/\-/g, '/')],
    }

    try {
        if (!inputName.value || !inputCatg.value || !inputContent.value) {
            throw new Error('fill text input field')
        }
        storageNotes.push(newItemList);
    } catch (err) {
        alert(err)
    }

    inputName.value = '';
    inputCatg.value = '';
    inputContent.value = '';
    inputDate.value = '';


    renderList(storageNotes);
}

function createActionBtn() {
    let imgBtnWrapper = document.createElement('div');
    imgBtnWrapper.classList.add('icon-btn-wrapper');

    let iconEdit = document.createElement('img');
    iconEdit.classList.add('icon');
    iconEdit.src = '/icons/edit.png';

    let iconSave = document.createElement('img');
    iconSave.classList.add('icon');
    iconSave.style.display = 'none';
    iconSave.src = '/icons/tick.png'

    iconEdit.addEventListener('click', function editListItem(event) {
        let itemsText = event.target.closest('li').querySelectorAll('p:not(:nth-child(3))');

        iconSave.style.display = 'inline';
        this.style.display = 'none';


        let inputName = document.createElement('input');
        inputName.value = itemsText[0].textContent;
        itemsText[0].textContent = '';
        itemsText[0].appendChild(inputName);


        let inputSelect = document.createElement('select');
        let task = document.createElement('option');
        task.value = 'task';
        task.textContent = 'task';
        if (itemsText[1].textContent === 'task') {
            task.setAttribute('selected', 'selected')
        }
        inputSelect.appendChild(task);

        let randomThought = document.createElement('option');
        randomThought.value = 'random thought';
        randomThought.textContent = 'random thought';
        if (itemsText[1].textContent === 'random thought') {
            randomThought.setAttribute('selected', 'selected')
        }
        inputSelect.appendChild(randomThought);

        let idea = document.createElement('option');
        idea.value = 'idea';
        idea.textContent = 'idea';
        if (itemsText[1].textContent === 'idea') {
            idea.setAttribute('selected', 'selected')
        }
        inputSelect.appendChild(idea);

        itemsText[1].textContent = '';
        itemsText[1].appendChild(inputSelect);

        let inputContent = document.createElement('textarea');
        inputContent.value = itemsText[2].textContent;
        itemsText[2].textContent = '';
        itemsText[2].appendChild(inputContent);

        let inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'date');
        itemsText[3].appendChild(inputDate);

        iconSave.addEventListener('click', function saveListItem(event) {
            iconSave.style.display = 'none';
            iconEdit.style.display = 'inline';
            let itemsId = event.target.closest('li').getAttribute('data-id');

            console.log(inputDate.value);
            storageNotes[itemsId - 1]['title'] = inputName.value;
            storageNotes[itemsId - 1]['category'] = inputSelect.value;
            storageNotes[itemsId - 1]['content'] = inputContent.value;
            if (storageNotes[itemsId - 1]['dates'].length === 2) {
                storageNotes[itemsId - 1]['dates'].splice(0, 1);
            }
            storageNotes[itemsId - 1]['dates'].push(inputDate.value.replace(/\-/g, '/'));
            renderList(storageNotes);
        })
    });



    let iconArchive = document.createElement('img');
    iconArchive.classList.add('icon');
    iconArchive.src = '/icons/archive.png'

    iconArchive.addEventListener('click', function archiveItemList(event) {
        let itemsId = event.target.closest('li').getAttribute('data-id');
        storageNotes[itemsId - 1]['isArchived'] = true;

        renderList(storageNotes);
        renderArchive(storageNotes);
    })

    let iconDelete = document.createElement('img');
    iconDelete.classList.add('icon');
    iconDelete.src = '/icons/delete.png'

    iconDelete.addEventListener('click', function removeItem(event) {
        let itemsId = event.target.closest('li').getAttribute('data-id');

        for (let i = 0; i < storageNotes.length; i++) {
            if (storageNotes[i]['id'] === +itemsId) {
                storageNotes.splice(i, 1);
            }
        }

        renderList(storageNotes);
        renderCategory(storageNotes);
    })

    imgBtnWrapper.appendChild(iconEdit);
    imgBtnWrapper.appendChild(iconSave);
    imgBtnWrapper.appendChild(iconArchive);
    imgBtnWrapper.appendChild(iconDelete);

    return imgBtnWrapper;
}
function createImageCategory(item) {
    let imgItemWrapper = document.createElement('div');
    imgItemWrapper.classList.add('img-wrapper');

    let imgItem = document.createElement('img');
    imgItem.src = imgCatgSrc[item['category']];
    imgItem.classList.add('img');
    imgItemWrapper.appendChild(imgItem);

    return imgItemWrapper;
}

function createItemName(item) {
    let tdName = document.createElement('p');
    tdName.innerHTML = item['title'];

    return tdName;
}

function createItemCreationDate(item) {
    let tdCreate = document.createElement('p');
    tdCreate.innerHTML = item['created'];

    return tdCreate;
}


function createItemCategory(item) {
    let tdCatg = document.createElement('p');
    tdCatg.innerHTML = item['category'];

    return tdCatg;
}

function createItemContent(item) {
    let tdContent = document.createElement('p');
    tdContent.innerHTML = item['content'];

    return tdContent;
}

function createItemDates(item) {
    let tdDates = document.createElement('p');
    if (item['dates'][0] && item['dates'][1]) {
        tdDates.innerHTML = `${item['dates'][0]}, ${item['dates'][1]}`
    } else if (item['dates'][0]) {
        tdDates.innerHTML = item['dates'][0]
    } else {
        tdDates.innerHTML = '';
    }


    return tdDates;
}

function renderList(data) {
    main.innerHTML = '';

    for (let item of data) {
        if (!item.isArchived) {
            let li = document.createElement('li');
            li.classList.add('item');
            li.setAttribute('data-id', item.id);
            let liId = li.getAttribute('data-id');

            li.appendChild(createImageCategory(item));
            li.appendChild(createItemName(item));
            li.appendChild(createItemCreationDate(item));
            li.appendChild(createItemCategory(item));
            li.appendChild(createItemContent(item));
            li.appendChild(createItemDates(item));
            li.appendChild(createActionBtn());

            main.appendChild(li)
        }
    }

    storageNotes.filter(el => el.isArchived === true).length && renderArchive(storageNotes)

}

function renderCategory(data) {
    category.innerHTML = '';
    let countActiveTask = data.filter(el => el.category === 'task' && el.isArchived === false).length;
    let countArchiveTask = data.filter(el => el.category === 'task' && el.isArchived === true).length;
    let countActiveIdea = data.filter(el => el.category === 'idea' && el.isArchived === false).length;
    let countArchiveIdea = data.filter(el => el.category === 'idea' && el.isArchived === true).length;
    let countActiveRandom = data.filter(el => el.category === 'random thought' && el.isArchived === false).length;
    let countArchiveRandom = data.filter(el => el.category === 'random thought' && el.isArchived === true).length;

    for (let prop in imgCatgSrc) {
        let li = document.createElement('li');
        li.classList.add('item');
        li.classList.add('item-category');
        let imgCatg = document.createElement('div');
        imgCatg.classList.add('img-wrapper');
        let img = document.createElement('img');
        img.classList.add('img');
        img.src = imgCatgSrc[prop];
        imgCatg.appendChild(img);
        let title = document.createElement('p');
        let active = document.createElement('p');
        let archive = document.createElement('p');

        if (prop === 'task') {
            title.textContent = prop[0].toUpperCase() + prop.slice(1);
            active.textContent = countActiveTask;
            archive.textContent = countArchiveTask;
        }
        if (prop === 'idea') {
            title.textContent = prop[0].toUpperCase() + prop.slice(1);
            active.textContent = countActiveIdea;
            archive.textContent = countArchiveIdea;
        }
        if (prop === 'random thought') {
            title.textContent = prop[0].toUpperCase() + prop.slice(1);
            active.textContent = countActiveRandom;
            archive.textContent = countArchiveRandom;
        }

        li.appendChild(imgCatg);
        li.appendChild(title);
        li.appendChild(active);
        li.appendChild(archive);
        category.appendChild(li);
    }
}

function renderArchive(data) {
    archive.innerHTML = '';

        for (let item of data) {
            if (item.isArchived) {
                let li = document.createElement('li');
                li.classList.add('item');
                li.setAttribute('data-id', item.id);
                let liId = li.getAttribute('data-id');
                let unarchive = document.createElement('div');
                unarchive.classList.add('icon-btn-wrapper');
                let imgUnarchive = document.createElement('img');
                imgUnarchive.classList.add('icon');
                imgUnarchive.src = '/icons/unarchive.png';
                unarchive.appendChild(imgUnarchive);

                imgUnarchive.addEventListener('click', (event) => {
                    let itemsId = event.target.closest('li').getAttribute('data-id');
                    storageNotes[itemsId - 1]['isArchived'] = false;

                    renderList(storageNotes);
                    renderCategory(storageNotes);
                    renderArchive(storageNotes)
                })

                li.appendChild(createImageCategory(item));
                li.appendChild(createItemName(item));
                li.appendChild(createItemCreationDate(item));
                li.appendChild(createItemCategory(item));
                li.appendChild(createItemContent(item));
                li.appendChild(createItemDates(item));
                li.appendChild(unarchive);

                archive.appendChild(li)
            }
        }

    renderCategory(storageNotes);
}

