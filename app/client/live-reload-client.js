if (window.PRENDUS_ENV === 'development') {
    const socket = io('https://localhost:32567'); //This port must match the port of the live reload server running on the development machine

    //when we receive a reload event, reload the page
    socket.on('reload', () => {
        window.location.reload();
    });
}
