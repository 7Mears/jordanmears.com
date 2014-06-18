/*== Smooth Scrolling ==============================*/

$(function() {
    
        //set home active on load
    $("a[href='#home']").addClass("currSection active");

    $('a[href*=#]:not([href=#])').click(function() {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

	    var target = $(this.hash);
	    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	    if (target.length) {
		$('html,body').animate({
		    scrollTop: target.offset().top
		}, 1000);
		return false;
	    }
	}
    });


 
    /* Highlight active section */

    var kids = $("nav li").children(); // find nav children

    var aArray = [];

    for (var i = 0; i < kids.length; i++) {
	var child = kids[i];
	var anchorRef = $(child).attr('href');
	aArray.push(anchorRef);

    } // populate array with anchorRef values

    $(window).scroll(function() { // scroll event handler

	var winPosition = $(window).scrollTop(); // off set from top
	var winHeight = $(window).height(); // window height
	var docHeight = $(document).height();

	for (var i = 0; i < aArray.length; i++) {

	    var identifier = aArray[i];
	    var divPos = $(identifier).offset().top;
	    var divHeight = $(identifier).height();

	    if (winPosition >= divPos && winPosition < (divPos + divHeight)) {

		$("a[href='" + identifier + "']").addClass("currSection active");

	    } else {

		$("a[href='" + identifier + "']").removeClass("currSection active");
	    }
	}

	if (winPosition + winHeight == docHeight) {

	    if (!$("nav li:last-child a").hasClass("currSection active")) {

		var navActiveCurrent = $(".currSection active").attr("href");

		$("a[href='" + navActiveCurrent + "']").removeClass("currSection active");
		$("nav li:last-child a").addClass("currSection active");
	    }
	}
    });
});