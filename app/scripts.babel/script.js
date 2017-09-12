import $ from 'jquery';

const GREEN = '#0F4128';
const WHITE = '#ffffff';
const BLACK = '#404B46';
const RED = '#f7abad'

let green = [
	'h1',
	'h2',
	'h3',
	'h4',
	'body',
	'header',
	'article',
	'section',
	'div',
	'blockquote',
	'table',
	'tbody',
	'tr',
	'td',
	'ul',
	'li',
	'dl',
	'dt',
	'dd',
	'span',
	'a',
	'footer'
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
	'code',
	'em',
	'pre',
	'input'
];
let black = [
	'pre',
	'code'
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
			'background':GREEN,
			'background-color':GREEN
		});
	});
	$.each(black, function(){
		$(this).css({
			'background':BLACK,
			'background-color':BLACK,
			'color':WHITE
		});
	});
	$.each(white, function(){
		$(this).css({
			'color':WHITE
		});
	});
	$.each(red, function(){
		$(this).css({
			'background':GREEN,
			'background-color':GREEN,
			'color':RED
		});
	});
}