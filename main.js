/// script.js
window.fetch = async () => {
    console.warn("Blocked: fetch request");
    return new Promise(() => {}); // Prevent execution
};

// Block XMLHttpRequest
window.XMLHttpRequest = class extends XMLHttpRequest {
    constructor() {
        super();
        console.warn("Blocked: XMLHttpRequest");
    }
    open() {}
    send() {}
};

// Block WebSockets
window.WebSocket = class {
    constructor() {
        console.warn("Blocked: WebSocket");
        throw new Error("WebSocket connections are disabled");
    }
};

// Block other methods that may be used for requests
navigator.sendBeacon = () => {
    console.warn("Blocked: sendBeacon request");
    return false;
};

document.addEventListener("submit", (event) => {
    event.preventDefault();
    console.warn("Blocked: form submission");
});
