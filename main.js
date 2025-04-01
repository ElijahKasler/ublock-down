/// script.js
alert("test")
(function() {
    "use strict";

    // Prevent redirection methods
    const blockRedirection = () => {
        for (const prop of ["replace", "assign", "reload"]) {
            Object.defineProperty(window.location, prop, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: () => console.warn("Redirection blocked!")
            });
        }
        window.onbeforeunload = () => ""; // Prevent unload events
        window.onunload = () => ""; // Prevent navigation attempts
    };

    // Block access if not coming from the same site
    const enforceSameOrigin = () => {
        const allowedOrigin = window.location.origin;
        if (document.referrer && !document.referrer.startsWith(allowedOrigin)) {
            document.body.innerHTML = ""; // Wipe the page
            document.write("Access Denied.");
            throw new Error("Unauthorized Access");
        }
    };

    // Run immediately
    enforceSameOrigin();
    blockRedirection();
})();

