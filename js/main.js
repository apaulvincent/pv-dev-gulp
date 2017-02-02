
(function($) {

	var o, Site = {

		settings: {
			win: 	$(window),
			doc: 	$(document),
			floatingMenu: $('header.header'),
		},

		construct: function  () {

		},

		bindUI: function() {

			o.win.on('scroll', function() {

				o.st = $(this).scrollTop();
				o.fm = o.floatingMenu.outerHeight(); 
				o.fmx = (o.fm * 3);

				if(o.fm != null){

		 			o.floatingMenu.removeClass('active');
		 			

		 			if (o.st > o.fmx ){
		 				o.floatingMenu.addClass('bw');
					} else {
		 				o.floatingMenu.removeClass('bw');
					}


		 			if (o.st > o.fm ){

					   if (o.st > o.lst && o.st > o.fm){
					       o.floatingMenu.removeClass('active');
					   } else {
					      o.floatingMenu.addClass('active');
					   }

					} else {
						o.floatingMenu.addClass('active');
					}

				}


				o.lst = o.st;

			});


		},

		init: function() {
			o = this.settings;
			this.construct();
			this.bindUI();
		}
	};

	$(function(){

		Site.init();


	    var wowJs = new WOW({
	    	boxClass: 'movit',
	        animateClass: 'animated',
	        offset: 100,
	        callback: function(box) {
	        }
	      }
	    );

	    wowJs.init();

	});

}(jQuery));


// $(window).on('load', function(){

// });


// $(document).ready(function() {

// });
