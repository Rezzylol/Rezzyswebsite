function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function hideMessage() {
    document.getElementById('mobileMessage').style.display = 'none';
}

window.onload = function() {
    if (isMobile()) {
        document.getElementById('mobileMessage').style.display = 'block';
    }
}
