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

// To redirect instead of block, use the following code
// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     if (details.url.includes("securly.com")) {
//       return { redirectUrl: "https://example.com" };
//     }
//   },
//   { urls: ["<all_urls>"] },
//   ["blocking"]
// );

