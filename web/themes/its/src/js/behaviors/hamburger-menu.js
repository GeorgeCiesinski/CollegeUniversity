/**
 * @file
 * Toggles the mobile hamburger menu.
 */

(function ($, Drupal, once) {
  /**
   * Opens and closes the main nav via #navbar-toggle.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Toggles aria-expanded on the button and the active class on #navbar-menu.
   */
  Drupal.behaviors.hamburgerBehavior = {
    attach: function (context, settings) {
      $(once('hamburgerToggle', '#navbar-toggle', context)).each(function () {
        $(this).on('click', function () {
          var expanded = $(this).attr('aria-expanded') === 'true';
          $(this).attr('aria-expanded', expanded ? 'false' : 'true');
          var targetId = $(this).attr('aria-controls');
          if (targetId) {
            $('#' + targetId).toggleClass('active');
          }
        });
      });
    }
  };
})(jQuery, Drupal, once);
