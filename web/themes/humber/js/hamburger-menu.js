/*
 * This script adds toggle functionality to the hamburger menu
 */

(function ($, Drupal) {
  Drupal.behaviors.hamburgerBehavior = {
    attach: function (context, settings) {
      $(once('hamburgerToggle', '#navbar-toggle', context)).each(function () {
        $(this).on('click', function() {
          // Toggles the hamburger button aria-expanded class
          $(this).attr('aria-expanded', $(this).attr('aria-expanded') === 'true' ? 'false' : 'true');
          // Toggles the nav-bar active class
          $('.nav-bar').toggleClass('active');
        });
      });
    }
  };
})(jQuery, Drupal);
