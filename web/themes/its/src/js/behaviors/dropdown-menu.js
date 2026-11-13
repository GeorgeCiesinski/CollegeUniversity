/**
 * @file
 * Adds dropdown functionality to main menu items.
 */

(function ($, Drupal, once) {
  /**
   * Toggles sub-menus on desktop and mobile menu items.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Toggles dropdown-active / visible on .menu li and closes them on
   *   document click.
   * @prop {Drupal~behaviorDetach} detach
   *   Removes the document click handler when the context is unloaded.
   */
  Drupal.behaviors.dropdownBehavior = {
    attach: function (context, settings) {
      $(once('dropdownToggle', '.menu li', context)).each(function () {
        $(this).on('click', function (e) {
          e.stopPropagation();
          $(this).toggleClass('dropdown-active');
          $(this).find('.sub-menu').toggleClass('visible');
        });
      });

      // Document close handler once per page (not per Ajax attach).
      if (once('dropdownDocumentClose', 'html', context).length) {
        $(document).on('click.dropdownBehavior', function () {
          $('.menu li.dropdown-active').removeClass('dropdown-active');
          $('.menu .sub-menu.visible').removeClass('visible');
        });
      }
    },
    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        $(document).off('click.dropdownBehavior');
        once.remove('dropdownDocumentClose', 'html');
      }
    }
  };
})(jQuery, Drupal, once);
