import APIClient from "./APIClient.js";

//Creating header option
APIClient.getUserById(localStorage.getItem("userId")).then(user => {
    let nav = document.querySelector(".navbar");
    let btnText = document.querySelector('.btnText');
    btnText.innerHTML = "@" + user.username;

    let profImg = document.createElement('img');
    profImg.classList.add('image', 'rounded-circle');
    profImg.src = user.avatar;
    nav.appendChild(profImg);

    let profileBtn = document.querySelector('.profileBtn');
    let logoutBtn = document.querySelector('.logoutBtn');
    profileBtn.href = "./profile?id=" + user.id;

    //Logout
    logoutBtn.addEventListener('click', function() {
        APIClient.logout();
        localStorage.removeItem("userId");
        window.location.replace("./login");
    });
});

document.addEventListener('DOMContentLoaded', function() {
    //Check if there is a user session
    if (!localStorage.getItem("userId")) {
        //If not, send to an error page of some sort, or just back to the login page
        window.location.replace('./login');
    }
    let userId = localStorage.getItem("userId");

    let arr = [];
    //Get current users howls
    APIClient.getHowls(userId).then(userHowls => {
        for (let i = 0; i < userHowls.length; i++) {
            arr.push(userHowls[i]);
        }
    });
    //Get users' followed howls
    APIClient.getFollows(userId).then(follows => {
        for (let i = 0; i < follows.length; i++) {
            APIClient.getHowls(follows[i]).then(howl => {
                for (let j = 0; j < howl.length; j++) {
                    arr.push(howl[j]);
                }
                if (i == follows.length - 1) {
                    arr.sort((a,b) => new Date(b.datetime) - new Date(a.datetime));
                    for (let i = 0; i < arr.length; i++) {
                        createHowl(arr[i]);
                    }
                }
            });
        }
    });

    //Howl validation
    let btn = document.querySelector('.howl');
    btn.addEventListener('click', function() { 
        let textArea = document.querySelector('.howlText');
        if (textArea.value.trim() == "") {
            textArea.setCustomValidity("Please enter what you would like to howl");
            textArea.reportValidity();
        }
        else if (textArea.value.length > 300) {
            textArea.setCustomValidity("Your howl must be less than or equal to 300 characters");
            textArea.reportValidity();
        }
        else {
            textArea.setCustomValidity("");
            APIClient.createHowl(localStorage.getItem("userId"), textArea.value);
            window.location.reload();
        }
    });
});

//Create the HTML for a howl
function createHowl(user) {
    APIClient.getUserById(user.userId).then(current => {
        let first = current.first_name;
        let last = current.last_name;
        let atName = current.username;
        let profilePic = current.avatar;
        let howlText = user.text;

        let howlDate = formatDate(user.datetime);
        const link = document.createElement('a');
        link.href = './profile?id=' + user.userId;
        const card = document.createElement('div');
        card.classList.add('card-body', 'border', 'border-3', 'border-dark', 'mt-3');
    
        const header = document.createElement('div');
        header.classList.add('cardHeader');
        header.classList.add('row');
        header.classList.add('ml-3');
        header.classList.add('mt-3');
    
        const userInfo = document.createElement('div');
        userInfo.classList.add('col-3');
        const cardTitle = document.createElement('h6');
        cardTitle.classList.add('card-title')
        cardTitle.innerHTML = first + " " + last;
        const userName = document.createElement('h6');
        userName.classList.add('userName');
        userName.innerHTML = "@" + atName;
        userInfo.appendChild(cardTitle);
        userInfo.appendChild(userName);
        const img = document.createElement('img');
        img.classList.add('border', 'border-2', 'border-dark', 'rounded-circle', 'img-fluid.', 'max-width:100%', 'col-3');
        img.src = profilePic;
    
        const date = document.createElement('h7');
        date.classList.add('date', 'col-6');
        date.innerHTML = howlDate;
    
        header.appendChild(img);
        header.appendChild(userInfo);
        header.appendChild(date);
    
        const paragraph = document.createElement('div');
        paragraph.classList.add('justify-content-center');
        paragraph.classList.add('row');
        paragraph.classList.add('cardText');
    
        const pTag = document.createElement('p');
        pTag.classList.add('col-11');
        pTag.classList.add('mt-3');
        pTag.innerHTML = howlText;
    
        paragraph.appendChild(pTag);
        card.appendChild(header);
        card.appendChild(paragraph);
    
        const howls = document.getElementById('howlList');
        link.appendChild(card);
        howls.append(link);
    });
}

//Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    
    const months = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}