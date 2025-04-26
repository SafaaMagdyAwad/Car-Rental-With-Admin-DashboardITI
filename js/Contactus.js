document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Add input event listeners for validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    subjectInput.addEventListener('input', validateSubject);
    messageInput.addEventListener('input', validateMessage);

    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameValid = validateName();
        const emailValid = validateEmail();
        const subjectValid = validateSubject();
        const messageValid = validateMessage();

        if (nameValid && emailValid && subjectValid && messageValid) {
            // In a real application, you would send the form data to a server here
            // For demo purposes, we'll just show a success message

            // Show success message
            successMessage.style.display = 'block';

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

            // Scroll to show the success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Show shake animation on form
            contactForm.classList.add('shake-animation');
            setTimeout(() => {
                contactForm.classList.remove('shake-animation');
            }, 500);
        }
    });

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        const isValid = name.length >= 2;

        if (!isValid && name.length > 0) {
            document.getElementById('nameError').style.display = 'block';
            return false;
        } else {
            document.getElementById('nameError').style.display = 'none';
            return name.length > 0 ? isValid : false;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
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

    function validateSubject() {
        const subject = subjectInput.value.trim();
        const isValid = subject.length >= 3;

        if (!isValid && subject.length > 0) {
            document.getElementById('subjectError').style.display = 'block';
            return false;
        } else {
            document.getElementById('subjectError').style.display = 'none';
            return subject.length > 0 ? isValid : false;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const isValid = message.length >= 10;

        if (!isValid && message.length > 0) {
            document.getElementById('messageError').style.display = 'block';
            return false;
        } else {
            document.getElementById('messageError').style.display = 'none';
            return message.length > 0 ? isValid : false;
        }
    }
});