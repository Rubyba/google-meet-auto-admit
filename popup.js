const red = "#e83b35";
const green = "#3ebe3e";

const saveIntervalId = (value) => {
  chrome.storage.sync.set({ intervalId: value }, () => {});
};

const handleClick = () => {
  chrome.storage.sync.get("intervalId", ({ intervalId }) => {
    if (!intervalId) {
      intervalId = setInterval(() => {
        chrome.tabs.query({active: true}, (tabs) => {
          chrome.scripting.executeScript(
            {
              target: {tabId: tabs[0].id},
              files: ['contentScript.js'],
            }, () => {});
        });
      }, 500);
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }
    saveIntervalId(intervalId);
    updateStyles(intervalId);
  });
};

const border = document.querySelector(".bottom-border");
const btn = document.querySelector("#status-btn");

const updateStyles = (status) => {
  if (status) {
    btn.innerText = "STOP";
    btn.style.backgroundColor = red;
    border.style.background = 'linear-gradient(90deg, #ffd07b 0%, #f95b5b 100%)';
  } else {
    btn.innerText = "START";
    btn.style.backgroundColor = green;
    border.style.background = 'linear-gradient(90deg, #deff79 0%, #51d361 100%)';
  }
};

btn.addEventListener("click", handleClick);

chrome.storage.sync.get("intervalId", ({ intervalId }) => {
  updateStyles(intervalId);
});
