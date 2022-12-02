//Mettre le code JavaScript lié à la page photographer.html

async function getData() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
}

async function getPhotographers() {
    const photographers = (await getData()).photographers;
    console.log(photographers);

    // et bien retourner le tableau photographers seulement une fois
    return [...photographers]; //retourne un tableau des photographes
}

async function getPhotographer(id) {
    const photographers = await getPhotographers();
    const photographer = photographers.find((item) => item.id == id);
    return photographer;
}

async function getPhotographersMedia() {
    const media = (await getData()).media;
    console.log(media);

    // et bien retourner le tableau media seulement une fois
    return [...media]; //retourne un tableau des médias
}

async function getPhotgrapherMedia(id) {
    const medias = await getPhotographersMedia();
    const photographerMedia = medias.filter(
        (item) => item.photographerId == id
    );
    return photographerMedia;
}

let photographerIdentification = null;
window.onload = function () {
    sP = new URLSearchParams(window.location.search);
    photographerIdentification = sP.get("photographerId");
    init();
};

function photographersMediaFactory(data) {
    //const label = createElement(label);
    //label.textContent = "Trier par";
    const { id, photographerId, title, image, video, likes, date, price } =
        data;
    const picture = `assets/images/${image}`;
    const videograme = `assets/images/${video}`;
    function getUserMediaCardDOM() {
        //let photographerID = new URLSearchParams(window.location.search);
        //photographerIdentification = photographerID.get("photographerId");
        if (photographerId) {
            const article = document.createElement("article");
            let mediaElt = null;
            if (image != null) {
                mediaElt = document.createElement("img");
                mediaElt.src = picture;
                mediaElt.classList.add("imgArticle");
                article.appendChild(mediaElt);
            } else {
                mediaElt = document.createElement("video");
                mediaElt.setAttribute("src", videograme);
                mediaElt.controls = true;
                mediaElt.classList.add("videoArticle");
                article.appendChild(mediaElt);
            }
            mediaElt.onclick = openmodalis; //au click de l'image, affiche un modal pour mettre les images en avant

            const titleMedia = document.createElement("h2");
            titleMedia.textContent = title; //titre + nombre de likes
            titleMedia.classList.add("titleMedia");
            const likesh2 = document.createElement("h2");
            likesh2.textContent = likes;
            likesh2.classList.add("nbLikes");
            const icon = document.createElement("i"); //création d'une icone
            icon.classList.add("fa"); //ajout de "class" pour la forme de coeur
            icon.classList.add("fa-heart");
            const icon2 = document.createElement("i");
            icon2.classList.add("fa"); //ajout de "class" pour la forme de coeur
            icon2.classList.add("fa-heart-o");
            article.appendChild(likesh2);
            titleMedia.appendChild(icon2);
            titleMedia.appendChild(icon);
            article.appendChild(titleMedia); //lie le titre et le nombre de likes dans l'article d'affichage des médias
            return article;
        }
    }

    /*const dateMedia = date;
    const priceMedia = price;
    const idMedia = id;*/

    return { getUserMediaCardDOM };
}

function openmodalis() {
    const Modalis = document.querySelector(".modalis"); //fonction d'ouvertu du modale
    Modalis.style.display = "block";
}

function closemodalis() {
    const Modalis = document.querySelector(".modalis"); //fonction de fermeture du modalis
    Modalis.style.display = "none";
}

function photographerFactory(data) {
    const { name, country, city, tagline, price } = data;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const Name = document.createElement("h1");
        const Country = document.createElement("h2");
        const Tagline = document.createElement("p");
        Name.textContent = name;
        Country.textContent = city + ", " + country;
        Tagline.textContent = tagline;
        article.appendChild(Name);
        article.appendChild(Country);
        article.appendChild(Tagline);
        return article; //retourne l'article créée
    }

    function priceDayDOM() {
        const titlePrice = document.createElement("h2");
        titlePrice.textContent = price + "€/jour";
        return titlePrice;
    }
    return { name, getUserCardDOM, priceDayDOM };
}

async function displayPhotographer() {
    const photographersSection = document.querySelector(".photographerInfo");
    const photographersSection2 = document.getElementById("photographerPhoto");
    const photographersSection3 = document.querySelector(".LikesPrice");
    const photographer = await getPhotographer(photographerIdentification);
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    photographersSection2.src = `assets/photographers/${photographer.portrait}`;
    const photographerModel3 = photographerFactory(photographer);
    const priceDOM = photographerModel3.priceDayDOM();
    photographersSection3.appendChild(priceDOM);
    //const photographerModel2 = photographerFactory(photographer);
    //const userCardDOM2 = photographerModel2.getUserCardDOM2();
    //photographersSection2.appendChild(userCardDOM2);
}

let photographerMedia = [];

async function displayPhotographerMedia(media) {
    const mediaSection = document.querySelector(".mediaSection");
    mediaSection.innerHTML = "";
    media.forEach((media) => {
        const mediaModel = photographersMediaFactory(media);
        const userMediaCardDOM = mediaModel.getUserMediaCardDOM();
        mediaSection.appendChild(userMediaCardDOM);
    });
}

function sortByLikes(a, b) {
    if (a.likes < b.likes) {
        return -1;
    }
    if (a.likes > b.likes) {
        return 1;
    }
    return 0;
}

function sortByDates(a, b) {
    if (a.date < b.date) {
        return -1;
    }
    if (a.date > b.date) {
        return 1;
    }
    return 0;
}

function sortByTitles(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

function sortMedia(option) {
    switch (option) {
        case "popularity": {
            photographerMedia.sort(sortByLikes);
            break;
        }
        case "date": {
            photographerMedia.sort(sortByDates);
            break;
        }
        case "title": {
            photographerMedia.sort(sortByTitles);
            break;
        }
    }
    displayPhotographerMedia(photographerMedia);
}

async function init() {
    // Récupère les datas des photographes
    displayPhotographer();
    photographerMedia = await getPhotgrapherMedia(photographerIdentification);
    displayPhotographerMedia(photographerMedia);
}
