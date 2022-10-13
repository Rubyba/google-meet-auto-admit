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
