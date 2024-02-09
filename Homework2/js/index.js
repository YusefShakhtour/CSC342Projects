let operation = "";
let firstOperation = true;
let value1 = "0";
let value2 = "";
let result = "";
let error = false;
let errPoint = 0;

document.addEventListener('DOMContentLoaded', e => {
let btns = document.querySelectorAll('.btn');
let equal = document.querySelector('.equal');
    btns.forEach(function(currentBtn) {
        currentBtn.addEventListener('click', handleClick);
    });
let clearHistory = document.querySelector('.history');
clearHistory.addEventListener('click', clear);
equal.addEventListener('click', handleClick);

let resText = document.querySelector("result");
document.body.onkeydown = function(e) {
    handleText(e.key);
}

let historyDiv = document.querySelectorAll('.hist');
    historyDiv.forEach(function(currentDiv) {
        currentDiv.addEventListener('click', historyClick);
    });
});


function historyClick() {
    if (value1 === "0" && firstOperation && !error) {
        value1 = this.innerHTML;
        document.getElementById("result").innerHTML = value1;
    }
    else if (value2 === "" && firstOperation === false && !error) {
        value2 = this.innerHTML;
        document.getElementById("result").innerHTML = value1 + operation + value2;
    }
}

function handleText(text) {
    if (isNum(text) || isOperation(text) || text === "Backspace" || text === "Enter") {     
        if (text !== "Backspace" && text !== "Enter" && !isOperation(text) && firstOperation && !error) {
            if (value1 == "0") {
                value1 = text;
            }
            else {
                if (text === ".") {
                    errPoint++;
                }
                value1 += text;
            }
            document.getElementById("result").innerHTML = value1;
        }
        else if (isOperation(text) && firstOperation && !error) {
            operation = text;
            document.getElementById("result").innerHTML += operation;
            firstOperation = false;
        }
        else if (!firstOperation && isOperation(text) && value2 === "" && !error) {
            operation = text;
        }

        else if (text !== "Enter" && !isOperation(text) && !firstOperation && text !== "Backspace" && !error) {
            value2 += text;
            document.getElementById("result").innerHTML = value1 + operation + value2;

        }

        else if ((text === "Enter") && value1 != "" && value2 != "" && !error) {
            result = calculate(value1, value2, operation);
            if (result === NaN || result === Infinity) {
                error = true;
                document.getElementById("result").innerHTML = "Error";
            }
            if (errPoint >= 2) {
                error = true;
                document.getElementById("result").innerHTML = "Error";
            }
            else {
                populate(result);
                value1 = "0";
                value2 = "";
                firstOperation = true;
                operation = "";
                document.getElementById("result").innerHTML = result;
            }
        }

        else if (isOperation(text) && !firstOperation && !error) {
            result = calculate(value1, value2, operation);
            if (result === NaN || result === Infinity) {
                error = true;
                document.getElementById("result").innerHTML = "Error";
            }
            if (errPoint >= 2) {
                error = true;
                document.getElementById("result").innerHTML = "Error";
            }
            else {
                populate(result);
                value1 = result;
                value2 = ""
                operation = text;
                document.getElementById("result").innerHTML = result;
            }
        }

        else if (text === "Backspace") {
            value1 = "0";
            value2 = "";
            result = "";
            firstOperation = true;
            error = false;
            errPoint = 0;
            operation = "";
            document.getElementById("result").innerHTML = value1;

        }
    }
}

function isNum(input) {
    if (input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' 
        || input === '7' || input === '8' || input === '9' || input === '0' || input === '.') {
        return true;
    }
    return false;
}

function clear() {
    this.blur();
    let elems = document.getElementsByClassName("hist");
    while (elems[0]) {
        elems[0].parentNode.removeChild(elems[0]);
    }

}

function populate(num) {
    let element = document.createElement("div");
    element.classList.add("hist");
    element.appendChild(document.createTextNode(num));
    document.getElementById("table").appendChild(element);
    historyDiv = document.querySelectorAll('.hist');
    historyDiv.forEach(function(currentDiv) {
        currentDiv.addEventListener('click', historyClick);
    });
}
 
function isOperation(variable) {
    if (variable === "-" || variable === "+" || variable === "÷" || variable === "✕" || variable === "*" || variable === "/") {
        return true;
    }
    return false;
}

function calculate(v1, v2, op) {
    let r1 = 0;
    if (op === "+") {
        r1 = parseFloat(v1) + parseFloat(v2);
    }
    else if (op === "-") {
        r1 = parseFloat(v1) - parseFloat(v2);
    }
    else if (op === "÷" || op === "/") {
        r1 = parseFloat(v1) / parseFloat(v2);
    }
    else if (op === "✕" || op === "*") {
        r1 = parseFloat(v1) * parseFloat(v2);
    }
    return r1;
}

function handleClick() {
    let text = this.textContent;
    this.blur();

    if (text !== "C" && text !== "=" && !isOperation(text) && firstOperation && !error) {
        if (value1 == "0") {
            value1 = text;
        }
        else {
            if (text === ".") {
                errPoint++;
            }
            value1 += text;
        }
        document.getElementById("result").innerHTML = value1;
    }
    else if (isOperation(text) && firstOperation && !error) {
        if (errPoint >= 2) {
            error = true;
            document.getElementById("result").innerHTML = "Error";
        }
        else {
            errPoint = 0;
            operation = text;
            firstOperation = false;
        }
    }
    else if (!firstOperation && isOperation(text) && value2 === "" && !error) {
        operation = text;
    }

    else if (text !== "=" && !isOperation(text) && !firstOperation && text !== "C" && !error) {
        if (text === ".") {
            errPoint++;
        }
        value2 += text;
        document.getElementById("result").innerHTML = value2;

    }

    else if (text === "=" && value1 != "" && value2 != "" && !error) {
        result = calculate(value1, value2, operation);
        if (result === NaN || result === Infinity) {
            error = true;
            document.getElementById("result").innerHTML = "Error";
        }
        if (errPoint >= 2) {
            error = true;
            document.getElementById("result").innerHTML = "Error";
        }
        else {
            populate(result);
            value1 = "0";
            value2 = "";
            firstOperation = true;
            operation = "";
            document.getElementById("result").innerHTML = result;
        }
    }

    else if (isOperation(text) && !firstOperation && !error) {
        result = calculate(value1, value2, operation);
        if (result === NaN || result === Infinity) {
            error = true;
            document.getElementById("result").innerHTML = "Error";
        }
        if (errPoint >= 2) {
            error = true;
            document.getElementById("result").innerHTML = "Error";
        }
        else {
            populate(result);
            value1 = result;
            value2 = ""
            operation = text;
            document.getElementById("result").innerHTML = result;
        }
    }

    else if (text === "C") {
        value1 = "0";
        value2 = "";
        result = "";
        operation = "";
        firstOperation = true;
        error = false;
        errPoint = 0;
        document.getElementById("result").innerHTML = value1;

    }

}

