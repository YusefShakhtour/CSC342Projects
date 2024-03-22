import APIClient from "./APIClient.js";

//Creating header option
APIClient.getUserById(localStorage.getItem("userId")).then(user => {
    let nav = document.querySelector(".navbar");
    let profButton = document.createElement('a');
    profButton.classList.add('profile', 'nav-link', 'studentBtn')
    profButton.href = "#";
    profButton.innerHTML = "@" + user.username;
    nav.appendChild(profButton);

    let profImg = document.createElement('img');
    profImg.classList.add('image', 'rounded-circle');
    profImg.src = user.avatar;
    nav.appendChild(profImg);

    //Logout by clicking student (//TODO currently temporary just to have a way to logout)
    let logOut = document.querySelector(".studentBtn")
    logOut.addEventListener('click', function() {
        APIClient.logout();
        localStorage.removeItem("userId");
        window.location.replace("./login");
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // console.log("cookie after dom: " + document.cookie);

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
                    //I don't know why the references outside the for-loop don't work, but this is 
                    //The only thing I found working as of now
                    //TODO Need to sort the array by date. I think I can do it by just comparing datetime like below
                    // console.log(arr[0].datetime < arr[4].datetime);
                    const howls = document.getElementById('howlList');
                    // howls.push(createHowl(arr[0]));
                    for (let i = 0; i < arr.length; i++) {
                        createHowl(arr[i]);
                    }
                }
            });
        }
    });

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
            // Change the user[0] to the current user in the session meaning I would
            // not need the apiClient call (I think idk how sessions rlly work yet) 
            // and then it should work
            // APIClient.getUsers().then(users => {
            //     makeHowl(users[0], textArea.value);
            //     textArea.value = "";
            // });
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

        //Need to figure out how to convert this to a proper date syntax
        // Eg (2020-03-13T17:19:13Z -> March 13th, 2020, 5:19PM)
        let howlDate = user.datetime;
        const link = document.createElement('a');
        link.href = '/profile?id=' + user.userId;
        const card = document.createElement('div');
        card.classList.add('card-body', 'border', 'border-3', 'border-dark', 'mt-3');
    
        const header = document.createElement('div');
        header.classList.add('justify-content-center');
        header.classList.add('cardHeader');
        header.classList.add('row');
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
        img.classList.add('rounded-circle', 'img-fluid.', 'max-width:100%', 'col-3', 'border', 'border-2', 'border-dark');
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


//Don't need
function makeHowl(user, howlText) {
        let first = user.first_name;
        let last = user.last_name;
        let atName = user.username;
        let profilePic = user.avatar;

        //Need to figure out how to convert this to a proper date syntax
        // Eg (2020-03-13T17:19:13Z -> March 13th, 2020, 5:19PM)
        // console.log(new Date());
        let howlDate = "PlaceHolder";

        const card = document.createElement('div');
        card.classList.add('card-body', 'border', 'border-3', 'border-dark', 'mt-3');
    
    
        const header = document.createElement('div');
        header.classList.add('justify-content-center');
        header.classList.add('cardHeader');
        header.classList.add('row');
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
        img.classList.add('rounded-circle', 'img-fluid.', 'max-width:100%', 'col-3', 'border', 'border-2', 'border-dark');
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
        howls.insertBefore(card, howls.firstChild);
}