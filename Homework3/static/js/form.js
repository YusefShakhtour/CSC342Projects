document.addEventListener('DOMContentLoaded', e => {

    let submit = document.getElementById('submit');
    let radioEmail = document.getElementById("email");
    let radioSMS = document.getElementById("sms");
    let radioNeither = document.getElementById("none");
    let expDate = document.getElementById("date");
    let textPhone = document.getElementById("textPhone");
    let textEmail = document.getElementById("textEmail");
    let msg = document.querySelector('#msg');
    let cardNum = document.getElementById('card');

    let form = document.querySelector("form");

    let check = document.getElementById('check');
    let file = document.getElementById("fileIn");
    

    radioSMS.addEventListener('click', function(e) {
        textPhone.required = true;
        textEmail.required = false;
        radioEmail.checked = false;
        radioNeither.checked = false;
    })

    radioEmail.addEventListener('click', function(e) {
        textPhone.required = false;
        textEmail.required = true;
        radioSMS.checked = false;
        radioNeither.checked = false;

    })

    radioNeither.addEventListener('click', function(e) {
        textPhone.required = false;
        textEmail.required = false;
        radioSMS.checked = false;
        radioEmail.checked = false;
    })

    file.addEventListener('change', function(e) {
        let input = e.target;
        let img = document.getElementById("preview");
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    });

    // cardNum.setCustomValidity("Please enter your card in the following format ####-####-####-####");
    // check.setCustomValidity("You must agree to our terms and conditions to use this service");
    // msg.setCustomValidity("Your message should be at least 10 characters, but no more than 500 characters");
    // let date = expDate.value;
    // let split = date.split("/");
    // let exp = new Date(split[1], split[0]);
    // let today = new Date();
    // if (!expDate.checkValidity()) {
    //     expDate.setCustomValidity("Please match the following format: MM/YYYY");
    // }
    // else if (exp < today) {
    //     expDate.setCustomValidity("The card you entered is expired")
    // }

    // if (!textPhone.checkValidity() && radioSMS.checked) {
    //     textPhone.setCustomValidity("Please enter the 10 digit phone number you would like to notify ##########");
    // }

    // if (!textEmail.checkValidity() && radioEmail.checked) {
    //     textPhone.setCustomValidity("Please enter the email you would like to notify");
    // }

    // if (!check.checkValidity()) {
    //     console.log(check.checkValidity());
    //     check.setCustomValidity("You must agree to our terms and conditions to use this service");
    // }


    msg.setCustomValidity("Your message should be at least 10 characters, but no more than 500 characters");

    submit.addEventListener('click', function(e) {
        // console.log(cardNum.checkValidity());
        // console.log(msg.checkValidity());
        // console.log(expDate.checkValidity());
        // console.log(check.checkValidity());
        // console.log(file.checkValidity());
        console.log("Submit attempt");

        if (msg.checkValidity() == false) {
            msg.setCustomValidity("Your message should be at least 10 characters, but no more than 500 characters");
        }
        else {
            msg.setCustomValidity(null);
        }



        let date = expDate.value;
        let split = date.split("/");
        let exp = new Date(split[1], split[0]);
        let today = new Date();
        if (!expDate.checkValidity()) {
            expDate.setCustomValidity("Please match the following format: MM/YYYY");
        }
        else if (exp < today) {
            expDate.setCustomValidity("The card you entered is expired")
        }
        

        if (!textPhone.checkValidity() && radioSMS.checked) {
            textPhone.setCustomValidity("Please enter the 10 digit phone number you would like to notify ##########");
        }

        if (!textEmail.checkValidity() && radioEmail.checked) {
            textPhone.setCustomValidity("Please enter the email you would like to notify");
        }

        if (!check.checkValidity()) {
            check.setCustomValidity("You must agree to our terms and conditions to use this service");
        }

    });

    // form.addEventListener("submit", function(e) {
    //     console.log("Submit attempt");
    //     if (!msg.checkValidity()) {
    //         msg.setCustomValidity("Your message should be at least 10 characters, but no more than 500 characters");
    //     }
    //     else {
    //         msg.setCustomValidity("");
    //     }

    //     msg.reportValidity();

    //     let date = expDate.value;
    //     let split = date.split("/");
    //     let exp = new Date(split[1], split[0]);
    //     let today = new Date();
    //     if (!expDate.checkValidity()) {
    //         expDate.setCustomValidity("Please match the following format: MM/YYYY");
    //     }
    //     else if (exp < today) {
    //         expDate.setCustomValidity("The card you entered is expired");
    //     }
    //     else {
    //         expDate.setCustomValidity("");
    //     }
        

    //     if (!textPhone.checkValidity() && radioSMS.checked) {
    //         textPhone.setCustomValidity("Please enter the 10 digit phone number you would like to notify ##########");
    //     }

    //     if (!textEmail.checkValidity() && radioEmail.checked) {
    //         textPhone.setCustomValidity("Please enter the email you would like to notify");
    //     }

    //     if (!check.checkValidity()) {
    //         console.log(check.checkValidity());
    //         check.setCustomValidity("You must agree to our terms and conditions to use this service");
    //     }
    // })
});