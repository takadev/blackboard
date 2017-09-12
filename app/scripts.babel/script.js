import $ from 'jquery';

let green = [
	'h1',
	'h2',
	'h3',
	'h4',
	'body',
	'header',
	'article',
	'div',
	'blockquote',
	'table',
	'tbody',
	'tr',
	'td',
	'ul',
	'li',
	'a'
];
let black = [
	'pre',
	'code'
];
let white = [
	'h1',
	'h2',
	'h3',
	'h4',
	'i',
	'div',
	'p',
	'span',
	'strong',
	'td',
	'cite',
	'em',
	'input'
];
let red = ['a'];

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "blackboard") {
        change();
    }
});

function change() {
    $.each(green, function(){
		$(this).css({
			'background-color':'#124829'
		});
	});
	$.each(black, function(){
		$(this).css({
			'background-color':'#404B46'
		});
	});
	$.each(white, function(){
		$(this).css({
			'color':'#ffffff'
		});
	});
	$.each(red, function(){
		$(this).css({
			'color':'#f7abad'
		});
	});
}