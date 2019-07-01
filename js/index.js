
const sidePanel = document.querySelector('#list-panel')
const list = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
const currentUser = { "id": 1, "username": "pouros" }



document.addEventListener("DOMContentLoaded", function() {

    function getBookData() {
        fetch('http://localhost:3000/books')
            .then(resp => resp.json())
            .then(data => renderBooksOnSidePanel(data))
    }

    getBookData()

    function renderBooksOnSidePanel(books) {
        books.forEach((book) => {
            const bookItem = document.createElement('li')
            bookItem.innerText = book.title
            bookItem.id = book.id
            list.append(bookItem)
            bookItem.addEventListener('click', event => {
                seeShowPanelInfo(book)
            })
        })
    }

    function seeShowPanelInfo(book) {
        showPanel.innerHTML = 
                `<h2> ${book.title} </h2>
                <img src= "${book.img_url}"> </img>
                <p> ${book.description}</p>
                <p id="user-list"> </p>
                <button> Read Book </button>`

        renderUserList(book.users)

        const readButton = document.querySelector('button')
        readButton.addEventListener('click', event =>
            likeBook(book, currentUser)
        )
    }

    function renderUserList (users) {
        const userList = document.querySelector("#user-list")
        userList.innerHTML = ''
        users.forEach( user => {
            userList.innerHTML += `<li>${user.username}</li>`
        })
    }

    function likeBook(book, currentUser) {
        if (book.users.map(u => u.username).includes(currentUser.username)) return 
        book.users.push(currentUser)
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            body: JSON.stringify({'users': book.users}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(book => renderUserList(book.users))
    }
      

    

});
