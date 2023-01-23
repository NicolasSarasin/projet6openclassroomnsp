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
            const a = document.createElement("a");
            if (image != null) {
                mediaElt = document.createElement("img");
                mediaElt.src = picture;
                mediaElt.classList.add("imgArticle");
                mediaElt.setAttribute("alt", title);
            } else {
                mediaElt = document.createElement("video");
                mediaElt.setAttribute("src", videograme);
                mediaElt.controls = true;
                mediaElt.classList.add("videoArticle");
            }
            const div = document.createElement("div");
            article.appendChild(div);
            div.appendChild(a);
            a.appendChild(mediaElt);
            a.href = "javascript:openmodalis(" + id + ")";
            /*mediaElt.onclick = function () {
                openmodalis(id);
            };*/ //au click de l'image, affiche un modal pour mettre les images en avant

            const titleMedia = document.createElement("h2");
            titleMedia.textContent = title; //titre + nombre de likes
            titleMedia.classList.add("titleMedia");
            let likesh2 = document.createElement("h2");
            likesh2.textContent = likes;
            likesh2.classList.add("nbLikes");
            const icon = document.createElement("i"); //création d'une icone
            icon.classList.add("fa"); //ajout de "class" pour la forme de coeur
            icon.classList.add("fa-heart");
            const icon2 = document.createElement("i");
            icon2.classList.add("fa"); //ajout de "class" pour la forme de coeur
            icon2.classList.add("fa-heart-o");
            icon.onclick = Dislikes;
            icon2.onclick = Likes;
            titleMedia.appendChild(likesh2);
            const icon2Btn = document.createElement("button");
            icon2Btn.classList.add("buttonVoid");
            icon2Btn.appendChild(icon2);
            const iconBtn = document.createElement("button");
            iconBtn.classList.add("buttonVoid2");
            iconBtn.appendChild(icon);
            titleMedia.appendChild(icon2Btn);
            titleMedia.appendChild(iconBtn);
            article.appendChild(titleMedia); //lie le titre et le nombre de likes dans l'article d'affichage des médias
            return article;
        }
    }

    /*const dateMedia = date;
    const priceMedia = price;
    const idMedia = id;*/

    return { getUserMediaCardDOM };
}

function Likes(e) {
    //fonction avec l'affichage du coeur en entier
    const icon2 = e.currentTarget.parentElement;
    icon2.style.display = "none";
    const icon = icon2.parentElement.children[2];
    icon.style.display = "inline";
    const likesh2 = icon2.parentElement.children[0];
    const likes = parseInt(likesh2.textContent);
    likesh2.textContent = likes + 1;
    const totalLikesAdd = document.getElementById("numberLikes");
    totalLikesAdd.textContent = Number(totalLikesAdd.textContent) + 1;
}

function Dislikes(e) {
    //fonction avec l'affichage du coeur avec la bordure
    const icon = e.currentTarget.parentElement;
    icon.style.display = "none";
    const icon2 = icon.parentElement.children[1];
    icon2.style.display = "inline";
    const likesh2 = icon.parentElement.children[0];
    const likes = parseInt(likesh2.textContent);
    likesh2.textContent = likes - 1;
    const totalLikesAdd = document.getElementById("numberLikes");
    totalLikesAdd.textContent = Number(totalLikesAdd.textContent) - 1;
}

function openmodalis(id) {
    //fonction d'ouvertu du modale
    currentMediaIndex = photographerMedia.findIndex((media) => media.id == id);
    console.log([id, currentMediaIndex]);
    displayModalisMedia();
}

function displayModalisMedia() {
    const media = photographerMedia[currentMediaIndex];
    const Modalis = document.querySelector(".modalis");
    Modalis.style.display = "block";
    document.getElementById("modalisTitle").textContent = media.title;
    if (media.image) {
        document.getElementById(
            "modalisImage"
        ).src = `assets/images/${media.image}`;
        document.getElementById("modalisImage").style.display = "block";
        document.getElementById("modalisVideo").style.display = "none";
    } else {
        document.getElementById(
            "modalisVideo"
        ).src = `assets/images/${media.video}`;
        document.getElementById("modalisVideo").style.display = "block";
        document.getElementById("modalisImage").style.display = "none";
    }
}

function next() {
    currentMediaIndex = (currentMediaIndex + 1) % photographerMedia.length;
    displayModalisMedia();
}

function previous() {
    currentMediaIndex =
        (currentMediaIndex + photographerMedia.length - 1) %
        photographerMedia.length;
    displayModalisMedia();
}

function closemodalis() {
    const Modalis = document.querySelector(".modalis"); //fonction de fermeture du modalis
    document.getElementById("modalisTitle").textContent = "";
    document.getElementById("modalisImage").src = "";
    Modalis.style.display = "none";
}

function photographerFactory(data) {
    const { name, country, city, tagline, price, likes } = data;
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
        const totalLikesAdd = document.getElementById("numberLikes");
        const titlePrice = document.getElementById("numberPrice");
        let likeNull = 0; //Nombre de likes à 0 avant ajout
        photographerMedia.forEach(function (pmedia) {
            let likeUnit = Number(pmedia.likes);
            likeNull += likeUnit;
        });
        totalLikesAdd.textContent = likeNull;
        titlePrice.textContent = price + "€/jour";
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
    photographerModel3.priceDayDOM();
    //const photographerModel2 = photographerFactory(photographer);
    //const userCardDOM2 = photographerModel2.getUserCardDOM2();
    //photographersSection2.appendChild(userCardDOM2);
}

let photographerMedia = [];
let currentMediaIndex = null;

async function displayPhotographerMedia(media) {
    const mediaSection = document.querySelector(".mediaSection");
    const likeSection = document.querySelector(".LikesPrice");
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

    photographerMedia = await getPhotgrapherMedia(photographerIdentification);
    //sortMedia("popularity");
    displayPhotographerMedia(photographerMedia);
    displayPhotographer();
}

function showListOptions() {
    document.getElementById("selectOptions").classList.remove("hidden");
    document.getElementById("selectValue").classList.add("hidden");
}

function selectOption(option, elt) {
    document.getElementById("selectOptions").classList.add("hidden");
    document.getElementById("selectValue").classList.remove("hidden");
    document.getElementById("selectValue").textContent = elt.innerText;

    sortMedia(option);
}
