function alert(text) {
  $("#alertMessage").text(text);
  $("#alertButton").trigger("click");
}

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  let response;
  if (email && password) {
    response = await fetch("/api/accounts", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to log in!");
    }
  }
};

const signUpFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const passwordRepeat = document
    .querySelector("#password-repeat")
    .value.trim();
  let response;
  if (email && password && password == passwordRepeat) {
    response = await fetch("/api/accounts/create", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      response = await fetch("/api/accounts", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/profile");
      }
    } else {
      alert("Failed to sign up!");
    }
  }
};

document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);
// const starterPage = () => {
//   document.location.replace("/starter");
// };

document.querySelector("#signBtn").addEventListener("click", signUpFormHandler);
