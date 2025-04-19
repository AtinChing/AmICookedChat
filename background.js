async function sendToBackend(tab) {
    // data format
    const data = {
      timestamp: new Date().toISOString(),
      tab_title: tab.title,
      tab_url: tab.url,
      event_type: "tab_switch"
    };
    
    console.log("Sending:", data);
  // send data to python script running on the machine
    fetch("http://localhost:5000/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
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
  