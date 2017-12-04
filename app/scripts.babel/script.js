import $ from 'jquery';

const GREEN = '#0A2A0A';
const WHITE = '#ffffff';
const BLACK = '#404b46';
const RED = '#f7abad'

let green = [
	'html',
	'h1',
	'h2',
	'h3',
	'h4',
	'nav',
	'body',
	'header',
	'article',
	'main',
	'section',
	'aside',
	'div',
	'blockquote',
	'samp',
	'span',
	'strong',
	'table',
	'tbody',
	'tr',
	'th',
	'td',
	'ul',
	'li',
	'ol',
	'dl',
	'dt',
	'dd',
	'p',
	'b',
	'footer'
];
let white = [
	'body',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'i',
	'div',
	'p',
	'b',
	'li',
	'span',
	'small',
	'strong',
	'figcaption',
	'blockquote',
	'th',
	'td',
	'cite',
	'code',
	'em',
	'pre',
	'big',
	'dd',
	'font'
];
let black = [
	'pre',
	'code',
	'input'
];
let red = ['a', 'sup'];
let org_green = {};
let org_black = {};
let org_white = {};
let org_red = {};

$(function(){
	var key = location.host;
	chrome.storage.local.get(key, function(value){
		if ($.isEmptyObject(value))
		{
			return;
		}
		chrome.runtime.sendMessage({type:value[key]});
		if (value[key])
		{
			change();
		}
	});
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if (request == "blackboard")
	{
		change();
	}
	else if (request == "undo")
	{
		undo();
	}
});

function undo()
{
	over_write(green, org_green);
	over_write(black, org_black);
	over_write(white, org_white);
	over_write(red, org_red);
	remove();
}

function over_write(tags, target)
{
	$.each(tags, function(){
		$(this).each(function(index, elem){
			var id = get_id(elem);
			var tag_name = $(elem).prop("tagName").toLowerCase();
			for(var i in target)
			{
				if (tag_name != i)
				{
					continue;
				}
				for(var j in target[i])
				{
					if (j != id)
					{
						continue;
					}
					$(elem).css('background','');
					$(elem).css('background-color','');
					//$(elem).removeClass('background-image');
					$(elem).css('color','');
					$(elem).css(target[i][j]);
					break;
				}
			}
		});
	});
}

function get_id(element)
{
	var id = $(element).attr('id');
	if (!id)
	{
		id = $(element).attr('class');
		if (!id)
		{
			id = 'null';
		}
	}
	return id;
}

function original(target, list, property)
{
	$.each(list, function(){
		var css = {};
		$(this).each(function(i, elem){
			var id = get_id(elem);
			css[id] = $(elem).css(property);
		});
		target[this] = css;
	});
}

function change()
{
	original(org_green, green, ['background', 'background-color']);
	original(org_black, black, ['background', 'background-color', 'color']);
	original(org_white, white, ['color']);
	original(org_red, red, ['background', 'background-color', 'color']);

	css(green, {'background':GREEN, 'background-color':GREEN});
	css(black, {'background':BLACK, 'background-color':BLACK, 'color':WHITE});
	css(white, {'color':WHITE});
	css(red, {'background':GREEN, 'background-color':GREEN, 'color':RED});

	storage();
}

function css(target, property)
{
	$.each(target, function(){
		$(this).each(function(index, element){
			$(element).css(property);
		});
	});
}

function storage()
{
	var entity = {};
	entity[location.host] = true;
	chrome.storage.local.set(entity);
}

function remove()
{
	chrome.storage.local.remove(location.host);
}
