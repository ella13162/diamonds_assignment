document.addEventListener("DOMContentLoaded", function() {

    function validateEmail() {
      const emailInput = document.getElementById("contact-email");
      const emailError = document.getElementById("email-error");
      
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Invalid email format.";
        return false;
      } else {
        emailError.textContent = "";
        return true;
      }
    }
  
    function validatePassword() {
      const passwordInput = document.getElementById("password");
      const passwordError = document.getElementById("password-error");
      
      if (passwordInput.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        return false;
      } else {
        passwordError.textContent = "";
        return true;
      }
    }
  
    function validateForm() {
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      
      if (!isEmailValid || !isPasswordValid) {
        return false;
      }
      
      return true;
    }
  
    document.getElementById("contact-email").addEventListener("keyup", validateEmail);
    document.getElementById("password").addEventListener("keyup", validatePassword);
  
    // Optional: If you're using a submit button for your form, you can attach this function
    const form = document.querySelector("form[action='/checklogin']");
    if (form) {
      form.addEventListener("submit", function(event) {
        if (!validateForm()) {
          event.preventDefault();
        }
      });
    }
    
  });
  