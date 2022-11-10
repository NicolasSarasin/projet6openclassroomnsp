//Mettre le code JavaScript lié à la page photographer.html

async function getData() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
}

async function getPhotographers() {
    const photographers = await getData().photographers;
    console.log(photographers);

    // et bien retourner le tableau photographers seulement une fois
    return [...photographers];
}

async function getPhotographer(id) {
    const photographers = await getPhotographers();
    const photographer = photographers.find((item) => item.id == id);
    return photographer;
}

async function getPhotographersMedia() {
    const media = await getData().media;
    console.log(media);

    // et bien retourner le tableau media seulement une fois
    return [...media];
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
            const img = document.createElement("img");
            img.setAttribute("src", picture);
            img.classList.add("imgArticle");
            //img.setAttribute("onclick=openmodalis()"); //au click de l'image, affiche un modal pour mettre les images en avant
            const video = document.createElement("video");
            video.setAttribute("src", videograme);
            video.classList.add("videoArticle");
            const titleMedia = document.createElement("h2");
            titleMedia.textContent = title + "  " + likes; //titre + nombre de likes
            article.appendChild(img);
            article.appendChild(video);
            article.appendChild(titleMedia); //lie le titre et le nombre de likes dans l'article d'affichage des médias
            return article;
        }
    }

    /*const dateMedia = date;
    const priceMedia = price;
    const idMedia = id;*/

    return { getUserMediaCardDOM };
}

/*function openmodalis() {
    const Modalis = document.querySelector(".modalis"); //fonction d'ouvertu du modale 
    Modalis.style.display = "block";
}
function closemodalis() {
    const Modalis = document.querySelector(".modalis"); //fonction de fermeture du modalis
    Modalis.style.display = "none";
}*/

function photographerFactory(data) {
    const { name, country, city, tagline } = data;

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
    return { name, getUserCardDOM };
}

function photographerFactory2(data) {
    const { portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM2() {
        const article = document.createElement("atricle");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.classList.add("imgIDphotographersPage");
        //article.appendChild(img);
        return /*article*/;
    }
    return { getUserCardDOM2 };
}

async function displayPhotographer() {
    const photographersSection = document.querySelector(".photographerInfo");
    const photographersSection2 = document.getElementById("photographerPhoto");
    const photographer = await getPhotographer(photographerIdentification);
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    const photographerModel2 = photographerFactory2(photographer);
    //const userCardDOM2 = photographerModel2.getUserCardDOM2();
    //photographersSection2.appendChild(userCardDOM2);
    photographersSection2.src = `assets/photographers/${photographer.portrait}`;
}
const photographerMedia = [];
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
