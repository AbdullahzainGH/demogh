(function () {
  "use strict";

  /**
   * Simple client-side auth demo using localStorage.
   * This is NOT secure for real apps; replace with server APIs.
   */

  // Utilities
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setMessage(element, text, type) {
    if (!element) return;
    element.textContent = text || "";
    element.className = "text-sm mt-2";
    if (!text) return;
    if (type === "error") {
      element.classList.add("text-red-600");
    } else if (type === "success") {
      element.classList.add("text-green-600");
    } else {
      element.classList.add("text-gray-600");
    }
  }

  function disableButton(button, disabled) {
    if (!button) return;
    button.disabled = !!disabled;
    if (disabled) {
      button.dataset.originalText = button.textContent;
      button.textContent = "Please wait…";
    } else if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      delete button.dataset.originalText;
    }
  }

  function getStoredUsers() {
    try {
      const raw = localStorage.getItem("demo_users");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem("demo_users", JSON.stringify(users));
    } catch (e) {
      // ignore
    }
  }

  function findUserByEmail(email) {
    const users = getStoredUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  // Validation helpers
  function validateEmail(email) {
    return EMAIL_REGEX.test(String(email).trim());
  }

  function validatePassword(password) {
    return typeof password === "string" && password.length >= 8;
  }

  // Signup handler
  const signupForm = document.getElementById("signupForm");
  const signupButton = document.getElementById("signupButton");
  const signupMessage = document.getElementById("signupMessage");

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirm = document.getElementById("signupConfirm").value;

      setMessage(signupMessage, "", "");

      if (!name) {
        setMessage(signupMessage, "Please enter your full name.", "error");
        return;
      }
      if (!validateEmail(email)) {
        setMessage(signupMessage, "Enter a valid email address.", "error");
        return;
      }
      if (!validatePassword(password)) {
        setMessage(signupMessage, "Password must be at least 8 characters.", "error");
        return;
      }
      if (password !== confirm) {
        setMessage(signupMessage, "Passwords do not match.", "error");
        return;
      }

      if (findUserByEmail(email)) {
        setMessage(signupMessage, "An account with this email already exists.", "error");
        return;
      }

      disableButton(signupButton, true);

      // Simulate async request
      setTimeout(function () {
        const users = getStoredUsers();
        users.push({ name, email, password });
        saveUsers(users);
        setMessage(signupMessage, "Account created! Redirecting to login…", "success");
        disableButton(signupButton, false);
        setTimeout(function () {
          window.location.href = "./login.html";
        }, 700);
      }, 600);
    });
  }

  // Login handler
  const loginForm = document.getElementById("loginForm");
  const loginButton = document.getElementById("loginButton");
  const loginMessage = document.getElementById("loginMessage");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      setMessage(loginMessage, "", "");

      if (!validateEmail(email)) {
        setMessage(loginMessage, "Enter a valid email address.", "error");
        return;
      }
      if (!validatePassword(password)) {
        setMessage(loginMessage, "Password must be at least 8 characters.", "error");
        return;
      }

      disableButton(loginButton, true);

      // Simulate async request
      setTimeout(function () {
        const user = findUserByEmail(email);
        if (!user || user.password !== password) {
          setMessage(loginMessage, "Invalid email or password.", "error");
          disableButton(loginButton, false);
          return;
        }

        // Save session
        try {
          localStorage.setItem(
            "demo_session",
            JSON.stringify({ email: user.email, name: user.name, loggedInAt: Date.now() })
          );
        } catch (e) {
          // ignore
        }

        setMessage(loginMessage, "Signed in!", "success");
        disableButton(loginButton, false);
        // In a real app, redirect to dashboard page
        alert("Welcome, " + user.name + "! (demo)");
      }, 600);
    });
  }
})();
