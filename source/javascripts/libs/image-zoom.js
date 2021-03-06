$(document).ready(function (){
	$(window).scroll(function () {
		$("img").each(function() {
			if ($("#lightbox").is(':visible')) {
				$("#lightbox").hide();
			}

			$(this).css({transform: 'translate(0px, 0px) scale(1)', 'z-index': 1000});
		});
	});

	$("img").on('click', function(e) {
		var selected_image = this;

		var padding = 50;
		var window_height = $(window).height();
		var image_height = $(this).height();
		
		var image_offset = $(this).offset();
		var window_scroll_top = $(window).scrollTop();

		
		var new_height = window_height - (padding * 2);
		var scale = new_height / image_height;
		
		var image_wrt_window_top = image_offset.top - window_scroll_top;
		var margin = (window_height - image_height) / 2;
		var new_top = margin - image_wrt_window_top;

		if ($("#lightbox").is(':visible')) {
			$("#lightbox").hide();
			$(selected_image).css({transform: 'translate(0px, 0px) scale(1)', 'z-index': 1000});

			$("img").each(function() {
				if (selected_image !== this) {
					$(this).css({transform: 'translate(0px, 0px) scale(1)', 'z-index': 998});
				}
			});
		} else {
			$("#lightbox").show();
			$(selected_image).css({transform: 'translate(0px,' + new_top + 'px) scale(' + scale + ')', 'z-index': 1000});

			$("img").each(function() {
				if (selected_image !== this) {
					$(this).css({transform: 'translate(0px, 0px) scale(1)', 'z-index': 998});
				}
			});
		}
		
		e.preventDefault();
	});
});