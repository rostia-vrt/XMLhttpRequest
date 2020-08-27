let getId = x => document.getElementById(x);
document.getElementById('search').onclick = function () {
    const searchTitle = getId('text').value;
    const xhr = new XMLHttpRequest();
    console.log('створення запиту');
    xhr.open('GET', `http://www.omdbapi.com/?s=${searchTitle}&apikey=f3f9eaff`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText)
            console.log(data);
            render(data);
            details(data)
        }
    }
    xhr.send();
    console.log('відправка запиту');
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
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `http://www.omdbapi.com/?t=${title}&plot=full&apikey=f3f9eaff`, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const details = JSON.parse(xhr.responseText)
                    console.log(details);
                    renderInfo(details);
                }
            }
            xhr.send();
        }
    }
}

function renderInfo(details) {

    getId('info').textContent = `${details.Rated} ${details.Year} ${details.Genre}`;
    getId('plot').textContent = details.Plot;
    getId('writer').innerHTML = `<span style="font-weight: bold;">Written by:</span>${details.Writer}`;
    getId('director').innerHTML = `<span style="font-weight: bold;">Directed by:</span>${details.Director}`;
    getId('actors').innerHTML = `<span style="font-weight: bold;">Starring:</span>${details.Actors}`;
    getId('boxOffice').innerHTML = `<span style="font-weight: bold;">BoxOffice:</span>${details.BoxOffice}`;
    getId('awards').innerHTML = `<span style="font-weight: bold;">Awards:</span>${details.Awards}`;
    getId('ratingsInternet').textContent = `${details.Ratings[0].Source} ${details.Ratings[0].Value}`
    getId('ratingsRotten').textContent = `${details.Ratings[1].Source} ${details.Ratings[1].Value}`
    getId('ratingsMet').textContent = `${details.Ratings[2].Source} ${details.Ratings[2].Value}`


}