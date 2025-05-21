function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validatePassword(password) {
    // Example rule: min 6 chars, at least one number
    const passwordRegex = /^(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }
  
  module.exports = { validateEmail, validatePassword };
  