// Initialize admin data in localStorage if not exists
document.addEventListener('DOMContentLoaded', function () {


    // Check if remember me was checked
    const rememberMe = localStorage.getItem('rememberAdmin');
    if (rememberMe) {
        const adminData = JSON.parse(rememberMe);
        document.getElementById('email').value = adminData.email;
        document.getElementById('password').value = adminData.password;
        document.getElementById('rememberMe').checked = true;
    }

    // Form validation
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
            // Show shake animation on form
            const loginContainer = document.querySelector('.login-container');
            loginContainer.classList.add('shake-animation');
            setTimeout(() => {
                loginContainer.classList.remove('shake-animation');
            }, 500);
        }
    });
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
    const admins = JSON.parse(localStorage.getItem('admins'));
    const admin = admins.find(admin => admin.email === email && admin.password === password);

    if (admin) {
        // Store current session
        sessionStorage.setItem('currentAdmin', JSON.stringify(admin));

        // Store in localStorage if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberAdmin', JSON.stringify({ email, password }));
        } else {
            localStorage.removeItem('rememberAdmin');
        }

        // Show success message
        alert(`Welcome ${admin.name}! Redirecting to dashboard...`);

        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        // Show error message with animation
        const loginContainer = document.querySelector('.login-container');
        loginContainer.classList.add('shake-animation');
        setTimeout(() => {
            loginContainer.classList.remove('shake-animation');
        }, 500);

        alert('Invalid credentials. Please try again.');
    }
}