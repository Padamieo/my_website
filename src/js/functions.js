
// masonry code
$(document).ready(function() {

  $('#post-area').masonry({
    itemSelector: '.post',
    isFitWidth: true,
    animationOptions: {
      duration: 400
    }
  });

    if($('.niss-image').length){
      sizesettings();
      $( '.fancybox' ).swipebox();
    }
});


function sizesettings(){
  var count = $(".gallery").size();
	//if($(window).width() > 480){
  if(count === 1){
    $(".gallery").css({"width": "100%"});
  }else{
    if(count % 3 == 0){

			if(count > 9){
				$(".gallery").css({"width": "25%"});
			}else{
				$(".gallery").css({"width": "33.3%"});
			}

		}else if(count % 2 == 0){

			if(count < 5){
				$(".gallery").css({"width": "50%"});
			}else{
				if(count % 5 == 0){
					$(".gallery").css({"width": "25%"});
					$('#niss-image .gallery').slice(-3).css({"width": "33.3%"});
				}else{
					$(".gallery").css({"width": "25%"});
				}
			}

		}else{

      //console.log(count);
			if(count >= 10){
				$(".gallery").css({"width": "25%"});
				$('#niss-image .gallery').slice(4,-4).css({"width": "33.3%"});
			}else{
				if(count == 7){
					$(".gallery").css({"width": "25%"});
					$('#niss-image .gallery').slice(-3).css({"width": "33.3%"});
				}else{
					$(".gallery").css({"width": "33.3%"});
					$('#niss-image .gallery').slice(-2).css({"width": "50%"});
				}
			}

		}
  }

	// }else{
	// 	$(".gallery").css({"width": "100%"});
	// }
};


/*
function sizesettings(){
  var count = $(".gallery").size();
	if($(window).width() > 480){
		if(count % 3  == 0){
			if(count > 9){
				$(".gallery").css({"width": "192.5px"});
			}else{
				$(".gallery").css({"width": "256.6px"});
			}
		}else if(count % 2 == 0){
			if(count < 5){
				$(".gallery").css({"width": "384px"});
			}else{
				if(count % 5 == 0){
					$(".gallery").css({"width": "192.5px"});
					$('#niss-image .gallery').slice(-3).css({"width": "256px"});
				}else{
					$(".gallery").css({"width": "192.5px"});
				}
			}
		}else{
			if(count >= 10){
				$(".gallery").css({"width": "192.5px"});
				$('#niss-image .gallery').slice(4,-4).css({"width": "256px"});
			}else{
				if(count == 7){
					$(".gallery").css({"width": "192.5px"});
					$('#niss-image .gallery').slice(-3).css({"width": "256px"});
				}else{
					$(".gallery").css({"width": "256.6px"});
					$('#niss-image .gallery').slice(-2).css({"width": "384px"});
				}
			}
		}
	}else{
		$(".gallery").css({"width": "320px"});
	}
};
*/
