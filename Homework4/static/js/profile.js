import APIClient from "./APIClient.js";

const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');

//Creating header and user info
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

APIClient.getUserById(id).then(user => {
    //Creating user Profile Info
    const container = document.querySelector('.infoList');
    const spacer = document.createElement('div')
    spacer.classList.add("col-1");
    let inCont = document.createElement('div');
    inCont.classList.add('d-flex', 'align-items-center', 'col-3');
    let profPic = document.createElement('img');
    profPic.classList.add('img-fluid', 'rounded-circle', 'border', 'border-dark', 'border-3');
    profPic.src = user.avatar;
    inCont.appendChild(profPic);

    const infoCont = document.createElement('div');
    infoCont.classList.add('col-4', 'infoCont');
    const profName = document.createElement('div');
    profName.innerHTML = user.first_name + " " + user.last_name;
    const profUser = document.createElement('div');
    profUser.innerHTML = "@" + user.username;
    infoCont.appendChild(profName);
    infoCont.appendChild(profUser);
    const spacer2 = document.createElement('div')
    spacer2.classList.add("col-1");

    container.appendChild(spacer);
    container.appendChild(inCont);
    container.appendChild(infoCont);
});


createFollow(id);

document.addEventListener('DOMContentLoaded', function() {
    
    //Check if there is a user session
    if (!localStorage.getItem("userId")) {
        //If not, send to an error page of some sort, or just back to the login page
        window.location.replace('./login');
    }

    let arr = [];
    //Get current users howls
    APIClient.getHowls(id).then(userHowls => {
        for (let i = 0; i < userHowls.length; i++) {
            arr.push(userHowls[i]);
        }
        arr.sort((a,b) => new Date(b.datetime) - new Date(a.datetime));
        for (let i = 0; i < arr.length; i++) {
            createHowl(arr[i]);
        }
    });

    APIClient.getFollows(localStorage.userId).then(following => {
        let checkBtn = document.querySelector('.checkboxBtn');
        let btnLabel = document.querySelector(".btnLabel");
        let followFlag = false;
        let selfFlag = false;

        for (let i = 0; i < following.length; i++) {
            if (following[i] == id) {
                followFlag = true;
            }
            else if (id == localStorage.userId) {
                selfFlag = true;
            }
        }

        if (followFlag) {
            checkBtn.checked = true;
            btnLabel.innerHTML = "Unfollow";
        }
        else {
            checkBtn.checked = false;
            btnLabel.innerHTML = "Follow";
        }

        if (selfFlag) {
            btnLabel.innerHTML = "N/A";
            btnLabel.classList.add("disabled");
        }

        checkBtn.addEventListener('click', function(e) {
            if (checkBtn.checked) {
                APIClient.follow(id);
                window.location.reload();
            }
            else {
                APIClient.unfollow(id);
                window.location.reload();    
            }
        });
    });
})


//Create the HTML for dispalying Follows
function createFollow(current) {
    APIClient.getUserById(current).then(user => {
        APIClient.getFollows(user.id).then(followData => {
            for (let i = 0; i < followData.length; i++) {
                APIClient.getUserById(followData[i]).then(user => {
                    let item = document.querySelector(".flush-collapseOne");
                    let first = user.first_name;
                    let last = user.last_name;
                    let atName = user.username;
                    let profilePic = user.avatar;

                    const link = document.createElement('a');
                    link.href = './profile?id=' + user.id;

                    let body = document.createElement('div');
                    body.classList.add("accordion-body", "d-flex");
                    let img = document.createElement('img');
                    img.classList.add("accImg", "border", "border-2", "border-dark", "rounded-circle", "img-fluid.", "max-width:100%", "col-3");
                    img.src = profilePic;
                    let space = document.createElement('div');
                    space.classList.add("col-1");
                    let info = document.createElement('div');
                    info.classList.add("col-3");
                    let name = document.createElement('div'); 
                    let at = document.createElement('div');
                    name.innerHTML = first + " " + last;
                    at.innerHTML = "@" + atName;
                    info.appendChild(name);
                    info.appendChild(at);
                    body.appendChild(img);
                    body.appendChild(space);
                    body.appendChild(info);
                    link.appendChild(body)
                    item.appendChild(link);

                });
            }
        });
    });
}

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

//Create date on howl
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