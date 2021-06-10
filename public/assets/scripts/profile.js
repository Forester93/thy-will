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
  console.log(beneficiaryOb.id);
  $(event.target).parent().remove();
  // Call this Backend Route with this method
  fetch(`/api/beneficiary/${beneficiaryOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
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

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Asset relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteAsset = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let assetOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/asset/${assetOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    $(event.target).parent().remove();
  }
};

$(".assetDelete").on("click", deleteAsset);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addAsset = async (event) => {
  // event.preventDefault();
  const description = $("#assetDescription").val().trim();
  const type = $("#assetType").val();
  const value = $("#assetValue").val();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if ( description && type && value ) {
    const response = await fetch(`/api/asset`, {
      method: "POST",
      body: JSON.stringify({ description, type, value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    }
    // location.reload();
  }
};

$("#assetModalFooter").on("click", "#addAssetBtn", addAsset);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var assetIdClicked;
const updateAsset = async (event) => {
  // event.preventDefault();
  const description = $("#assetDescription").val().trim();
  const type = $("#assetType").val();
  const value = $("#assetValue").val();
  // Call this Backend Route with this method
  const response = await fetch(`/api/asset/${assetIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({ description, type, value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  // location.reload();
};
$("#assetModalFooter").on("click", "#updateAssetBtn", updateAsset);

// Functions to switch Add or Update Modal
const assetModalToUpdate = (event) => {
  // We need to get the target asset id for update with this click
  let targetclicked = $(event.target);
  assetObjClicked = JSON.parse(targetclicked.attr("data"));
  assetIdClicked = assetObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#assetDescription").val(assetObjClicked.description);
  $("#assetType").val(assetObjClicked.type);
  $("#assetValue").val(assetObjClicked.value);
  // Switch to Update Modal
  $("#assetModalTitle").text("Update Asset");
  $("#assetModalFooter")
    .children(0)
    .attr("id", "updateAssetBtn")
    .text("Update");
};

const assetModalToAdd = () => {
  // Clear out previous autocomplete
  $("#assetDescription").val('');
  $("#assetType").val('');
  $("#assetValue").val('');
  // Switch to Add Modal
  $("#assetModalTitle").text("Add Asset");
  $("#assetModalFooter").children(0).attr("id", "addAssetBtn").text("Add");
};

$(".assetBtn").on("click", assetModalToUpdate);
$("#launchAsset").on("click", assetModalToAdd);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Witness relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteWitness = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let witnessOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/witness/${witnessOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    $(event.target).parent().remove();
  }
};

$(".witnessDelete").on("click", deleteWitness);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addWitness = async (event) => {
  // event.preventDefault();
  const name = $("#witnessName").val().trim();
  const relationship = $("#witnessRelation").val();
  const address = $("#witnessAddress").val().trim();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if ( name && address ) {
    const response = await fetch(`/api/witness`, {
      method: "POST",
      body: JSON.stringify({ name, relationship, address }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    }
    // location.reload();
  }
};

$("#witnessModalFooter").on("click", "#addWitnessBtn", addWitness);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var witnessIdClicked;
const updateWitness = async (event) => {
  // event.preventDefault();
  const name = $("#witnessName").val().trim();
  const relationship = $("#witnessRelation").val();
  const address = $("#witnessAddress").val().trim();
  // Call this Backend Route with this method
  const response = await fetch(`/api/witness/${witnessIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({ name, relationship, address }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  // location.reload();
};

$("#witnessModalFooter").on("click", "#updateWitnessBtn", updateWitness);

// Functions to switch Add or Update Modal
const witnessModalToUpdate = (event) => {
  // We need to get the target witness id for update with this click
  let targetclicked = $(event.target);
  witnessObjClicked = JSON.parse(targetclicked.attr("data"));
  witnessIdClicked = witnessObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#witnessName").val(witnessObjClicked.name);
  $("#witnessRelation").val(witnessObjClicked.relationship);
  $("#witnessAddress").val(witnessObjClicked.address);
  // Switch to Update Modal
  $("#witnessModalTitle").text("Update Witness");
  $("#witnessModalFooter")
    .children(0)
    .attr("id", "updateWitnessBtn")
    .text("Update");
};

const witnessModalToAdd = () => {
  // Clear out previous autocomplete
  $("#witnessName").val('');
  $("#witnessRelation").val('');
  $("#witnessAddress").val('');
  // Switch to Add Modal
  $("#witnessModalTitle").text("Add Witness");
  $("#witnessModalFooter").children(0).attr("id", "addWitnessBtn").text("Add");
};

$(".witnessBtn").on("click", witnessModalToUpdate);
$("#launchWitness").on("click", witnessModalToAdd);
