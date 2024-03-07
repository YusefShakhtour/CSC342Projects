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

    let form = document.getElementById("form");

    let ccv = document.getElementById("cc")
    let file = document.getElementById("fileIn");
    

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

    ccv.addEventListener('change', function() {
        if (!isNaN(ccv.value - parseFloat(ccv.value))) {
            ccv.setCustomValidity("");
        }
        else {
            ccv.setCustomValidity("Please enter a valid, 3-4 digit numerical CCV");
        }
    });

    file.addEventListener('change', function(e) {
        const input = e.target;
        if (input.validity.patternMismatch) {
            input.setCustomValidity("Please choose a file");
        }
        else {
            input.setCustomValidity("");
        }
    })

    msg.addEventListener('change', function(e) {
        const input = e.target;
        if (input.validity.patternMismatch) {
            input.setCustomValidity("Your message must be between 10 and 500 characters long");
        }
        else {
            input.setCustomValidity("");
        }
    })

    cardNum.addEventListener('change', function(e) {
        const input = e.target;
        if (String(input.value).length != 16) {
            input.setCustomValidity("Please enter a 16 digit card number");
        }
        else {
            input.setCustomValidity("");
        }
    })

    expDate.addEventListener('change', function(e) {
        let date = expDate.value;
        let split = date.split("-");
        let exp = new Date(split[0], split[1]);
        let today = new Date();
        const input = e.target;
        if (exp < today) {
            input.setCustomValidity("The card you entered is expired");
        }
        else {
            input.setCustomValidity("");
        }
    })

    textPhone.addEventListener('change', function(e) {
        const input = e.target;
        if (input.validity.patternMismatch) {
            input.setCustomValidity("Enter the number in the following format ##########");
        }
        else {
            input.setCustomValidity("");
        }
    })

    radioEmail.addEventListener('change', function(e) {
        console.log("text");
        textEmail.required = true;
        textPhone.required = false;

    })

    radioSMS.addEventListener('change', function(e) {
        console.log("text");
        textPhone.required = true;
        textEmail.required = false;

    })

    radioNeither.addEventListener('change', function(e) {
        console.log("text");
        textPhone.required = false;
        textEmail.required = false;
    })

    form.addEventListener('submit', function(e) {

        console.log(file.checkValidity());
        if (!file.checkValidity()) {
            e.preventDefault();
            file.setCustomValidity("Gotta fill this broskie");
            file.reportValidity();  
        }
        
        if (file.checkValidity()) {
            file.setCustomValidity("");
            file.reportValidity();
        }
        // console.log(cardNum.checkValidity());
        // console.log(msg.checkValidity());
        // console.log(expDate.checkValidity());
        // console.log(check.checkValidity());
        // console.log(file.checkValidity());

        // Issue here is that when I submit, the console.log does not get printed if the form is not in a valid state
        // So I'm confused as to how any of my messages would get set if the only way they get set is on successful submission
        console.log("Submit attempt");

        // The previous issue when I was using a click event is that if I attempted to submit with an invalid input
        // that had a custom validity message set, it would show the error, and even if I fixed it, it would still 
        // say that it was wrong. This only occurred to the elements that I had set a custom validity message for.
        // Elements that were using the default are working as expected 
        if (!msg.checkValidity()) {
            console.log("Invalid");
            msg.setCustomValidity("Your message should be at least 10 characters, but no more than 500 characters");
        }
        // I attempted to set the validity message to "" and null but neither worked
        else if (msg.checkValidity()) {
            console.log("Valid");
            msg.setCustomValidity("");
        }

        // All of the below code is the same issues that are occuring with setCustomValidity above.

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
        //     check.setCustomValidity("You must agree to our terms and conditions to use this service");
        // }

    });
});