function toggleResetPswd(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(()=>{
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
})


var width = $('.g-recaptcha').parent().width();
if (width < 500) {
	var scale = 1.25;
	$('.g-recaptcha').css('transform', 'scaleX(' + scale + ')');
	// $('.g-recaptcha').css('-webkit-transform', 'scale(' + scale + ')');
	// $('.g-recaptcha').css('transform-origin', '0 0');
	// $('.g-recaptcha').css('-webkit-transform-origin', '0 0');
}


// Resize reCAPTCHA to fit a specific size. We're scaling using CSS3 transforms ||| captchaScale = containerWidth / elementWidth

// function scaleCaptcha(elementWidth) {
//     // Width of the reCAPTCHA element | 640 
//     var reCaptchaWidth = 10;
//     // Get the containing element's width
//       var containerWidth = $('#logreg-forms').width();
    
//     // Only scale the reCAPTCHA if it won't fit inside the container
//     if(reCaptchaWidth > containerWidth) {
//       // Calculate the scale
//       var captchaScale = containerWidth / reCaptchaWidth;
//       // Apply the transformation
//       $('.g-recaptcha').css({
//         'transform':'scale('+captchaScale+')'
//       });
//     }
//   }
  
//   $(function() { 
   
//     // Initialize scaling
//     scaleCaptcha();
    
//     // Update scaling on window resize
//     // Uses jQuery throttle plugin to limit strain on the browser
//     $(window).resize( $.throttle( 10, scaleCaptcha ) );  
//   });