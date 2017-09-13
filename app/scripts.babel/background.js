let changed = false;

chrome.browserAction.onClicked.addListener(function(tab){
	var message = "blackboard";
	if (changed)
	{
		message = "undo";
	}
	chrome.tabs.sendMessage(tab.id, message);
	changed = !changed;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	changed = request.type;
});
