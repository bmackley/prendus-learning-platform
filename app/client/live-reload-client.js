if (window.PRENDUS_ENV === 'development') {
    const socket = io('https://localhost:32567');

    socket.on('reload', () => {
        window.location.reload();
    });
}
