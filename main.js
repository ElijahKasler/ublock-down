/// script.js
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes("securly.com")) {
      return { cancel: true };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
