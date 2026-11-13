/**
 * @file
 * Toggles career-item rows on /careers.
 */

(function ($, Drupal, once) {
  /**
   * Expands and collapses career list items.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Adds a visibility icon and click/keyboard toggle on `.career-item li`.
   */
  Drupal.behaviors.careerItemDropdown = {
    attach: function (context, settings) {
      $(once('careerItemDropdown', '.career-item li', context)).each(function () {
        var $item = $(this);
        var $h4 = $item.find('h4');
        var $icon = $h4.next('.material-symbols-rounded');
        if ($icon.length === 0) {
          $h4.after('<span class="material-symbols-rounded" aria-hidden="true">visibility</span>');
          $icon = $h4.next('.material-symbols-rounded');
        }

        $item.attr({
          role: 'button',
          tabindex: '0',
          'aria-expanded': $item.hasClass('li-active') ? 'true' : 'false'
        });

        function toggleCareer() {
          $item.toggleClass('li-active');
          var open = $item.hasClass('li-active');
          $item.attr('aria-expanded', open ? 'true' : 'false');
          $icon = $item.find('span.material-symbols-rounded');
          $icon.text(open ? 'visibility_off' : 'visibility');
        }

        $item.on('click', function (e) {
          e.stopPropagation();
          toggleCareer();
        });

        $item.on('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCareer();
          }
        });
      });
    }
  };
})(jQuery, Drupal, once);
