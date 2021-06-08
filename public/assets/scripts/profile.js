// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Codes about page rendering ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// }
let beneficiaryName = $("#beneficiaryName");
let beneficiaryDOB = $("#beneficiaryDOB");
let beneficiaryAddress = $("#beneficiaryAddress");
let beneficiaryRelation = $("#beneficiaryRelation");
let beneficiaryID = $("#beneficiaryId");
let beneficiaryIsChild = $("#beneficiaryIsChild");
let beneficiaryIsCharity = $("#beneficiaryIsCharity");
let beneficiaryGuardianName = $("#beneficiaryGuardianName");
let beneficiaryGuardianAddress = $("#beneficiaryGuardianAddress");
let beneficiaryAdd = $("#addBeneficiary");
let beneficiaryUpdate = $("#updateBeneficiary");

let executorID = $("#executorId");
let executorName = $("#executorName");
let executorDOB = $("#executorDOB");
let executorAddress = $("#executorAddress");
let executorRelation = $("#executorRelation");
let executorIsAlternate = $("#executorIsAlternate");
let executorAdd = $("#executorAdd");
let executorUpdate = $("#executorUpdate");

let assetID = $("#assetId");
let assetDescription = $("#assetDescription");
let assetValue = $("#assetValue");
let assetType = $("#assetType");

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Beneficiary relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
$("#addBeneficiary").on("submit", addBenificiary);
function addBenificiary() {
  var newName = $("#beneficiaryName").val();

  // fetch("/api/create/beneficiary", {
  //   method: "POST",
  //   body: {
  //     name: newName,
  //   },
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   });

  //Backend delete pending
}

$(".beneficiaryDelete").on("click", deleteBenificiary);
function deleteBenificiary(event) {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let beneficiaryOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // console.log(beneficiaryOb.id);
  $(event.target).parent().remove();
  fetch(`/api/beneficiary/${beneficiaryOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  //Backend delete pending
}

$(".beneficiaryBtn").on("mouseover", updateBeneficiaryModal);
$(".beneficiaryBtn").on("focus", updateBeneficiaryModal);

function updateBeneficiaryModal(event) {
  //   event.stopPropagation();
  let benificiaryBtn = $(event.target);

  let beneficiaryObject = JSON.parse(benificiaryBtn.attr("data"));
  beneficiaryID.val(beneficiaryObject.id);
  beneficiaryName.val(beneficiaryObject.name);
  beneficiaryDOB.val(beneficiaryObject.DOB);
  beneficiaryRelation.val(beneficiaryObject.relationship);
  beneficiaryAddress.val(beneficiaryObject.address);
  beneficiaryIsChild.attr("checked", beneficiaryObject.isChild);
  beneficiaryIsCharity.attr("checked", beneficiaryObject.isCharity);
  beneficiaryGuardianAddress.val(beneficiaryObject.guardian_address);
  beneficiaryGuardianName.val(beneficiaryObject.guardian_name);
}

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Beneficiary relevant codes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

$(".executorBtn").on("mouseover", updateExecutorModal);
$(".executorBtn").on("focus", updateExecutorModal);

function updateExecutorModal(event) {
  //   event.stopPropagation();
  let executorBtn = $(event.target);
  let executorObject = JSON.parse(executorBtn.attr("data"));
  executorID.val(executorObject.id);
  executorName.val(executorObject.name);
  executorDOB.val(executorObject.DOB);
  executorRelation.val(executorObject.relationship);
  executorAddress.val(executorObject.address);
  executorIsAlternate.attr("checked", executorObject.IsAlternate);
}

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Executor relevant codes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

$(".assetBtn").on("mouseover", updateAssetModal);
$(".assetBtn").on("focus", updateAssetModal);

function updateAssetModal(event) {
  //   event.stopPropagation();
  let assetBtn = $(event.target);
  let assetObject = JSON.parse(assetBtn.attr("data"));
  assetID.val(assetObject.id);
  assetDescription.val(assetObject.description);
  assetType.val(assetObject.type);
  assetValue.val(assetObject.value);
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Asset relevant codes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
