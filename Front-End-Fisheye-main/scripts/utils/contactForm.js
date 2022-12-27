function displayModal() {
    const modal = document.getElementById("contact_modal");
    closeModal();
    modal.style.display = "block";
}

function validate() {
    document.getElementById("firstNameError").style.display = "none";
    document.getElementById("lastNameError").style.display = "none";
    document.getElementById("emailError").style.display = "none";
    document.getElementById("messageError").style.display = "none";
    let form = document.forms["messageToPhotographe"];
    let hasError = false;
    let firstName = form.first.value;
    if (firstName.length < 2) {
        hasError = true;
        document.getElementById("firstNameError").style.display = "block";
    }
    let lastName = form.last.value;
    if (lastName.length < 2) {
        hasError = true;
        document.getElementById("lastNameError").style.display = "block";
    }
    let email = form.email.value;
    const emailRegEx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(email)) {
        hasError = true;
        document.getElementById("emailError").style.display = "block";
    }
    let message = form.message.value;
    if (message.length < 1) {
        hasError = true;
        document.getElementById("messageError").style.display = "block";
    }
    if (!hasError) {
        closeModal();
    }
    return false;
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "";
}
