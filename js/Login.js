document.addEventListener('DOMContentLoaded', function () {
    const rememberMe = localStorage.getItem('rememberAdmin');
    if (rememberMe) {
        const adminData = JSON.parse(rememberMe);
        document.getElementById('email').value = adminData.email;
        document.getElementById('password').value = adminData.password;
        document.getElementById('rememberMe').checked = true;
    }

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    document.getElementById('adminLoginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const emailValid = validateEmail();
        const passwordValid = validatePassword();

        if (emailValid && passwordValid) {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const rememberMe = document.getElementById('rememberMe').checked;

            authenticateAdmin(email, password, rememberMe);
        } else {
            const loginContainer = document.querySelector('.login-container');
            loginContainer.classList.add('shake-animation');
            setTimeout(() => {
                loginContainer.classList.remove('shake-animation');
            }, 500);
        }
    });

    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            const user = {
                username,
                email,
                password, 
                role,
                createdAt: new Date().toISOString()
            };

            sessionStorage.setItem('user', JSON.stringify(user));
            
            // Store in localStorage for persistence (existing users array)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    if (window.location.pathname.includes('login.html')) {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            if (user.email && document.getElementById('email')) {
                document.getElementById('email').value = user.email;
            }
            window.user = user;
            
          
        }
    }
});

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);

    if (!isValid && email.length > 0) {
        document.getElementById('emailError').style.display = 'block';
        return false;
    } else {
        document.getElementById('emailError').style.display = 'none';
        return email.length > 0 ? isValid : false;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value.trim();
    const isValid = password.length >= 6;

    if (!isValid && password.length > 0) {
        document.getElementById('passwordError').style.display = 'block';
        return false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
        return password.length > 0 ? isValid : false;
    }
}

function authenticateAdmin(email, password, rememberMe) {
    // Check both admins and regular users
    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // First check admins
    const admin = admins.find(admin => admin.email === email && admin.password === password);
    if (admin) {
        handleSuccessfulLogin(admin, rememberMe, 'admin');
        return;
    }
    
    // Then check regular users
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        handleSuccessfulLogin(user, rememberMe, 'user');
        return;
    }

    const loginContainer = document.querySelector('.login-container');
    loginContainer.classList.add('shake-animation');
    setTimeout(() => {
        loginContainer.classList.remove('shake-animation');
    }, 500);

    alert('Invalid credentials. Please try again.');
}

function handleSuccessfulLogin(user, rememberMe, userType) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
    if (rememberMe) {
        localStorage.setItem('rememberAdmin', JSON.stringify({ 
            email: user.email, 
            password: user.password 
        }));
    } else {
        localStorage.removeItem('rememberAdmin');
    }

    // Show success message
    const welcomeName = user.name || user.username || 'User';
    alert(`Welcome ${welcomeName}! Redirecting to dashboard...`);

    // Redirect to appropriate dashboard based on user type
    const redirectPage = userType === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
    window.location.href = redirectPage;
}