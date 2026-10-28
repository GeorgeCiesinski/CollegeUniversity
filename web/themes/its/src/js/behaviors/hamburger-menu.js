/**
 * @file
 * Toggles the mobile hamburger menu.
 */

(function ($, Drupal) {
  /**
   * Opens and closes the main nav via #navbar-toggle.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Toggles aria-expanded on the button and the active class on .nav-bar.
   */
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
