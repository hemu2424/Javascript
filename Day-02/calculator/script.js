const display = document.querySelector(".display");

const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        switch (value) {

            case "C":
                expression = "";
                display.value = "";
                break;

            case "←":
                expression = expression.slice(0, -1);
                display.value = expression;
                break;

            case "=":

                try {

                    expression = eval(expression).toString();
                    display.value = expression;

                } catch {

                    display.value = "Error";
                    expression = "";

                }

                break;

            default:

                expression += value;
                display.value = expression;

        }

    });

});