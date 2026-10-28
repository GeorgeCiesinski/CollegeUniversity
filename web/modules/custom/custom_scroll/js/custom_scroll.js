(function ($, Drupal, once) {
  Drupal.behaviors.customScrollBlur = {
    attach: function (context, settings) {
      // Ensure the behavior is attached once.
      $(once('customScrollBlur', window, context)).each(function () {
        console.log('Scroll event attached'); // Log to confirm event binding
        
        $(this).on('scroll', function () {
          var scrollTop = $(this).scrollTop(); // Get the current scroll position
          var maxBlur = 10; // Maximum blur value in pixels
          var viewportHeight = $(this).height(); // Height of the viewport

          console.log('Viewport Height:', viewportHeight); // Log viewport height to the console

          // Calculate the blur amount based on the scroll position relative to the viewport height.
          var blurAmount = scrollTop <= viewportHeight ? (scrollTop / viewportHeight) * maxBlur : maxBlur;

          console.log("Max blur:", blurAmount); // Log the blur amount

          // Apply the blur effect to the background-image class using jQuery's css() method.
          $('.background-image').css('filter', 'blur(' + blurAmount + 'px)');
        });
      });
    }
  };
})(jQuery, Drupal, once);