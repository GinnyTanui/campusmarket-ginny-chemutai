/* ============================================================
   CampusMarket — Create Account form validation (Week 3 task)
   Required checks: a required field, a format check, and a
   custom rule (password match) — plus a live interactive
   element (password strength bar). Uses addEventListener
   throughout, and event.preventDefault() so the page never
   reloads and wipes out the validation messages.
   ============================================================ */

function setFieldState(input, errorEl, isValid, message) {
  input.classList.toggle("is-invalid", !isValid);
  input.classList.toggle("is-valid", isValid && input.value.trim() !== "");
  errorEl.textContent = isValid ? "" : message;
  errorEl.className = isValid ? "field-success" : "field-error";
  if (isValid && input.value.trim() !== "") {
    errorEl.textContent = "Looks good";
  }
}

function validateRequired(input, errorEl, label) {
  const isValid = input.value.trim() !== "";
  setFieldState(input, errorEl, isValid, `${label} cannot be empty`);
  return isValid;
}

function validateEmail(input, errorEl) {
  const value = input.value.trim();
  if (value === "") {
    setFieldState(input, errorEl, false, "Email cannot be empty");
    return false;
  }
  // Simple, readable email format check — HTML's type="email" also backs this up.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = pattern.test(value);
  setFieldState(input, errorEl, isValid, "Enter a valid email address");
  return isValid;
}

function validatePhone(input, errorEl) {
  const value = input.value.trim();
  if (value === "") {
    setFieldState(input, errorEl, false, "Phone number cannot be empty");
    return false;
  }
  // Kenyan mobile format: 07xx xxx xxx / 01xx xxx xxx, spaces optional.
  const pattern = /^0[71]\d{8}$/;
  const isValid = pattern.test(value.replace(/\s+/g, ""));
  setFieldState(input, errorEl, isValid, "Enter a valid Kenyan phone number, e.g. 0712345678");
  return isValid;
}

function validatePassword(input, errorEl) {
  const value = input.value;
  const isValid = value.length >= 8;
  setFieldState(input, errorEl, isValid, "Password must be at least 8 characters");
  return isValid;
}

// Custom rule (Week 3: "beyond HTML's rules") — confirm password must match password.
function validatePasswordMatch(passwordInput, confirmInput, errorEl) {
  const isValid = confirmInput.value !== "" && confirmInput.value === passwordInput.value;
  setFieldState(confirmInput, errorEl, isValid, "Passwords do not match");
  return isValid;
}

function validateTerms(checkbox, errorEl) {
  const isValid = checkbox.checked;
  errorEl.textContent = isValid ? "" : "You must accept the terms to continue";
  errorEl.className = isValid ? "field-success" : "field-error";
  return isValid;
}

function updatePasswordStrength(value) {
  const bar = document.querySelector("[data-strength-bar]");
  const label = document.querySelector("[data-strength-label]");
  if (!bar || !label) return;

  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  bar.classList.remove("strength-weak", "strength-medium", "strength-strong");

  if (value.length === 0) {
    bar.style.width = "0%";
    label.textContent = "";
    return;
  }
  if (score <= 1) {
    bar.style.width = "33%"; bar.classList.add("strength-weak"); label.textContent = "Weak";
  } else if (score <= 3) {
    bar.style.width = "66%"; bar.classList.add("strength-medium"); label.textContent = "Medium";
  } else {
    bar.style.width = "100%"; bar.classList.add("strength-strong"); label.textContent = "Strong";
  }
}

function wireRegisterForm() {
  const form = document.querySelector("[data-register-form]");
  if (!form) return;

  const fullName = form.querySelector("[name='fullName']");
  const email = form.querySelector("[name='email']");
  const phone = form.querySelector("[name='phone']");
  const campus = form.querySelector("[name='campus']");
  const password = form.querySelector("[name='password']");
  const confirmPassword = form.querySelector("[name='confirmPassword']");
  const terms = form.querySelector("[name='terms']");

  const errors = {
    fullName: form.querySelector("[data-error-for='fullName']"),
    email: form.querySelector("[data-error-for='email']"),
    phone: form.querySelector("[data-error-for='phone']"),
    campus: form.querySelector("[data-error-for='campus']"),
    password: form.querySelector("[data-error-for='password']"),
    confirmPassword: form.querySelector("[data-error-for='confirmPassword']"),
    terms: form.querySelector("[data-error-for='terms']")
  };

  // Live feedback as the user types/leaves each field.
  fullName.addEventListener("blur", () => validateRequired(fullName, errors.fullName, "Full name"));
  email.addEventListener("blur", () => validateEmail(email, errors.email));
  phone.addEventListener("blur", () => validatePhone(phone, errors.phone));
  campus.addEventListener("change", () => validateRequired(campus, errors.campus, "Campus"));

  password.addEventListener("input", () => {
    updatePasswordStrength(password.value);
    validatePassword(password, errors.password);
    if (confirmPassword.value) validatePasswordMatch(password, confirmPassword, errors.confirmPassword);
  });
  confirmPassword.addEventListener("input", () => validatePasswordMatch(password, confirmPassword, errors.confirmPassword));
  terms.addEventListener("change", () => validateTerms(terms, errors.terms));

  // The actual submit — this is where preventDefault() matters most.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const checks = [
      validateRequired(fullName, errors.fullName, "Full name"),
      validateEmail(email, errors.email),
      validatePhone(phone, errors.phone),
      validateRequired(campus, errors.campus, "Campus"),
      validatePassword(password, errors.password),
      validatePasswordMatch(password, confirmPassword, errors.confirmPassword),
      validateTerms(terms, errors.terms)
    ];

    const allValid = checks.every(Boolean);
    const banner = document.querySelector("[data-success-banner]");

    if (allValid) {
      banner.classList.remove("hidden");
      banner.textContent = `Welcome to CampusMarket, ${fullName.value.split(" ")[0]}! Your account has been created.`;
      form.reset();
      updatePasswordStrength("");
      Object.values(errors).forEach(el => { el.textContent = ""; });
      form.querySelectorAll(".field-input").forEach(el => el.classList.remove("is-valid", "is-invalid"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      banner.classList.add("hidden");
      showToast("Please fix the highlighted fields");
    }
  });
}

document.addEventListener("DOMContentLoaded", wireRegisterForm);
