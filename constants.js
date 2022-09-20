const storageNotes = [
    { id: 1, isArchived: false, title: 'Shopping list', created: 'April 20, 2022', category: 'task', content: 'tomateos, bread', dates: [], },
    { id: 2, isArchived: false, title: 'lie teory of evolut...', created: 'April 27, 2022', category: 'random thought', content: 'fronend or backend', dates: [], },
    { id: 3, isArchived: false, title: 'New Feature', created: 'May 05, 2022', category: 'idea', content: 'implement storage', dates: [], },
    { id: 4, isArchived: false, title: 'William Gaddis', created: 'May 07, 2022', category: 'idea', content: 'develop some app', dates: [], },
    { id: 5, isArchived: false, title: 'Books', created: 'May 07, 2021', category: 'task', content: 'buy JS books', dates: ['05/03/2022'], },
    { id: 6, isArchived: false, title: 'Shopping list', created: 'May 15, 2022', category: 'task', content: 'car, bicycle, mmoto', dates: [], },
    { id: 7, isArchived: false, title: 'Independace Day', created: 'Aug 24, 2022', category: 'task', content: 'go at war', dates: [], },
]

const imgCatgSrc = {
    task: '/icons/task-catg.png',
    idea: '/icons/idea-catg.png',
    "random thought": '/icons/random-catg.png',
}

const buttonCreate = {
    active: false,
    yesVal: 'Create Note',
    noVal: 'Don\'t Create'
}

const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export { storageNotes, imgCatgSrc, buttonCreate, month };