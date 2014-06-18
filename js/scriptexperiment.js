/*== Smooth Scrolling ==============================*/
var sectionArray = [];

$(function() {

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

    //create section object

    function section(name, offset, height) {
	this.name = name;
	this.offset = offset;
	this.height = height;
    };


    calculateSections();

    // set home to active
    setActive("a[href='#home']");


    //scroll handler
    $(document).scroll(function() {
	var pos = $(this).scrollTop(); // grabs distance from top of document

	for (i in sectionArray) { // loop through all sections

	    if ($(this).scrollTop() === 0) { // if we're already on home, ie page freshly loaded
		setActive("a[href='#home']"); // call setActive to home
	    }

	    // if the current section's offset is larger than 
	    if (sectionArray[i]["offset"] > pos && sectionArray[i]["offset"] <= pos + sectionArray[i]["height"]) {
		var currClass = '#' + sectionArray[i].name;
		currClass = "a[href='" + currClass + "']";
		console.log(sectionArray[i]);
		setActive(currClass);


	    }
	}
    })

    //window resize handler
    $(window).resize(function() {
	sectionArray = [];
	calculateSections();
    });

    //create new section object for each section, gather offset, and section height

    function calculateSections() {

	$("section").each(function() { // for each section

	    // push a new section object to array
	    sectionArray.push(new section($(this).attr("id"),
		$(this).offset().top, $(this).height()));

	});
    }

    function setActive(id) { // takes jquery selector as parameter and sets it's class
	$('a').removeClass('currSection active');
	$(id).addClass('currSection active');
    };
});