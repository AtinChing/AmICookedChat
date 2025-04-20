async function sendToBackend(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  }, () => {
    chrome.tabs.sendMessage(tab.id, { command: "getHTML" }, async (response) => {
      const data = {
        timestamp: new Date().toISOString(),
        tab_title: tab.title,
        tab_url: tab.url,
        html_content: response?.html || "",
        event_type: "tab_switch"
      };

      console.log("Sending to backend:", data);

      fetch("http://127.0.0.1:5001/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    });
  });
}

  
  // tab switch event
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    sendToBackend(tab);
  });
  
  // chrome window just got changed to
  // might switch this out if we implement a method to constantly detect the app being used on the system/machine in real-time
  chrome.windows.onFocusChanged.addListener(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) sendToBackend(tab);
  });
  