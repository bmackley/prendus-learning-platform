const socket = io('http://localhost:32567');

socket.on('reload', () => {
    window.location.reload();
});
