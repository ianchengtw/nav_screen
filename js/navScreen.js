var Stage = function(container_name){

	var self = this;
	this.container;
	this.posX = 0;
	this.posY = 0;
	this.pagePool = [];

	var init = function(){

		var pos = 0;
		self.container = $(container_name);

		$(self.container).find("[class^='page-']").each(function(){
			
			var parentPage = $(this);

			var p = new Opage(	this,
								pos,
								pos==0 ? 
									this.offsetWidth-getScrollbarWidth() :
									this.offsetWidth,
								this.offsetHeight,
								this.offsetTop,
								this.offsetLeft);
			self.addPage(p);
			
			pos++;
		});

		self.setArrow();

	};
	
	this.addPage = function(page){
		self.pagePool.push(page);
	};

	this.width = function(){
		return 	window.innerWidth || 
				document.documentElement.clientWidth || 
				document.body.clientWidth;
	};
	this.height = function(){
		return 	window.innerHeight || 
				document.documentElement.clientHeight || 
				document.body.clientHeight;
	};
	this.totalHeight = function(){
		return self.height() * self.pagePool.length;
	};

	this.top = function(){
		var doc = document.documentElement;
		return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	};
	this.left = function(){
		var doc = document.documentElement;
		return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	};

	this.moveUp = function(){
		$('html,body').animate({
			scrollTop: self.top() - self.height() + getScrollbarWidth()
		}, 500);
	};

	this.moveDown = function(){
		$('html,body').animate({
			scrollTop: self.top() + self.height() - getScrollbarWidth()
		}, 500);
	};

	this.moveLeft = function(){
		$('html,body').animate({
			scrollLeft: self.left() - self.width() + getScrollbarWidth()
		}, 500);
	};

	this.moveRight = function(){
		$('html,body').animate({
			scrollLeft: self.left() + self.width() - getScrollbarWidth()
		}, 500);
	};

	this.setArrow = function(){
		var arrows = '<svg version="1.1" id="btnUp" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\
			<path d="M98.488,65.616L51.416,18.543c-0.75-0.75-2.078-0.75-2.828,0L1.513,65.618c-0.375,0.375-0.587,0.884-0.587,1.414s0.212,1.039,0.587,1.414l12.986,12.987c0.392,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586l32.674-32.675l32.675,32.674c0.75,0.751,2.078,0.75,2.828,0l12.984-12.987C99.27,67.663,99.27,66.397,98.488,65.616z"/>\
		</svg>';
		arrows += '<svg version="1.1" id="btnDown" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\
			<path d="M1.512,34.384l47.072,47.073c0.75,0.75,2.078,0.75,2.828,0l47.076-47.075c0.375-0.375,0.586-0.884,0.586-1.414s-0.211-1.039-0.586-1.414L85.501,18.566c-0.391-0.391-0.901-0.586-1.414-0.586c-0.512,0-1.022,0.195-1.414,0.586L49.999,51.241L17.324,18.567c-0.75-0.751-2.078-0.75-2.828,0L1.512,31.555C0.73,32.337,0.73,33.603,1.512,34.384z"/>\
		</svg>';
		arrows += '<svg version="1.1" id="btnLeft" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\
			<path d="M65.617,1.512L18.543,48.584c-0.75,0.75-0.75,2.078,0,2.828l47.076,47.075c0.375,0.375,0.883,0.587,1.414,0.587c0.529,0,1.038-0.212,1.413-0.587l12.987-12.986c0.391-0.392,0.586-0.902,0.586-1.414s-0.195-1.023-0.586-1.414L48.759,49.999l32.673-32.675c0.751-0.75,0.75-2.078,0-2.828L68.445,1.512C67.664,0.73,66.397,0.73,65.617,1.512z"/>\
		</svg>';
		arrows += '<svg version="1.1" id="btnRight" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\
			<path d="M34.384,98.488l47.073-47.072c0.75-0.75,0.75-2.078,0-2.828L34.382,1.512c-0.375-0.375-0.884-0.586-1.414-0.586c-0.53,0-1.039,0.211-1.414,0.586L18.567,14.499c-0.391,0.391-0.586,0.902-0.586,1.414c0,0.512,0.195,1.023,0.586,1.414l32.674,32.674L18.568,82.676c-0.751,0.75-0.75,2.078,0,2.828l12.987,12.984C32.337,99.27,33.603,99.27,34.384,98.488z"/>\
		</svg>';

		$('body').append(arrows);

		$('#btnUp').on('click', function(){
			self.moveUp();
		});
		$('#btnDown').on('click', function(){
			self.moveDown();
		});
		$('#btnLeft').on('click', function(){
			self.moveLeft();
		});
		$('#btnRight').on('click', function(){
			self.moveRight();
		});
	}

	init();

	return {
		width: this.width,
		height: this.height,
		addPage: this.addPage,
		moveUp: this.moveUp,
		moveDown: this.moveDown,
		moveLeft: this.moveLeft,
		moveRight: this.moveRight,
		setArrow: this.setArrow
	};
};

var Opage = function(elem, position, offsetWidth, offsetHeight, offsetTop, offsetLeft){

	var self = this;

	this.elem = elem;
	this.position = position;
	this.offsetWidth = offsetWidth;
	this.offsetHeight = offsetHeight;
	this.offsetTop = offsetTop;
	this.offsetLeft = offsetLeft;
	this.subPagePool = [];

	var init = function(){

		var e = $(self.elem);
		e.addClass('full-screen');

		var pos = 0;

		e.find("[class^='sub-page-']").each(function(){

			var subPage = $(this);

			subPage.addClass('full-screen');
			subPage.addClass('sub-screen');
			subPage.css('top', self.offsetTop);
			subPage.css('left', self.offsetLeft + (pos * self.offsetWidth));

			self.addSubPage(subPage);
			pos++;
		});

	};

	this.addSubPage = function(page){
		self.subPagePool.push(page);
	};

	init();

	return {
		elem: this.elem,
		position: this.position,
		offsetTop: this.offsetTop,
		offsetLeft: this.offsetLeft
	};
};

function getScrollbarWidth() {
	var outer = document.createElement("div");
	outer.style.visibility = "hidden";
	outer.style.width = "100px";
	outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

	document.body.appendChild(outer);

	var widthNoScroll = outer.offsetWidth;
	// force scrollbars
	outer.style.overflow = "scroll";

	// add innerdiv
	var inner = document.createElement("div");
	inner.style.width = "100%";
	outer.appendChild(inner);        

	var widthWithScroll = inner.offsetWidth;

	// remove divs
	outer.parentNode.removeChild(outer);

	return widthNoScroll - widthWithScroll;
}

