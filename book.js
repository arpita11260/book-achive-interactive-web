const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const spinner = document.getElementById("spinner");
    const searchText = searchField.value;
        // clearData
    searchField.value = '';

        //empty data
    if(searchText === ''){
        alert('Plese Enter Book Name')
    }
    else{
        //load data
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        // Setting a timer of 1.5s, before removing the spinnner, and showing data
        setTimeout(() => {
          spinner.classList.add("d-none");
          displaySearchResult(data.docs);
        }, 1500);
      })
      .finally(() => {
        searchInput.value === "";
      });
    }
}

const displaySearchResult = books => {
    const searchResult = document.getElementById("search-result");
    const errorMsg = document.getElementById('error-msg');
    searchResult.textContent = '';
    errorMsg.textContent = '';

       //handle no data
    if(books.length === 0){
       const div = document.createElement('div');
       div.innerHTML = `
        <div class='w-auto p-3 text-danger fw-bold'>
            <p>No Result Found</p>
        </div>
       `;
        errorMsg.appendChild(div);

    }
   else{
    const div = document.createElement('div');
    div.innerHTML = `
     <div class='w-auto p-3 text-dark fw-bold'>
         <p>${books.length} Results Found</p>
     </div>
    `;
     errorMsg.appendChild(div);
   }
    books.forEach(book => {

        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col-md-12 border border-secondary">
            <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 h-50 img-fluid" alt="...">
            <div class="card-body bg-white">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text"><span class="fw-bold">Book Author-Name: </span>${book.author_name}</p>
              <p class="card-text"><span class="fw-bold">Book Publisher: </span>${book.publisher}</p>
              <p class="card-text"><span class="fw-bold">Book First Publish_Year: </span>${book.first_publish_year}</p>
            </div>
          </div>
        `;
        searchResult.appendChild(div);
    })
}
