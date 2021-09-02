// catching all the IDs 
const searchBtn = document.getElementById('search_button');
const inputField = document.getElementById('input_field');
const displayItem = document.getElementById('display_item');
const resultFound = document.getElementById('result_found');
const errorDiv = document.getElementById('error_div');

// click handler on the search button
searchBtn.addEventListener('click', function () {
    const searchInput = inputField.value;

    // error handling
    if (inputField.value === '') {
        errorDiv.innerText = 'please provide a valid name';
    }

    // fetching API data
    const url = `https://openlibrary.org/search.json?q=${searchInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))

    // for the result found part
    fetch(url)
        .then(res => res.json())
        .then(data => displayResultFound(data))
})

// displaying result found part
const displayResultFound = result => {
    const p = document.createElement('p');
    p.innerText = `Result Found: ${result.numFound}`
    resultFound.appendChild(p);
}

// displaying books details 
const displayBooks = books => {

    inputField.value = '';         /* clearing input field */
    displayItem.innerHTML = '';    /* clearing the UI */
    resultFound.innerText = '';    /* clearing result found */

    // using forEach to loop through all the data
    books.forEach(book => {
        const div = document.createElement('div');

        errorDiv.innerText = ''   /* clearing the error div */

        div.innerHTML = `
                <div class="col">
                    <div class="card">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img_style mx-auto" alt="img">
                        <div class="card-body text-center">
                            <h1 class="card-title">Name: ${book.title}</h1>
                            <h3>Author: ${book.author_name}</h3>
                            <h5>Publisher: ${book.publisher}</h5>
                            <p class="card-text">Published Year: ${book.first_publish_year}</p>
                        </div>
                    </div>
                </div>
        `
        displayItem.appendChild(div);
    })
}