// const beneficiariesList = document.getElementById("part-1");
// let beneficiaryData = [];
// fetch("/api/users/data/1")
//   .then((response) => {
//     return response.json();
//   })
//   .then((response) => {
//     console.log(response);
//   });

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Codes about page rendering ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// }
$("#addBeneficiary").on("click", addBenificiary);
function addBenificiary() {
  var newName = $("#beneficiaryName").val();
  // var newDOB = $('#beneficiaryDOB').val();
  // var newRelationship = $('#beneficiaryRelation').val();
  // var newAddress = $('#beneficiaryAddress').val();
  var newNameEl = $("<button>").text(newName);
  artEl.append(newNameEl);

  //Backend delete pending
}

$(".fa-times").on("click", deleteBenificiary);
function deleteBenificiary(event) {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let beneficiaryOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // console.log(beneficiaryOb.id);
  $(event.target).parent().remove();
  fetch(`/api/beneficiary/${beneficiaryOb.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  //Backend delete pending
}

let beneficiaryName = $("#beneficiaryName");
let beneficiaryDOB = $("#beneficiaryDOB");
let beneficiaryAddress = $("#beneficiaryAddress");
let beneficiaryRelation = $("#beneficiaryRelation");

$(".beneficiaryBtn").on("click", (event) => {
  //   event.stopPropagation();
  let benificiaryBtn = $(event.target);
  
  let beneficiaryObject = JSON.parse(benificiaryBtn.attr("data"));
  console.log(beneficiaryObject);
  beneficiaryName.val(beneficiaryObject.name);
  beneficiaryDOB.val(beneficiaryObject.DOB);
  beneficiaryRelation.val(beneficiaryObject.relationship);
  beneficiaryAddress.val(beneficiaryObject.address);
});

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ All page rendering relevant codes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// alert("hello");
