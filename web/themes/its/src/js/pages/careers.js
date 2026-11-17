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
   *   Adds a visibility icon and click/keyboard toggle. Interactive ARIA
   *   lives on the h4 so the parent ul keeps proper listitem children.
   */
  Drupal.behaviors.careerItemDropdown = {
    attach: function (context, settings) {
      $(once('careerItemDropdown', '.career-item li', context)).each(function () {
        var $item = $(this);
        var $h4 = $item.find('h4').first();
        if (!$h4.length) {
          return;
        }

        var $icon = $h4.next('.material-symbols-rounded');
        if ($icon.length === 0) {
          $h4.after('<span class="material-symbols-rounded" aria-hidden="true">visibility</span>');
          $icon = $h4.next('.material-symbols-rounded');
        }

        $h4.attr({
          role: 'button',
          tabindex: '0',
          'aria-expanded': $item.hasClass('li-active') ? 'true' : 'false',
        });

        function toggleCareer() {
          $item.toggleClass('li-active');
          var open = $item.hasClass('li-active');
          $h4.attr('aria-expanded', open ? 'true' : 'false');
          $icon = $item.find('span.material-symbols-rounded');
          $icon.text(open ? 'visibility_off' : 'visibility');
        }

        // Mouse: whole row remains clickable for UX; a11y role stays on h4.
        $item.on('click', function (e) {
          e.stopPropagation();
          toggleCareer();
        });

        $h4.on('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            toggleCareer();
          }
        });
      });
    },
  };
})(jQuery, Drupal, once);
