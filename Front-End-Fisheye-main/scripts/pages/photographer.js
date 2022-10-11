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
function potographersMediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } =
        data;
    const picture = `assets/images/${image}`;
    const videograme = `assets/images/${video}`;
    //function getUserMediaCardDom() {
    const article = document.createElement("article");
    const photographerIdentification = photographerId;
    if ((photographerIdentification = 243)) {
    } else if ((photographerIdentification = 930)) {
    } else if ((photographerIdentification = 82)) {
    } else if ((photographerIdentification = 527)) {
    } else if ((photographerIdentification = 925)) {
    } else if ((photographerIdentification = 195)) {
    } /*else {
    }*/
    return article;
    //}
}
