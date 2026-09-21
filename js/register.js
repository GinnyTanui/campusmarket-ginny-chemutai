
const form = document.getElementById("register-form");

const nameInput     = document.getElementById("full-name");
const emailInput    = document.getElementById("email");
const phoneInput    = document.getElementById("phone");
const roleSelect    = document.getElementById("role");
const passwordInput = document.getElementById("password");
const confirmInput  = document.getElementById("confirm-password");
const termsInput    = document.getElementById("terms");

const formAlert     = document.getElementById("form-alert");
const successPanel  = document.getElementById("success-panel");
const successName   = document.getElementById("success-name");
const registerAnotherBtn = document.getElementById("register-another");

const strengthBar   = document.getElementById("strength-bar");
const strengthText  = document.getElementById("strength-text");


form.noValidate = true;



function validateName(value) {
  const name = value.trim();
  if (name === "") {
    return "Enter your full name.";
  }
  if (name.length < 2) {
    return "Your name needs at least 2 characters.";
  }
  return "";
}

// REQUIRED + FORMAT check
function validateEmail(value) {
  const email = value.trim();
  if (email === "") {
    return "Enter your email address.";
  }
  // A regular expression (regex) describes the SHAPE of valid text:
  //   ^[^\s@]+   one or more characters that are not spaces or @
  //   @          then an @
  //   [^\s@]+    more characters, then
  //   \.         a dot, then
  //   [^\s@]+$   more characters until the end
  // This only checks the shape. It cannot prove the mailbox exists.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return "Enter an email like name@example.com.";
  }
  return "";
}

// REQUIRED + FORMAT check (Kenyan mobile numbers)
function validatePhone(value) {
  // Remove spaces and dashes first, so "0712 345 678" is accepted.
  const phone = value.replace(/[\s-]/g, "");
  if (phone === "") {
    return "Enter your phone number.";
  }
  // 0712345678, 0112345678, 254712345678 or +254712345678
  const kenyanPhone = /^(?:\+?254|0)[17]\d{8}$/;
  if (!kenyanPhone.test(phone)) {
    return "Use a Kenyan number like 0712 345 678 or +254 712 345 678.";
  }
  return "";
}

// REQUIRED (a dropdown still on "Choose one" has the value "")
function validateRole(value) {
  if (value === "") {
    return "Choose whether you want to buy, sell or both.";
  }
  return "";
}

// REQUIRED + CUSTOM rules (HTML's minlength cannot check "has a number")
function validatePassword(value) {
  if (value === "") {
    return "Create a password.";
  }
  if (value.length < 8) {
    return "Use at least 8 characters.";
  }
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  if (!hasLetter || !hasNumber) {
    return "Include at least one letter and one number.";
  }
  return "";
}

// CUSTOM rule: two fields must match. HTML cannot express this on its own.
function validateConfirm(value) {
  if (value === "") {
    return "Type your password again.";
  }
  if (value !== passwordInput.value) {
    return "Passwords do not match.";
  }
  return "";
}


const fields = [
  { input: nameInput,     check: function () { return validateName(nameInput.value); } },
  { input: emailInput,    check: function () { return validateEmail(emailInput.value); } },
  { input: phoneInput,    check: function () { return validatePhone(phoneInput.value); } },
  { input: roleSelect,    check: function () { return validateRole(roleSelect.value); } },
  { input: passwordInput, check: function () { return validatePassword(passwordInput.value); } },
  { input: confirmInput,  check: function () { return validateConfirm(confirmInput.value); } },
  {
    input: termsInput,
    check: function () {
      return termsInput.checked ? "" : "Tick this box to create an account.";
    }
  }
];



function setFieldState(input, message) {
  const errorElement = document.getElementById(input.id + "-error");
  errorElement.textContent = message;

  if (message === "") {
    input.classList.remove("invalid");
    input.classList.add("valid");
    input.removeAttribute("aria-invalid");   // tells screen readers the field is OK
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
  }
}

// Runs one field's check and shows the result. Returns true if the field is valid.
function validateField(field) {
  const message = field.check();
  setFieldState(field.input, message);
  return message === "";
}



const touched = new Set();

for (const field of fields) {
  const input = field.input;

  // Dropdowns and checkboxes fire "change"; text boxes fire "input" on every keystroke.
  const isChoice = input.tagName === "SELECT" || input.type === "checkbox";
  const liveEvent = isChoice ? "change" : "input";

  input.addEventListener("blur", function () {
    touched.add(input);
    validateField(field);
  });

  input.addEventListener(liveEvent, function () {
    if (touched.has(input)) {
      validateField(field);
    }
  });
}


form.addEventListener("submit", function (event) {
  
  event.preventDefault();

  let invalidCount = 0;
  let firstInvalidInput = null;

  // Check every field, even ones the visitor never touched.
  for (const field of fields) {
    touched.add(field.input);
    const isValid = validateField(field);

    if (!isValid) {
      invalidCount++;
      if (firstInvalidInput === null) {
        firstInvalidInput = field.input;
      }
    }
  }

  if (invalidCount > 0) {
    // Tell the visitor what happened, then jump to the first problem.
    if (invalidCount === 1) {
      formAlert.textContent = "1 field needs your attention.";
    } else {
      formAlert.textContent = invalidCount + " fields need your attention.";
    }
    formAlert.hidden = false;
    firstInvalidInput.focus();
    return;   // stop here: do not continue to the success step
  }

  // Everything passed.
  formAlert.hidden = true;
  showSuccess();
});




function showSuccess() {
  // Use the first word of the full name: "Wanjiru Kamau" becomes "Wanjiru"
  const firstName = nameInput.value.trim().split(" ")[0];
  successName.textContent = firstName;

  form.hidden = true;            // `hidden` is a built-in attribute JS can switch
  successPanel.hidden = false;
  successPanel.focus();          // moves keyboard and screen-reader focus to the message
}

function resetForm() {
  form.reset();                  // clears every field
  touched.clear();

  // Remove leftover red/green states and error text.
  for (const field of fields) {
    field.input.classList.remove("valid", "invalid");
    field.input.removeAttribute("aria-invalid");
    document.getElementById(field.input.id + "-error").textContent = "";
  }

  updateStrengthMeter();         // form.reset() does not fire "input", so do it by hand

  // form.reset() does not undo a "Show" click either, so mask the passwords again.
  for (const button of toggleButtons) {
    document.getElementById(button.dataset.target).type = "password";
    button.textContent = "Show";
    button.setAttribute("aria-pressed", "false");
  }

  formAlert.hidden = true;
  successPanel.hidden = true;
  form.hidden = false;
  nameInput.focus();
}

registerAnotherBtn.addEventListener("click", resetForm);



function getPasswordStrength(password) {
  if (password === "") {
    return { score: 0, label: "" };
  }

  let score = 0;
  if (password.length >= 8) score++;                                   // long enough
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;       // mixed case
  if (/\d/.test(password)) score++;                                    // has a number
  if (/[^A-Za-z0-9]/.test(password)) score++;                          // has a symbol

  // A password shorter than 8 characters is never better than "Weak".
  if (password.length < 8) {
    score = Math.min(score, 1);
  }

  // Anything typed at all shows at least "Weak" (0 is reserved for an empty box).
  score = Math.max(score, 1);

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  return { score: score, label: labels[score] };
}

function updateStrengthMeter() {
  const result = getPasswordStrength(passwordInput.value);
  // The CSS reads data-level to decide the bar's width and colour.
  strengthBar.dataset.level = result.score;

  if (result.score === 0) {
    strengthText.textContent = "";
  } else {
    strengthText.textContent = "Password strength: " + result.label;
  }
}

passwordInput.addEventListener("input", function () {
  updateStrengthMeter();


  if (touched.has(confirmInput)) {
    validateField(fields[5]);    // fields[5] is the confirm-password entry
  }
});



const toggleButtons = document.querySelectorAll(".toggle-password");

for (const button of toggleButtons) {
  button.hidden = false;

  button.addEventListener("click", function () {
    // data-target in the HTML holds the id of the box this button controls.
    const target = document.getElementById(button.dataset.target);
    const isCurrentlyHidden = target.type === "password";

    // Changing the input's type between "password" and "text" reveals or masks it.
    target.type = isCurrentlyHidden ? "text" : "password";
    button.textContent = isCurrentlyHidden ? "Hide" : "Show";
    button.setAttribute("aria-pressed", String(isCurrentlyHidden));
  });
}




const infoToggle = document.getElementById("info-toggle");
const infoPanel  = document.getElementById("info-panel");


infoPanel.style.display = "none";
infoToggle.hidden = false;

infoToggle.addEventListener("click", function () {
  const isHidden = infoPanel.style.display === "none";

  infoPanel.style.display = isHidden ? "block" : "none";
  infoToggle.setAttribute("aria-expanded", String(isHidden));
  infoToggle.textContent = isHidden ? "Hide how we use your details" : "How we use your details";
});