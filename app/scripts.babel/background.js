let changed = false;

chrome.browserAction.onClicked.addListener(function(tab) {
	var message = "blackboard";
	if (changed)
	{
		message = "undo";
	}
    chrome.tabs.sendMessage(tab.id, message);
    changed = !changed;
});