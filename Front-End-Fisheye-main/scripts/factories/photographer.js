function photographerFactory(data) {
    const { name, portrait, country, city, tagline, price, id } = data;

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
        const a = document.createElement("a"); //Création d'un lien par href
        h2.textContent = name;
        h1.textContent = city + ", " + country;
        p.textContent = tagline;
        p2.textContent = price + "€/jour";
        p.style.color = "black"; //couleur noir
        p2.style.color = "#737373";
        img.setAttribute("alt", "profileImage");
        a.href = `photographer.html?photographerId=${id}`; //lien par id
        article.appendChild(img); //Image du photographe
        article.appendChild(h2); //Nom du photographe
        article.appendChild(h1); //Pays + ville du photographe
        article.appendChild(p); //Ce que fait le photographe
        article.appendChild(p2); //Prix par jour (exemple 500€/jour)
        a.appendChild(article);
        //const linkpage2 = h2.link("photographe.html"); //Lien avec titre h2
        //linkpage2 = "<a href>" + h2 + "</a>";
        return a;
    }
    return { name, picture, getUserCardDOM };
}
