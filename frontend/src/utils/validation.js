const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value || "").trim());
}

export function getPasswordStrength(password = "") {
  const value = String(password);
  let score = 0;

  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  if (!value) {
    return { score: 0, label: "", percent: 0, tone: "muted" };
  }
  if (score <= 1) {
    return { score, label: "Weak", percent: 25, tone: "danger" };
  }
  if (score === 2) {
    return { score, label: "Fair", percent: 45, tone: "warning" };
  }
  if (score === 3) {
    return { score, label: "Good", percent: 70, tone: "info" };
  }
  return { score, label: "Strong", percent: 100, tone: "success" };
}

export function validateLogin(values) {
  const errors = {};

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
}

export function validateRegister(values) {
  const errors = {};

  if (!values.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!values.username?.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(values.username.trim())) {
    errors.username = "3–20 characters: letters, numbers, underscore";
  }

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (getPasswordStrength(values.password).score < 2) {
    errors.password = "Use a stronger password";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "You must agree to the Terms";
  }

  return errors;
}
