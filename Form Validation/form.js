const name = document.getElementById("fullName");
const phn = document.getElementById("phn");
const email = document.getElementById("email");
const msg = document.getElementById("msg");

const nameError = document.getElementById("name-error");
const phnError = document.getElementById("phn-error");
const mailError = document.getElementById("mail-error");
const msgError = document.getElementById("msg-error");

const submitBtn = document.getElementById("submitBtn");

const validateFullName = () => {
  const value = name.value.trim();
  const isValid = /^[A-Z][a-zA-Z]*\s[a-zA-Z]*$/.test(value);
  if (name.value === "") {
    nameError.innerHTML = "Name is required";
    nameError.style.display = "block";
    return false;
  } else if (!isValid) {
    nameError.innerHTML = "Invalid full name";
    nameError.style.display = "block";
    return false;
  } else {
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    nameError.style.display = "block";
    return true;
  }
};

name.addEventListener("input", validateFullName);
name.addEventListener("blur", validateFullName);

const validatePhone = () => {
  const value = phn.value.trim();
  const isValid = /^\d*$/.test(value);
  if (phn.value === "") {
    phnError.innerHTML = "Phone number is required";
    phnError.style.display = "block";
    return false;
  } else if (!isValid) {
    phnError.innerHTML = "Invalid phone number";
    phnError.style.display = "block";
    return false;
  } else if (phn.value.length < 10) {
    phnError.innerHTML = "Must be 10 digits";
    phnError.style.display = "block";
    return false;
  } else {
    phnError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    phnError.style.display = "block";
    return true;
  }
};

phn.addEventListener("input", validatePhone);
phn.addEventListener("blur", validatePhone);

const validateEmail = () => {
  const value = email.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (email.value === "") {
    mailError.innerHTML = "Email is required";
    mailError.style.display = "block";
    return false;
  } else if (!isValid) {
    mailError.innerHTML = "Invalid email";
    mailError.style.display = "block";
    return false;
  } else {
    mailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    mailError.style.display = "block";
    return true;
  }
};

email.addEventListener("input", validateEmail);
email.addEventListener("blur", validateEmail);

// const checkAllValidations = () => {
//   const isFullNameValid = validateFullName();
//   const isPhoneValid = validatePhone();
//   const isEmailValid = validateEmail();
//   const isMessageValid = validateMessage();

//   // Enable or disable the submit button based on validation results
//   if (isFullNameValid && isPhoneValid && isEmailValid && isMessageValid) {
//     submitBtn.disabled = false;
//     return true;
//   } else {
//     submitBtn.disabled = true;
//     return false;
//   }
// };

// // Event listeners for real-time validation and button state update
// name.addEventListener("input", checkAllValidations);
// phn.addEventListener("input", checkAllValidations);
// email.addEventListener("input", checkAllValidations);
// msg.addEventListener("input", checkAllValidations);

// name.addEventListener("blur", checkAllValidations);
// phn.addEventListener("blur", checkAllValidations);
// email.addEventListener("blur", checkAllValidations);
// msg.addEventListener("blur", checkAllValidations);

// document.getElementById("form").addEventListener("submit", (event) => {
//   if (!checkAllValidations()) {
//     event.preventDefault(); // Prevent form submission if validation fails

//     // Call validation functions explicitly to trigger error messages for invalid fields
//     validateFullName();
//     validatePhone();
//     validateEmail();
//     validateMessage();
//   }
// });
