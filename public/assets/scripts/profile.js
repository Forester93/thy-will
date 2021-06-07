const beneficiariesList = document.getElementById("part-1");
let beneficiaryData = [];
fetch("/api/users/data/1")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response);
  });
