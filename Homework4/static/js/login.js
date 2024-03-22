import APIClient from "./APIClient.js";

document.addEventListener('DOMContentLoaded', function() {
    let login = document.querySelector('.loginBtn');
    login.addEventListener('click', function() {
        let user = document.querySelector('.userInput')
        APIClient.checkUser(user.value);
        APIClient.getUsers().then(users => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].username == user.value) {
                    localStorage.setItem("userId", users[i].id);
                    break;
                }
            } 
            window.location.replace('./feed');           
        });

    });

});