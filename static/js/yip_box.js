document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const usernameInput = document.getElementById('username-input');

    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        const username = usernameInput.value.trim();
        if (message && username) {
            const response = await fetch('/yip_box', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'username': username,
                    'message': message,
                }),
            });
            if (response.ok) {
                const li = document.createElement('li');
                li.textContent = `${username}: ${message}`;
                messages.appendChild(li);
                messageInput.value = '';
            }
        }
    });
});