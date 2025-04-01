/// execute_script.js
(function() {
    const blockList = [
        "*://*.securly.com/*",
        "*://securly.com/*"
    ];

    // Block network requests
    window.XMLHttpRequest.prototype.open = function() {
        if (blockList.some(url => arguments[1].includes(url))) {
            console.log("Blocked Securly: " + arguments[1]);
            return;
        }
        return XMLHttpRequest.prototype.open.apply(this, arguments);
    };

    // Block scripts dynamically
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === "SCRIPT" && node.src.includes("securly.com")) {
                    console.log("Blocked Securly script: " + node.src);
                    node.remove();
                }
            });
        });
    });
    
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Block iframes
    document.querySelectorAll("iframe").forEach(iframe => {
        if (iframe.src.includes("securly.com")) {
            console.log("Blocked Securly iframe: " + iframe.src);
            iframe.remove();
        }
    });

    console.log("✅ Securly blocking script is active.");
})();
