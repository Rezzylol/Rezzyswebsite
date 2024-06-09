document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('[data-collapse-toggle="mobile-menu"]');
    const menu = document.querySelector('#mobile-menu');
    toggleButton.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });
});

// Check if the user is on mobile

if (/Mobi|Android/i.test(navigator.userAgent)) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        overlay.style.color = 'pink';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        overlay.innerHTML = `
            <p>back in my day we didnt have phones! this website is best experienced in 4k widescreen with a a little bit of bladee playing</p>
            <button id="continue-button" style="margin-top: 20px; padding: 10px 20px; background-color: #6b46c1; color: white; border: none; border-radius: 5px;">Continue Anyway?</button>
        `;
        document.body.appendChild(overlay);
        document.getElementById('continue-button').addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }