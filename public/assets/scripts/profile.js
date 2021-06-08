const beneficiariesList = document.getElementById("part-1");
let beneficiaryData = [];
fetch("/api/users/data/1")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response);
  });

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Codes about page rendering ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
$("#part-1-list").on("click", ".updateBtn", viewBenificiary);
function viewBenificiary(event) {
var targetdata = parseInt($(event.target));
  console.log(targetdata);
  
  
  $("#beneficiaryName").val("abc");
  // alert("hello");
  //Backend delete pending
}

$("#addBeneficiary").on("click", addBenificiary);
function addBenificiary(event) {
  event.preventDefault();
  var newName = $("#beneficiaryName").val();
  // var newDOB = $('#beneficiaryDOB').val();
  // var newRelationship = $('#beneficiaryRelation').val();
  // var newAddress = $('#beneficiaryAddress').val();
  var newNameEl = $("<span>").text(newName);
  var deleteBtn = $('<i class="fas fa-times">');
  var newBtnEl = $("<button>")
    .addClass("w-100 updateBtn")
    .attr("data-toggle", "modal")
    .attr("data-target", "#beneficiaryUpdate");
  newBtnEl.append(newNameEl, deleteBtn);
  $("#part-1-list").append(newBtnEl);
  //Backend create pending
}

$(".fa-times").on("click", deleteBenificiary);
function deleteBenificiary(event) {
  event.stopPropagation();
  $(event.target).parent().remove();
  //Backend delete pending
}

// alert("hello");
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Codes about page rendering ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
