const form = document.querySelector('form');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

form.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    const hasNumber = /\d/;

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

    contacts.push(newContact);

    localStorage.setItem('contact', JSON.stringify(contacts));

    alert('Your message has been sent successfully!');

    form.reset();
});
