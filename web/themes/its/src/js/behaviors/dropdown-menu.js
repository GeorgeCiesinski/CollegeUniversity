/**
 * @file
 * Adds dropdown functionality to main menu items.
 */

(function ($, Drupal) {
  /**
   * Toggles sub-menus on desktop and mobile menu items.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Toggles dropdown-active / visible on .menu li and closes them on
   *   document click.
   */
  Drupal.behaviors.dropdownBehavior = {
    attach: function (context, settings) {
      $(once('dropdownToggle', '.menu li', context)).each(function () {
        $(this).on('click', function(e) {
          e.stopPropagation(); // Prevent click from bubbling up
          $(this).toggleClass('dropdown-active');
          $(this).find('.sub-menu').toggleClass('visible');
        });
      });

      $(document).on('click.dropdownBehavior', function() {
        // Close all open sub-menus
        $('.menu li.dropdown-active', context).removeClass('dropdown-active');
        $('.menu .sub-menu.visible', context).removeClass('visible');
      });
    }
  };
})(jQuery, Drupal);
