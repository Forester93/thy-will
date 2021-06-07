const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector("#loginBtn")
  .addEventListener("click", loginFormHandler);


const starterPage = () => {
  document.location.replace("/starter");
}

document
  .querySelector("#startBtn")
  .addEventListener("click", starterPage);