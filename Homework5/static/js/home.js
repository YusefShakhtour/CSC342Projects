import api from './APIClient.js';


let logout = document.querySelector('.logoutBtn');

document.addEventListener("DOMContentLoaded", function() {

  let text = document.querySelector('.welcomeBack');
    api.getCurrentUser()
    .then(user => {
      text.innerHTML = "Welcome back " + user.first_name + " " + user.last_name + "!"; 
    })
    .catch(error => {
      document.location = "./login";
    })
})

logout.addEventListener("click", e => {
    e.preventDefault();
    api.logOut().then(() => {
      document.location = "./login";
    });
});