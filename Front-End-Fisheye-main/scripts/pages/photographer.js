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

window.onload = function () {
    sP = new URLSearchParams(windows.location.search);
    const photographerIdentification = sP.get("photographerId");
    return photographerIdentification;
};

function photographersMediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } =
        data;
    const picture = `assets/images/${image}`;
    const videograme = `assets/images/${video}`;
    function getUserMediaCardDOM() {
        if (window.onload) {
        }
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        const video = document.createElement("video");
        video.setAttribute("src", videograme);
        const titleMedia = document.createElement("h2");
        titleMedia.textContent = title;
        const likeMedia = document.createElement("h2");
        likeMedia.textContent = likes;
        article.appendChild(titleMedia);
        article.appendChild(likeMedia);
        return article;
    }

    const dateMedia = date;
    const priceMedia = price;
    const idMedia = id;

    return { getUserMediaCardDOM };
}
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}
async function displayData(media) {
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
    displayData(photographers);
    const { media } = await getPhotographersMedia();
    displayData(media);
}

init();
