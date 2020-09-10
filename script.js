let getId = x => document.getElementById(x);
document.getElementById('search').onclick = function () {
    const searchTitle = getId('text').value;
    const searchURL = `https://www.omdbapi.com/?s=${searchTitle}&apikey=f3f9eaff`;
    sendRequest('GET', searchURL)
        .then(data => {
            console.log(data);
            render(data)
            details(data)
        });
    getId('text').value= "";
}

function sendRequest(method, searchURL) {
    return fetch(searchURL).then(response => {
        return response.json();
    })
}

function render(data) {
    for (i = 0; i < 8; i++) {
        let card = `
        <div class="card" style="width: 16rem;">
        <img src="${data.Search[i].Poster}" class="card-img-top img" alt="...">
        <div style="padding: 0rem;" class="card-body">
            <h5 class="card-title title">${data.Search[i].Title}</h5>
            <p class="card-text text">${data.Search[i].Type}</p>
            <p class="card-text text">${data.Search[i].Year}</p>
            <a class="btn btn-success details" data-toggle="modal" data-target="#exampleModal">More details</a>
        </div>
        </div>
        `;
        getId('cardBox').innerHTML += card;
    }
}

function details(data) {
    let success = document.getElementsByClassName('details');
    for (let j = 0; j < success.length; j++) {
        success[j].onclick = function () {
            let title = data.Search[j].Title;
            getId('cardPoster').src = data.Search[j].Poster;
            getId('cardTitle').textContent = title;
            const detailsURL = `https://www.omdbapi.com/?t=${title}&plot=full&apikey=f3f9eaff`
            detailsRequest('GET', detailsURL)
                .then(details => {
                    renderInfo(details)
                    console.log(details);
                })
        }
    }
}

function detailsRequest(method, searchURL) {
    return fetch(searchURL).then(response => {
        return response.json();
    })
}

function renderInfo(details) {

    getId('info').textContent = `${details.Rated} ${details.Year} ${details.Genre}`;
    getId('plot').textContent = details.Plot;
    getId('writer').innerHTML = `<span style="font-weight: bold;">Written by:</span>${details.Writer}`;
    getId('director').innerHTML = `<span style="font-weight: bold;">Directed by:</span>${details.Director}`;
    getId('actors').innerHTML = `<span style="font-weight: bold;">Starring:</span>${details.Actors}`;
    getId('boxOffice').innerHTML = `<span style="font-weight: bold;">BoxOffice:</span>${details.BoxOffice}`;
    getId('awards').innerHTML = `<span style="font-weight: bold;">Awards:</span>${details.Awards}`;
    if (details.Ratings.length === 3) {
        getId('ratingsInternet').textContent = `${details.Ratings[0].Source} ${details.Ratings[0].Value}`
        getId('ratingsRotten').textContent = `${details.Ratings[1].Source} ${details.Ratings[1].Value}`
        getId('ratingsMet').textContent = `${details.Ratings[2].Source} ${details.Ratings[2].Value}`
    } else if (details.Ratings.length === 2) {
        getId('ratingsInternet').textContent = `${details.Ratings[0].Source} ${details.Ratings[0].Value}`
        getId('ratingsRotten').textContent = `${details.Ratings[1].Source} ${details.Ratings[1].Value}`
    } else {
        getId('ratingsInternet').textContent = `${details.Ratings[0].Source} ${details.Ratings[0].Value}`
    }



}