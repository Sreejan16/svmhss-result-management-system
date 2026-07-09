// =====================================
// SVMHSS Admin Login
// =====================================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        const username =
        document.getElementById("username").value.trim();

        const password =
        document.getElementById("password").value;

        if (
            username === "Sreejan" &&
            password === "Sreejan@16"
        ) {

            // Save login session
            localStorage.setItem("adminLoggedIn", "true");

            // Open dashboard
            window.location.href = "dashboard.html";

        }

        else {

            document.getElementById("loginMessage").textContent =
            "Invalid Username or Password";

        }

    });

}