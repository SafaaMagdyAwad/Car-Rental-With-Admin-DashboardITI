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
    const alreadyHaveAccountBtn = document.getElementById('login-btn'); 

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
        const userData = {
            username: usernameInput.value,
            email: emailInput.value,
            role: roleSelect.value
        };
        
        sessionStorage.setItem('user', JSON.stringify(userData));
        window.location.href = 'login.html';
    });
    
    // Registration Form Validation
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) return;
        registerUser();
    });
    
    function validateForm() {
        let isValid = true;
        resetErrors();
        
        // Validate username
        if (usernameInput.value.length < 3 || usernameInput.value.length > 20) {
            showError(usernameError);
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailError);
            isValid = false;
        }
        
        // Validate password
        if (passwordInput.value.length < 8) {
            showError(passwordError);
            isValid = false;
        }
        
        // Validate password match
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordError);
            isValid = false;
        }
        
        // Validate role selected
        if (!roleSelect.value) {
            alert('Please select a role');
            isValid = false;
        }
        
        return isValid;
    }
    
    function registerUser() {
        const user = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value, // Note: In production, hash this password
            role: roleSelect.value,
            createdAt: new Date().toISOString()
        };
        
        // Check if email already exists in either users or admins
        if (isEmailRegistered(user.email)) {
            showError(emailError, 'Email already registered');
            return;
        }
        
        // Check if username already exists in either users or admins
        if (isUsernameRegistered(user.username)) {
            showError(usernameError, 'Username already taken');
            return;
        }
        
        // Store user based on role
        if (user.role === 'user') {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        } else { // admin or superadmin
            const admins = JSON.parse(localStorage.getItem('admins')) || [];
            admins.push(user);
            localStorage.setItem('admins', JSON.stringify(admins));
        }
        
        // Show success and redirect
        successMessage.style.display = 'block';
        alert('Registration successful!');
        sessionStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => window.location.href = 'login.html', 1500);
    }
    
    function isEmailRegistered(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        return [...users, ...admins].some(u => u.email === email);
    }
    
    function isUsernameRegistered(username) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        return [...users, ...admins].some(u => u.username === username);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(element, message = null) {
        if (message) element.textContent = message;
        element.style.display = 'block';
    }
    
    function resetErrors() {
        [usernameError, emailError, passwordError, confirmPasswordError].forEach(el => {
            el.style.display = 'none';
        });
    }
});