/// script.js
alert("test")
language="JavaScript" type="text/javascript">
    //<![CDATA[
        window.onbeforeunload = function(){
            return 'Are you sure you want to leave?';
        };
    //]]>
(function() {
    "use strict";

    // Prevent redirection by overriding navigation functions
    const blockRedirection = () => {
        const noop = () => console.warn("Redirection blocked!");

        // Override history navigation methods
        history.pushState = noop;
        history.replaceState = noop;

        // Block new tab/window opening
        window.open = noop;

        // Prevent redirects using setTimeout or setInterval
        const originalSetTimeout = window.setTimeout;
        const originalSetInterval = window.setInterval;
        
        window.setTimeout = (fn, delay) => {
            if (typeof fn === "function" && fn.toString().includes("location")) {
                console.warn("Redirection attempt blocked in setTimeout!");
                return;
            }
            return originalSetTimeout(fn, delay);
        };
        
        window.setInterval = (fn, delay) => {
            if (typeof fn === "function" && fn.toString().includes("location")) {
                console.warn("Redirection attempt blocked in setInterval!");
                return;
            }
            return originalSetInterval(fn, delay);
        };

        // Prevent unload events (back button, page close, etc.)
        window.onbeforeunload = () => "";
        window.onunload = () => "";
    };

    // Block access unless the user came from the same site
    const enforceSameOrigin = () => {
        const allowedOrigin = window.location.origin;
        if (document.referrer && !document.referrer.startsWith(allowedOrigin)) {
            document.body.innerHTML = ""; // Wipe the page
            document.write("Access Denied.");
            throw new Error("Unauthorized Access");
        }
    };

    // Run immediately before page load
    enforceSameOrigin();
    blockRedirection();
})();
