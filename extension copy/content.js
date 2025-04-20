chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "getHTML") {
      const html = document.documentElement.innerHTML;
      sendResponse({ html });
    }
  });