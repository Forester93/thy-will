// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Codes about page rendering ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// const { on } = require("pdfkit");

// let beneficiaryName = $("#beneficiaryName");
// let beneficiaryDOB = $("#beneficiaryDOB");
// let beneficiaryAddress = $("#beneficiaryAddress");
// let beneficiaryRelation = $("#beneficiaryRelation");
// let beneficiaryID = $("#beneficiaryId");
// let beneficiaryIsChild = $("#beneficiaryIsChild");
// let beneficiaryIsCharity = $("#beneficiaryIsCharity");
// let beneficiaryGuardianName = $("#beneficiaryGuardianName");
// let beneficiaryGuardianAddress = $("#beneficiaryGuardianAddress");
// let beneficiaryAdd = $("#addBeneficiary");
// let beneficiaryUpdate = $("#updateBeneficiary");

// let executorID = $("#executorId");
// let executorName = $("#executorName");
// let executorDOB = $("#executorDOB");
// let executorAddress = $("#executorAddress");
// let executorRelation = $("#executorRelation");
// let executorIsAlternate = $("#executorIsAlternate");
// let executorAdd = $("#executorAdd");
// let executorUpdate = $("#executorUpdate");

// let assetID = $("#assetId");
// let assetDescription = $("#assetDescription");
// let assetValue = $("#assetValue");
// let assetType = $("#assetType");

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Beneficiary relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// $(".beneficiaryDelete").on("click", deleteBenificiary);
// function deleteBenificiary(event) {
//   event.stopPropagation();
//   let targetDeleteBtn = $(event.target);
//   let beneficiaryOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
//   console.log(beneficiaryOb.id);
//   $(event.target).parent().remove();
//   // Call this Backend Route with this method
//   fetch(`/api/beneficiary/${beneficiaryOb.id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

// $(".beneficiaryBtn").on("mouseover", updateBeneficiaryModal);
// $(".beneficiaryBtn").on("focus", updateBeneficiaryModal);

// function updateBeneficiaryModal(event) {
//   //   event.stopPropagation();
//   let benificiaryBtn = $(event.target);

//   let beneficiaryObject = JSON.parse(benificiaryBtn.attr("data"));
//   beneficiaryID.val(beneficiaryObject.id);
//   beneficiaryName.val(beneficiaryObject.name);
//   beneficiaryDOB.val(beneficiaryObject.DOB);
//   beneficiaryRelation.val(beneficiaryObject.relationship);
//   beneficiaryAddress.val(beneficiaryObject.address);
//   beneficiaryIsChild.attr("checked", beneficiaryObject.isChild);
//   beneficiaryIsCharity.attr("checked", beneficiaryObject.isCharity);
//   beneficiaryGuardianAddress.val(beneficiaryObject.guardian_address);
//   beneficiaryGuardianName.val(beneficiaryObject.guardian_name);
// }
function alert(text) {
  $("#alertMessage").text(text);
  $("#alertButton").trigger("click");
}

const userID = $("#userHeader").attr("user-id");
// console.log(userID);
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Beneficiary relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteBenificiary = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let beneficiaryOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/beneficiary/${beneficiaryOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    // $(event.target).parent().remove();
    location.reload();
  }
};

$(".beneficiaryDelete").on("click", deleteBenificiary);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addBeneficiary = async (event) => {
  event.preventDefault();
  const name = $("#beneficiaryName").val();
  const address = $("#beneficiaryAddress").val();
  const relationship = $("#beneficiaryRelationship").val();
  const DOB = $("#beneficiaryDOB").val();
  const isChild = $("#beneficiaryIsChild").prop("checked");
  const isCharity = $("#beneficiaryIsCharity").prop("checked");
  const guardian_address = $("#beneficiaryGuardianAddress").val();
  const guardian_name = $("#beneficiaryGuardianName").val();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if (name && address) {
    const response = await fetch(`/api/beneficiary`, {
      method: "POST",
      body: JSON.stringify({
        name,
        address,
        relationship,
        DOB,
        isChild,
        isCharity,
        guardian_address,
        guardian_name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    } else {
      location.reload();
    }
  }
};

$("#beneficiaryModalFooter").on("click", "#addBeneficiaryBtn", addBeneficiary);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var beneficiaryIdClicked;
const updateBeneficiary = async (event) => {
  event.preventDefault();
  const name = $("#beneficiaryName").val();
  const address = $("#beneficiaryAddress").val();
  const relationship = $("#beneficiaryRelationship").val();
  const DOB = $("#beneficiaryDOB").val();
  const isChild = $("#beneficiaryIsChild").prop("checked");
  const isCharity = $("#beneficiaryIsCharity").attr("checked");
  const guardian_address = $("#beneficiaryGuardianAddress").val();
  const guardian_name = $("#beneficiaryGuardianName").val();
  // Call this Backend Route with this method
  const response = await fetch(`/api/beneficiary/${beneficiaryIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      address,
      relationship,
      DOB,
      isChild,
      isCharity,
      guardian_address,
      guardian_name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};
$("#beneficiaryModalFooter").on(
  "click",
  "#updateBeneficiaryBtn",
  updateBeneficiary
);

// Functions to switch Add or Update Modal
const beneficiaryModalToUpdate = (event) => {
  // We need to get the target beneficiary id for update with this click
  let targetclicked = $(event.target);
  beneficiaryObjClicked = JSON.parse(targetclicked.attr("data"));
  beneficiaryIdClicked = beneficiaryObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#beneficiaryName").val(beneficiaryObjClicked.name);
  $("#beneficiaryAddress").val(beneficiaryObjClicked.address);
  $("#beneficiaryDOB").val(beneficiaryObjClicked.DOB);
  $("#beneficiaryIsChild").attr("checked", beneficiaryObjClicked.isChild);
  $("#beneficiaryIsCharity").attr("checked", beneficiaryObjClicked.isCharity);
  $("#beneficiaryRelationship").val(beneficiaryObjClicked.relationship);
  $("#beneficiaryGuardianName").val(beneficiaryObjClicked.guardian_name);
  $("#beneficiaryGuardianAddress").val(beneficiaryObjClicked.guardian_address);
  // Switch to Update Modal
  $("#beneficiaryModalTitle").text("Update Beneficiary");
  $("#beneficiaryModalFooter")
    .children(0)
    .attr("id", "updateBeneficiaryBtn")
    .text("Update");
};

const beneficiaryModalToAdd = () => {
  // Clear out previous autocomplete
  $("#beneficiaryName").val("");
  $("#beneficiaryAddress").val("");
  $("#beneficiaryDOB").val("");
  $("#beneficiaryIsChild").attr("checked", false);
  $("#beneficiaryIsCharity").attr("checked", false);
  $("beneficiaryRelationship").val("");
  $("#beneficiaryGuardianName").val("");
  $("#beneficiaryGuardianAddress").val("");
  // Switch to Add Modal
  $("#beneficiaryModalTitle").text("Add Beneficiary");
  $("#beneficiaryModalFooter")
    .children(0)
    .attr("id", "addBeneficiaryBtn")
    .text("Add");
};

$(".beneficiaryBtn").on("mouseover", beneficiaryModalToUpdate);
$(".beneficiaryBtn").on("focus", beneficiaryModalToUpdate);
$(".beneficiaryBtn").on("click", beneficiaryModalToUpdate);
$("#launchBeneficiary").on("click", beneficiaryModalToAdd);
$(".launchBeneficiary").on("mouseover", beneficiaryModalToAdd);
$(".launchBeneficiary").on("focus", beneficiaryModalToAdd);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Executor relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// %%%%%%%%%%%%%%%%%% Delete Handler %%%%%%%%%%%%%%%%%%
const deleteExecutor = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let executorOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/executor/${executorOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    // $(event.target).parent().remove();
    location.reload();
  }
};

$(".executorDelete").on("click", deleteExecutor);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addExecutor = async (event) => {
  event.preventDefault();
  const name = $("#executorName").val();
  const address = $("#executorAddress").val();
  const relationship = $("#executorRelationship").val();
  const isAlternate = $("#executorIsAlternate").prop("checked");
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if (name && address && isAlternate && relationship) {
    const response = await fetch(`/api/executor`, {
      method: "POST",
      body: JSON.stringify({ name, address, relationship, isAlternate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Failed to add");
    }
    location.reload();
  }
};

$("#executorModalFooter").on("click", "#addExecutorBtn", addExecutor);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var executorIdClicked;
const updateExecutor = async (event) => {
  event.preventDefault();
  const name = $("#executorName").val();
  const address = $("#executorAddress").val();
  const relationship = $("#executorRelationship").val();
  const isAlternate = $("#executorIsAlternate").prop("checked");
  // Call this Backend Route with this method
  const response = await fetch(`/api/executor/${executorIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({ name, address, relationship, isAlternate }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};
$("#executorModalFooter").on("click", "#updateExecutorBtn", updateExecutor);

// Functions to switch Add or Update Modal
const executorModalToUpdate = (event) => {
  // We need to get the target executor id for update with this click
  let targetclicked = $(event.target);
  executorObjClicked = JSON.parse(targetclicked.attr("data"));
  executorIdClicked = executorObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#executorName").val(executorObjClicked.name);
  $("#executorAddress").val(executorObjClicked.address);
  $("#executorIsAlternate").prop("checked", executorObjClicked.isAlternate);
  $("#executorRelationship").val(executorObjClicked.relationship);
  // Switch to Update Modal
  $("#executorModalTitle").text("Update Executor");
  $("#executorModalFooter")
    .children(0)
    .attr("id", "updateExecutorBtn")
    .text("Update");
};

const executorModalToAdd = () => {
  // Clear out previous autocomplete
  $("#executorName").val("");
  $("#executorAddress").val("");
  $("#executorIsAlternate").val("");
  $("#executorRelationship").val("");
  // Switch to Add Modal
  $("#executorModalTitle").text("Add Executor");
  $("#executorModalFooter")
    .children(0)
    .attr("id", "addExecutorBtn")
    .text("Add");
};

$(".executorBtn").on("mouseover", executorModalToUpdate);
$(".executorBtn").on("focus", executorModalToUpdate);
$(".executorBtn").on("click", executorModalToUpdate);
$("#launchExecutor").on("mouseover", executorModalToAdd);
$("#launchExecutor").on("focus", executorModalToAdd);
$("#launchExecutor").on("click", executorModalToAdd);

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
    // $(event.target).parent().remove();
    location.reload();
  }
};

$(".assetDelete").on("click", deleteAsset);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addAsset = async (event) => {
  event.preventDefault();
  const description = $("#assetDescription").val().trim();
  const type = $("#assetType").val();
  const value = $("#assetValue").val();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  if (description && type && value) {
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
    location.reload();
  }
};

$("#assetModalFooter").on("click", "#addAssetBtn", addAsset);

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var assetIdClicked;
const updateAsset = async (event) => {
  event.preventDefault();
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
  location.reload();
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
  $("#assetDescription").val("");
  $("#assetType").val("");
  $("#assetValue").val("");
  // Switch to Add Modal
  $("#assetModalTitle").text("Add Asset");
  $("#assetModalFooter").children(0).attr("id", "addAssetBtn").text("Add");
};

$(".assetBtn").on("mouseover", assetModalToUpdate);
$(".assetBtn").on("focus", assetModalToUpdate);
$(".assetBtn").on("click", assetModalToUpdate);
$("#launchAsset").on("mouseover", assetModalToAdd);
$("#launchAsset").on("focus", assetModalToAdd);
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
    // $(event.target).parent().remove();
    location.reload();
  }
};

$(".witnessDelete").on("click", deleteWitness);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addWitness = async (event) => {
  event.preventDefault();
  const name = $("#witnessName").val().trim();
  const occupation = $("#witnessOccupation").val();
  const address = $("#witnessAddress").val().trim();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  const response = await fetch(`/api/witness`, {
    method: "POST",
    body: JSON.stringify({ name, occupation, address }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to add");
  }
  location.reload();
};

// %%%%%%%%%%%%%%%%%% Update Handler %%%%%%%%%%%%%%%%%%
var witnessIdClicked;
const updateWitness = async (event) => {
  event.preventDefault();
  const name = $("#witnessName").val().trim();
  const occupation = $("#witnessOccupation").val();
  const address = $("#witnessAddress").val().trim();
  // Call this Backend Route with this method
  const response = await fetch(`/api/witness/${witnessIdClicked}`, {
    method: "PUT",
    body: JSON.stringify({ name, occupation, address }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};

// Functions to switch Add or Update Modal
const witnessModalToUpdate = (event) => {
  // We need to get the target witness id for update with this click
  let targetclicked = $(event.target);
  witnessObjClicked = JSON.parse(targetclicked.attr("data"));
  witnessIdClicked = witnessObjClicked.id;
  // Add some autocomplete for reviewing previous user input
  $("#witnessName").val(witnessObjClicked.name);
  $("#witnessOccupation").val(witnessObjClicked.occupation);
  $("#witnessAddress").val(witnessObjClicked.address);
  // Switch to Update Modal
  $("#witnessModal").find("form").attr("id", "witness-form-update");
  $("#witnessModalTitle").text("Update Witness");
  $("#witnessModalBtn").text("Update");
  $("#witness-form-update").on("submit", updateWitness);
};

const witnessModalToAdd = () => {
  // Clear out previous autocomplete
  $("#witnessName").val("");
  $("#witnessOccupation").val("");
  $("#witnessAddress").val("");
  // Switch to Add Modal
  $("#witnessModal").find("form").attr("id", "witness-form-add");
  $("#witnessModalTitle").text("Add Witness");
  $("#witnessModalBtn").text("Add");
  $("#witness-form-add").on("submit", addWitness);
};

$(".witnessBtn").on("click", witnessModalToUpdate);
$(".witnessBtn").on("mouseover", witnessModalToUpdate);
$(".witnessBtn").on("focus", witnessModalToUpdate);
$("#launchWitness").on("click", witnessModalToAdd);
$("#launchWitness").on("mouseover", witnessModalToAdd);
$("#launchWitness").on("focus", witnessModalToAdd);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ User relevant codes ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const updateUser = async (event) => {
  event.preventDefault();
  const name = $("#userName").val().trim();
  const DOB = $("#userDOB").val();
  const address = $("#userAddress").val().trim();
  const gender = $("#userGender").val();
  const ceremony = $("#userCeremony").val().trim();
  const casket = $("#userCasket").val().trim();
  const occupation = $("#userOccupation").val().trim();
  // Call this Backend Route with this method
  const response = await fetch(`/api/users/${userID}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      gender,
      DOB,
      address,
      ceremony,
      casket,
      occupation,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Failed to update");
  }
  location.reload();
};

const userModalToUpdate = () => {
  // // Add some autocomplete for reviewing previous user input
  userInfoUpdate();
};

function userInfoUpdate() {
  $("#userName").val($("#currentUserName").text());
  $("#userDOB").val($("#currentUserDOB").text());
  $("#userAddress").val($("#currentUserAddress").text());
  $("#userCasket").val($("#currentUserCasket").text());
  $("#userCeremony").val($("#currentUserCeremony").text());
  $("#userOccupation").val($("#currentUserOccupation").text());
  $("#userGender").val($("#currentUserGender").text());
}

$("#editUser").on("click", userModalToUpdate);
$("#editUser").on("mouseover", userModalToUpdate);
$("#editUser").on("focus", userModalToUpdate);

$("#userModalform").on("submit", updateUser);
userInfoUpdate();

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////ASSET APPORTIONING//////////////////////////////////////////
$(".apportionBtn").on("click", (event) => {
  event.stopPropagation();
  alert(
    "Updating Instructions Not Supported. You can only add or delete instructions."
  );
});

const deleteAssetApportion = async (event) => {
  event.stopPropagation();
  let targetDeleteBtn = $(event.target);
  let assetApportionOb = JSON.parse(targetDeleteBtn.parent().attr("data"));
  // Call this Backend Route with this method
  const response = await fetch(`/api/assetapportion/${assetApportionOb.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // Front end element manipulating actions
    // $(event.target).parent().remove();
    location.reload();
  } else {
    alert("Something went wrong! Error:" + response.status);
  }
};

$(".assetApportionDelete").on("click", deleteAssetApportion);

// %%%%%%%%%%%%%%%%%% Add Handler %%%%%%%%%%%%%%%%%%
const addAssetApportion = async (event) => {
  event.preventDefault();
  const apportion_instructions = $("#apportionInstructions").val().trim();
  const beneficiary_id = $("#apportionBeneficiaryID").val();
  const asset_id = $("#apportionAssetID").val().trim();
  const percentage = $("#apportionPercentage").val().trim();
  // Prevent adding data with same name (Pending)
  // Call this Backend Route with this method, but need to prevent null with if statement
  const response = await fetch(`/api/assetapportion`, {
    method: "POST",
    body: JSON.stringify({
      apportion_instructions,
      beneficiary_id,
      asset_id,
      percentage,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert(
      "Failed to add instructions! Error " +
        response.status +
        response.statusText
    );
  } else {
    location.reload();
  }
};

$("#assetApportion-form").on("submit", addAssetApportion);
