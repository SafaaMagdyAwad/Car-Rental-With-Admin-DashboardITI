let messages = [];

document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
    updateTables();
});

function loadMessages() {
    const storedMessages = localStorage.getItem('contact');
    if (storedMessages) {
        messages = JSON.parse(storedMessages);

        messages = messages.map((msg, index) => {
            return {
                ...msg,
                id: msg.id || index + 1,
                read: false,
                name: msg['user-name'] || "Unknown", 
            };
        });

        saveMessages();
    }
}

function saveMessages() {
    localStorage.setItem('contact', JSON.stringify(messages));
}

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
}

function markAsRead(id) {
    const message = messages.find(msg => msg.id === id);
    if (message && !message.read) {
        message.read = true;
        saveMessages();
        updateTables();
    }
}

function updateTables() {
    const unreadMessages = messages.filter(msg => !msg.read);
    const readMessages = messages.filter(msg => msg.read);

    updateTable('unread', unreadMessages);
    updateTable('read', readMessages);

    document.getElementById('no-unread').style.display = unreadMessages.length ? 'none' : 'block';
    document.getElementById('no-read').style.display = readMessages.length ? 'none' : 'block';
}

function updateTable(type, messages) {
    const tableBody = document.getElementById(`${type}-table`).querySelector('tbody');
    tableBody.innerHTML = '';

    messages.forEach(msg => {
        const row = document.createElement('tr');

        if (type === 'unread') {
            row.innerHTML = `
                <td>${msg.id}</td>
                <td>${msg.name || "Unknown"}</td>
                <td>${msg.email || "No email"}</td>
                <td>${msg.subject || "No subject"}</td>
                <td class="message-content">${msg.message || "No message"}</td>
                <td><button class="btn mark-read" onclick="markAsRead(${msg.id})">Mark as Read</button></td>
            `;
        } else {
            row.innerHTML = `
                <td>${msg.id}</td>
                <td>${msg.name || "Unknown"}</td>
                <td>${msg.email || "No email"}</td>
                <td>${msg.subject || "No subject"}</td>
                <td class="message-content">${msg.message || "No message"}</td>
                <td>Read</td>
            `;
        }

        tableBody.appendChild(row);
    });
}