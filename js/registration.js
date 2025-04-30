document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const regForm = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const roleSelect = document.getElementById('role');
    const roleDescription = document.getElementById('role-description-text');
    const loginBtn = document.getElementById('login-btn');
    const alreadyHaveAccountBtn = document.getElementById('already-have-account'); // Add this button in your HTML
    
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const successMessage = document.getElementById('success-message');
    
    // Role descriptions
    const roleDescriptions = {
        '': 'Select your account type',
        'user': 'Standard user account with basic access',
        'admin': 'Administrator account with management privileges',
        'superadmin': 'Super administrator with full system access'
    };
    
    // Update role description when selection changes
    roleSelect.addEventListener('change', function() {
        roleDescription.textContent = roleDescriptions[this.value];
    });
    
    // Login button click handler
    loginBtn.addEventListener('click', function() {
        // Store form data in sessionStorage
        const userData = {
            username: usernameInput.value,
            email: emailInput.value,
            role: roleSelect.value
        };
        
        // Save to sessionStorage
        sessionStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to login page
        window.location.href = 'login.html';
    });
    
    // "Already have an account" button click handler - NEW
    alreadyHaveAccountBtn.addEventListener('click', function() {
        // Store current form data in sessionStorage
        const currentFormData = {
            username: usernameInput.value,
            email: emailInput.value,
            // Don't store passwords in sessionStorage for security
            role: roleSelect.value
        };
        
        sessionStorage.setItem('partialUserData', JSON.stringify(currentFormData));
        
        // Redirect to login page
        window.location.href = 'login.html';
    });
    
    // Registration Form Validation
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset error messages
        usernameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        confirmPasswordError.style.display = 'none';
        successMessage.style.display = 'none';
        
        // Validate username
        if (usernameInput.value.length < 3 || usernameInput.value.length > 20) {
            usernameError.style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validate password
        if (passwordInput.value.length < 8) {
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        // Validate password match
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.style.display = 'block';
            isValid = false;
        }
        
        // Validate role selected
        if (!roleSelect.value) {
            isValid = false;
        }
        
        if (isValid) {
            registerUser();
        }
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Register user
    function registerUser() {
        const user = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value, // Note: In production, hash this password
            role: roleSelect.value,
            createdAt: new Date().toISOString()
        };
        
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        const emailExists = users.some(u => u.email === user.email);
        if (emailExists) {
            emailError.textContent = 'Email already registered';
            emailError.style.display = 'block';
            return;
        }
        
        // Check if username already exists
        const usernameExists = users.some(u => u.username === user.username);
        if (usernameExists) {
            usernameError.textContent = 'Username already taken';
            usernameError.style.display = 'block';
            return;
        }
        
        // Add new user
        users.push(user);
        
        // Store in localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        successMessage.style.display = 'block';
        regForm.reset();
    }
});