import api from './APIClient.js';

let logout = document.querySelector('.logoutBtn');

logout.addEventListener("click", e => {
    console.log("test");
    e.preventDefault();
    api.logOut().then(() => {
      document.location = "./login";
    });
});