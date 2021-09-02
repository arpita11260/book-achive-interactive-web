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

      //unavailable book cover  
      let imgUrl = '';
      if(book.cover_i == null){
        imgUrl = `./img/img.png`;
      }
      else{
        imgUrl = 'https://covers.openlibrary.org/b/id/'+ book.cover_i +'-M.jpg';
      }

      //unavailable author name 
      let authorName = '';
      if(book.author_name == null){
        authorName = "Not found";
      }
      else{
        authorName = book.author_name;
      }

      //unavailable publisher
      let publisher = '';
      if(book.publisher == null){
        publisher = "Not found";
      }
      else{
        publisher = book.publisher;
      }

      //unavailable publish_year
      let publish_year = '';
      if(book.first_publish_year == null){
        publish_year = "Not found";
      }
      else{
        publish_year = book.first_publish_year;
      }
        const div = document.createElement('div');

        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border border-secondary">
          <img src="${imgUrl}" class="card-img-top" height="350px" alt="...">
          <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text"><span class="fw-bold">Book Author-Name: </span>${authorName}</p>
          <p class="card-text"><span class="fw-bold">Book Publisher: </span>${publisher.slice(0,50)}</p>
          <p class="card-text"><span class="fw-bold">Book First Publish_Year: </span>${ publish_year}</p>
          </div>
        `;
        searchResult.appendChild(div);
    })
}
