var startAnimation = function(delayScaleM = 0.0) {
	const delayScale = delayScaleM;
	var isPanelOut = false;
	$("img.logo").delay(0*delayScale).animate({height: "5rem", width: "5rem" ,"margin-left": "0%", "opacity": 1}, 2000*delayScale);
	$("#scmun").delay(800*delayScale).animate({"font-size": "2.9rem", "margin-left": "5.0%", "opacity": 1}, 1200*delayScale);
	$("#hostedby").delay(1400*delayScale).animate({"opacity": "1", "font-size": "0.9rem", "margin-left": "1.2%"}, 1500*delayScale);
	$("#backOfTopBar").delay(2500*delayScale).animate({"opacity": 1}, 400*delayScale);
	$(".restOfThePage").delay(2700*delayScale+300).animate({"opacity": 1}, 800);
	$(".burgerBars").click(function() {
		this.classList.toggle("burgerChanged");
		if (isPanelOut == false) {
			$(".burgerSlideoutPanel").animate({"width": "38%", "opacity": 1}, 400);
			$(".burgerBar2").animate({"opacity": 0}, 200);
			$(".burgerItems").show(400)
			$(".burgerSubItems").show(400)
			isPanelOut = true
		} else {
			$(".burgerItems").hide(400)
			$(".burgerSubItems").hide(400)
			$(".burgerSlideoutPanel").animate({"width": "0%", "opacity": 0}, 400)
			$(".burgerBar2").animate({"opacity": 1}, 200)
			isPanelOut = false
		}
	})
	$(".burgerBar1").delay(1900*delayScale).animate({"opacity": 1}, 400*delayScale)
	$(".burgerBar2").delay(2100*delayScale).animate({"opacity": 1}, 400*delayScale)
	$(".burgerBar3").delay(2300*delayScale).animate({"opacity": 1}, 400*delayScale)
	$(".burgerSubItems").hover(function() {
		$(this).children("span.burgerSubItemArrow").animate({"opacity": 1, "margin-left": "2%"}, 150)
		// $(this).children("span.burgerSubItemArrow").animate({"opacity": 1, "margin-left": "1.5%"}, 175)
	}, function() {
		$(this).children("span.burgerSubItemArrow").animate({"opacity": 0, "margin-left": "0%"}, 150)
	})
}

var topBarStays = function() {
	var name = ".topBar";
	var menuYloc = null;
	$(document).ready(function(){
		menuYloc = parseInt($(name).css("top").substring(0,$(name).css("top").indexOf("px")))
		$(window).scroll(function () {
			var offset = menuYloc+$(document).scrollTop()+"px";
			$(name).animate({top: offset}, {duration: 0, queue: false});
		});
	});
}

var panelStays = function() {
	var name = ".burgerSlideoutPanel";
	var menuYloc = null;
	$(document).ready(function(){
		menuYloc = parseInt($(name).css("top").substring(0,$(name).css("top").indexOf("px")))
		$(window).scroll(function () {
			var offset = menuYloc+$(document).scrollTop()+"px";
			$(name).animate({top: offset}, {duration: 0, queue: false});
		});
	});
}

var burgerToggle = function(x) {
	x.classList.toggle("burgerChanged");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var backgroundSwitch = function(min, max) {
	var randNum = getRandomInt(min, max)
	console.log('Background No.' + randNum + '/' + max + ' selected.')
	$('html').css({"background": "url('backgroundised/img" + randNum + ".jpg')"})
}

function copy2Clipboard(str) {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};

$(document).ready(function() {
	topBarStays()
	panelStays()
	backgroundSwitch(1, 12)
	console.log('All functions OK.')
})