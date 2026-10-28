/*
 * This script adds dropdown functionality to menu items
 */

(function ($, Drupal) {
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
