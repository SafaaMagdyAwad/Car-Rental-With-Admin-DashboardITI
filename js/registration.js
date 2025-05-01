document.addEventListener('DOMContentLoaded', function() {
    const regForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const roleSelect = document.getElementById('role');
    const roleDescription = document.getElementById('role-description-text');
    const loginBtn = document.getElementById('login-btn');
    const alreadyHaveAccountBtn = document.getElementById('login-btn'); 

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const successMessage = document.getElementById('success-message');
    
    const roleDescriptions = {
        '': 'Select your account type',
        'user': 'Standard user account with basic access',
        'admin': 'Administrator account with management privileges',
        'superadmin': 'Super administrator with full system access'
    };
    
    roleSelect.addEventListener('change', function() {
        roleDescription.textContent = roleDescriptions[this.value];
    });
    
    loginBtn.addEventListener('click', function() {
        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            role: roleSelect.value
        };
        
        sessionStorage.setItem('user', JSON.stringify(userData));
        window.location.href = 'login.html';
    });
    
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) return;
        registerUser();
    });
    
    function validateForm() {
        let isValid = true;
        resetErrors();
        
        if (nameInput.value.length < 3 || nameInput.value.length > 20) {
            showError(nameError);
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailError);
            isValid = false;
        }
        
        if (passwordInput.value.length < 8) {
            showError(passwordError);
            isValid = false;
        }
        
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordError);
            isValid = false;
        }
        
        if (!roleSelect.value) {
            alert('Please select a role');
            isValid = false;
        }
        
        return isValid;
    }
    let users=JSON.parse(localStorage.getItem("users"))||[];
    function registerUser() {
        const user = {
            id:users.length+1,
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value, 
            role: roleSelect.value,
            createdAt: new Date().toISOString()
        };
        
        if (isEmailRegistered(user.email)) {
            showError(emailError, 'Email already registered');
            return;
        }
        
        if (isUsernameRegistered(user.name)) {
            showError(nameError, 'Username already taken');
            return;
        }
        
        if (user.role === 'user') {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        } else { // admin or superadmin
            const admins = JSON.parse(localStorage.getItem('admins')) || [];
            admins.push(user);
            localStorage.setItem('admins', JSON.stringify(admins));
        }
        
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
    
    function isUsernameRegistered(name) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        return [...users, ...admins].some(u => u.name === name);
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
        [nameError, emailError, passwordError, confirmPasswordError].forEach(el => {
            el.style.display = 'none';
        });
    }
});