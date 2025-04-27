// Select form and inputs
const form = document.querySelector('form');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Handle form submit
form.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    const hasNumber = /\d/;

    // Validation
    if (!fullName || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (hasNumber.test(fullName)) {
        alert('Full Name must not contain numbers.');
        return;
    }

    if (hasNumber.test(subject)) {
        alert('Subject must not contain numbers.');
        return;
    }

    // Get existing contacts from localStorage or create empty array
    let contacts = JSON.parse(localStorage.getItem('contact')) || [];

    let newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;

    const newContact = {
        id: newId,
        "user-name": fullName,
        email: email,
        subject: subject,
        message: message,
        read: "false"
    };

    // Add new contact to array
    contacts.push(newContact);

    // Save updated array to localStorage
    localStorage.setItem('contact', JSON.stringify(contacts));

    // Show success message
    alert('Your message has been sent successfully!');

    // Clear form fields
    form.reset();
});
