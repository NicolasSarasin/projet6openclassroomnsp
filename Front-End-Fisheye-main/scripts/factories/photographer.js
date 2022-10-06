function photographerFactory(data) {
    const { name, portrait, country, city, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article"); //création de l'article
        const img = document.createElement("img"); //création de la zone d'image
        img.setAttribute("src", picture);
        //Propriété de l'article
        const h2 = document.createElement("h2"); //Création d'un titre
        const h1 = document.createElement("h1"); //Création d'un titre
        const p = document.createElement("p"); //Création d'un paragraphe
        const p2 = document.createElement("p"); //Création d'un paragraphe
        //const link = document.createElement("a"); //création d'un lien par id
        h2.textContent = name;
        h1.textContent = city + ", " + country;
        p.textContent = tagline;
        p2.textContent = price + "€/jour";
        p2.style.color = "#929292";
        //link.href = photographer.html;
        article.appendChild(img); //Image du photographe
        article.appendChild(h2); //Nom du photographe
        article.appendChild(h1); //Pays + ville du photographe
        article.appendChild(p); //Ce que fait le photographe
        article.appendChild(p2); //Prix par jour (exemple 500€/jour)
        return article;
    }
    return { name, picture, getUserCardDOM };
}
