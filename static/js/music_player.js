document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('{{ url_for("static", filename="music/bn2meloop.mp3") }}');
    audio.loop = true;
    audio.play();
});