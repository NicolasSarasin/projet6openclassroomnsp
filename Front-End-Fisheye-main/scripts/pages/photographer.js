//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;
    console.log(photographers);

    // et bien retourner le tableau photographers seulement une fois
    return {
        photographers: [...photographers],
    };
}

async function getPhotographersMedia() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const media = data.media;
    console.log(media);

    // et bien retourner le tableau media seulement une fois
    return {
        media: [...media],
    };
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
        //if (photographerId) {
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.classList.add("imgArticle");
        img.onclick(modalis()); //au click de l'image, affiche un modal pour mettre les images en avant
        const video = document.createElement("video");
        video.setAttribute("src", videograme);
        video.classList.add("videoArticle");
        const titleMedia = document.createElement("h2");
        titleMedia.textContent = title + "  " + likes; //titre + nombre de likes
        const likeMedia = document.createElement("h2");
        likeMedia.textContent = likes;
        article.appendChild(img);
        article.appendChild(video);
        article.appendChild(titleMedia);
        article.appendChild(likeMedia);
        return article;
        //}
    }

    /*const dateMedia = date;
    const priceMedia = price;
    const idMedia = id;*/

    return { getUserMediaCardDOM };
}

function modalis() {
    const Modalis = document.querySelector(".modalis");
    Modalis.style.display = "block";
}
function closemodalis() {
    const Modalis = document.querySelector(".modalis");
    Modalis.style.display = "none";
}

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

async function displayPhotographer(photographers) {
    const photographersSection = document.querySelector(".photographerInfo");
    const photographersSection2 = document.getElementById("photographerPhoto");
    const photographer = photographers.find(
        (item) => item.id == photographerIdentification
    );

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    const photographerModel2 = photographerFactory2(photographer);
    //const userCardDOM2 = photographerModel2.getUserCardDOM2();
    //photographersSection2.appendChild(userCardDOM2);
    photographersSection2.src = `assets/photographers/${photographer.portrait}`;
}
async function displayMedia(media) {
    const mediaSection = document.querySelector(".mediaSection");

    media.forEach((media) => {
        const mediaModel = photographersMediaFactory(media);
        const userMediaCardDOM = mediaModel.getUserMediaCardDOM();
        mediaSection.appendChild(userMediaCardDOM);
    });
}
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayPhotographer(photographers);
    const { media } = await getPhotographersMedia();
    displayMedia(media);
}
