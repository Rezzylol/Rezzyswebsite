document.addEventListener('DOMContentLoaded', () => {
    const yipForm = document.getElementById('yip-form');
    const yipUsername = document.getElementById('yip-username');
    const yipInput = document.getElementById('yip-input');
    const yipMessages = document.getElementById('yip-messages');
  
    const loadYips = async () => {
      const response = await fetch('/api/yips');
      const yips = await response.json();
      yipMessages.innerHTML = yips.map(yip => `<div class="yip-message"><strong>${yip.username}:</strong> ${yip.message}</div>`).join('');
    };
  
    yipForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = yipUsername.value;
      const message = yipInput.value;
      if (username.trim() && message.trim()) {
        await fetch('/api/yips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, message })
        });
        yipUsername.value = '';
        yipInput.value = '';
        loadYips();
      }
    });
  
    loadYips();
  });
  