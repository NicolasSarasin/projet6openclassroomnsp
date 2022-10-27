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
    sP = new URLSearchParams(windows.location.search);
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
        if (window.onload) {
            const article = document.createElement("article");
            const img = document.createElement("img");
            img.setAttribute("src", picture);
            img.classList.add("imgArticle");
            const video = document.createElement("video");
            video.setAttribute("src", videograme);
            const titleMedia = document.createElement("h2");
            titleMedia.textContent = title;
            const likeMedia = document.createElement("h2");
            likeMedia.textContent = likes;
            article.appendChild(img);
            article.appendChild(titleMedia);
            article.appendChild(likeMedia);
            return article;
        }
    }

    /*const dateMedia = date;
    const priceMedia = price;
    const idMedia = id;*/

    return { getUserMediaCardDOM };
}
function photographerFactory(data) {
    const { name, portrait, country, city, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        const article1 = document.createElement("article");
        const article2 = document.createElement("article");
        article1.classList.add("article1");
        article2.classList.add("article2");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.classList.add("imgIDphotographersPage");
        return; //retourne les deux articles créées
    }
    return { name, picture, getUserCardDOM };
}
async function displayPhotographer(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    const photographer = photographers.find(
        (item) => item.id == photographerIdentification
    );

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
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

init();
