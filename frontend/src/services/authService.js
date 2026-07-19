const STORAGE_KEY = "trusthub_auth_user";
const REMEMBER_KEY = "trusthub_remember_email";

function delay(ms = 900) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function readUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

/**
 * Mock authentication service — no network calls.
 */
export const authService = {
  getCurrentUser() {
    return readUser();
  },

  getRememberedEmail() {
    return localStorage.getItem(REMEMBER_KEY) || "";
  },

  setRememberedEmail(email, remember) {
    if (remember && email) {
      localStorage.setItem(REMEMBER_KEY, email);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }
  },

  async login({ email, password, remember = false }) {
    await delay();

    // Mock: accept any validated credentials
    const user = {
      id: "mock-user-1",
      email: email.trim().toLowerCase(),
      firstName: "Trust",
      lastName: "User",
      username: email.split("@")[0],
      loggedInAt: new Date().toISOString(),
    };

    writeUser(user);
    this.setRememberedEmail(email, remember);

    return { user, token: "mock-jwt-token" };
  },

  async register(payload) {
    await delay(1100);

    const user = {
      id: `mock-${Date.now()}`,
      email: payload.email.trim().toLowerCase(),
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      username: payload.username.trim(),
      loggedInAt: new Date().toISOString(),
    };

    writeUser(user);
    return { user, token: "mock-jwt-token" };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default authService;
