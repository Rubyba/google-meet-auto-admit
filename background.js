const urlPattern = 'meet.google.com';

// disable all
chrome.action.disable();

// if match url ShowAction()
chrome.declarativeContent.onPageChanged.removeRules(async () => {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlContains: urlPattern },
      }),
    ],
    actions: [
      new chrome.declarativeContent.ShowAction()
    ],
  }]);
});

const saveIntervalId = (value) => {
  chrome.storage.sync.set({ intervalId: value }, () => {});
};


const setExecuteInterval = () => {
  chrome.storage.sync.get("tabId", ({ tabId }) => {
    intervalId = setInterval(() => {
      console.log(tabId);
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ['contentScript.js'],
        }, () => { });
    }, 800);
    saveIntervalId(intervalId);
  });
}

// 當status更新, 依開啟關閉狀態setInterval/clearInterval
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.status) {
    if (changes.status.newValue) {
      setExecuteInterval();
    } else {
      chrome.storage.sync.get("intervalId", ({ intervalId }) => {
        clearInterval(intervalId);
      });
      intervalId = null;
      chrome.alarms.clearAll();
      saveIntervalId(intervalId);
    }
  }
});

// AlarmAPI (setInterval有時候會被吃掉，用alarmApi定時檢查並重啟)
var alarmInfo = {
  delayInMinutes: 0.5, // x分鐘後開始 (值須大於1) 
  periodInMinutes : 0.5 // 開始後每x分鐘執行一次(值須大於1) 
};


chrome.alarms.clearAll();

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.sync.get("status", ({ status }) => {
    chrome.storage.sync.get("intervalId", ({ intervalId }) => {
      if (status) {
        clearInterval(intervalId);
        setExecuteInterval();
      }
    });
  });
});

chrome.alarms.create('checkExecute', alarmInfo);
