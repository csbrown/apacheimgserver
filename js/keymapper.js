
function keyMapper(keystrokeDelay, callback) {
    const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let buffer = [];
    let lastKeyTime = Date.now();

    function send_and_clear() {
        if (Date.now() - lastKeyTime > keystrokeDelay) {
            callback(buffer.join(""));
            buffer = [];
        }
    }

    document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();

        // we are only interested in alphanumeric keys
        if (charList.indexOf(key) === -1) return;

        setTimeout(send_and_clear, keystrokeDelay);
        buffer.push(key);
        lastKeyTime = Date.now();

        console.log(buffer);
    });
}
