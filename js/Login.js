document.addEventListener('DOMContentLoaded', function() {
    // Check for remembered login
    const rememberMe = localStorage.getItem('rememberAdmin');
    if (rememberMe) {
        const adminData = JSON.parse(rememberMe);
        document.getElementById('email').value = adminData.email;
        document.getElementById('password').value = adminData.password;
        document.getElementById('rememberMe').checked = true;
    }

    // Check for registration data
    const userData = sessionStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById('email').value = user.email;
        sessionStorage.removeItem('user');
    }

    // Form elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Event listeners
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateEmail() && validatePassword()) {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const rememberMe = document.getElementById('rememberMe').checked;
            
            authenticateUser(email, password, rememberMe);
        } else {
            // Shake animation for invalid form
            const loginContainer = document.querySelector('.login-container');
            loginContainer.classList.add('shake-animation');
            setTimeout(() => loginContainer.classList.remove('shake-animation'), 500);
        }
    });
});

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    document.getElementById('emailError').style.display = 
        (!isValid && email.length > 0) ? 'block' : 'none';
    
    return email.length > 0 ? isValid : false;
}

function validatePassword() {
    const password = document.getElementById('password').value.trim();
    const isValid = password.length >= 6;
    
    document.getElementById('passwordError').style.display = 
        (!isValid && password.length > 0) ? 'block' : 'none';
    
    return password.length > 0 ? isValid : false;
}

function authenticateUser(email, password, rememberMe) {
    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check admin first
    const admin = admins.find(a => a.email === email && a.password === password);
    if (admin) {
        handleLoginSuccess(admin, rememberMe, 'admin');
        return;
    }
    
    // Then check regular users
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        handleLoginSuccess(user, rememberMe, 'user');
        return;
    }
    
    // If no match found
    alert('Invalid credentials. Please try again.');
    document.querySelector('.login-container').classList.add('shake-animation');
    setTimeout(() => document.querySelector('.login-container').classList.remove('shake-animation'), 500);
}

function handleLoginSuccess(user, rememberMe, userType) {
    // Store session
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
    // Remember me functionality
    if (rememberMe) {
        localStorage.setItem('rememberAdmin', JSON.stringify({
            email: user.email,
            password: user.password
        }));
    } else {
        localStorage.removeItem('rememberAdmin');
    }
    
    // Redirect based on role
    const redirectPage = userType === 'admin' ? '/admin/admins.html' : 'index.html';
    alert(`Welcome ${user.username || user.email}! Redirecting...`);
    window.location.href = redirectPage;
}