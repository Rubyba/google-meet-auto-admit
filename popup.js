
const saveStatus = (value) => {
  
  const query = { active: true, currentWindow: true };
  chrome.tabs.query(query, (tabs) => {
    var currentTab = tabs[0]; 
    chrome.storage.sync.set({ status: value, tabId: currentTab.id }, () => {});
  });
};

const border = document.querySelector(".bottom-border");
const toggle = document.querySelector("#toggle");

const updateStyles = (status) => {
  if (status) {
    border.style.background = 'linear-gradient(90deg, rgb(49 136 255) 0%, rgb(103 143 255) 39%, rgb(255 153 199) 70%, rgb(255 134 134) 100%)';
    border.style.boxShadow = 'rgb(255 255 255) 0px 0px 10px';
  } else {
    border.style.background = 'linear-gradient(90deg, rgb(92 92 92) 0%, rgb(100 100 100) 100%)';
    border.style.boxShadow = 'none';
  }
};

toggle.addEventListener("click", (event) => {
  updateStyles(toggle.checked);
  saveStatus(toggle.checked);
});

chrome.storage.sync.get("intervalId", ({ intervalId }) => {
  if(intervalId) {
    toggle.checked = true;
    updateStyles(true);
  } else {
    toggle.checked = false;
    updateStyles(false);
  }
});

