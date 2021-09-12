let notification = document.querySelector("#notification");
let errors = [];

/////Login/////
let loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    saveLogin();
});

function saveLogin() {
    let userSignIn = document.getElementById("inputUsername").value;
    let passwordSignIn = document.getElementById("inputPassword").value;

    fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            username: userSignIn,
            password: passwordSignIn
        }),
        headers: {
            'Content-Type': "application/json"
        }
    })
        .then(res => res.json())
        .then(resJSON => {
            if (resJSON.error) {
                console.log(resJSON.error)
                errorMessages(resJSON.error.errors)
            }
            else {

                window.location.href = "/room";
            }
        })

}

function errorMessages(errors) {
    notification.innerHTML = `
        ${errors.map(error => `<li class="userList">${error.msg}</li>`).join('')}
    `;
}