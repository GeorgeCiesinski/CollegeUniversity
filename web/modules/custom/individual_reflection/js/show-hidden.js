/**
 * @file
 * This JavaScript file contains the logic for showing or hiding the proficiency level options 
 * based on the user's selected answer for each question in the digital fluency questionnaire. 
 * If the user selects a negative response (e.g., "no", "very confident", "never"), the 
 * proficiency level options will remain hidden. For any other response, the proficiency level 
 * options will be shown.
 */
(function (Drupal, once) {

  // Shows or hides the proficiency div based on the selected radio button value
  function showHide() {
    // Negative values that should hide the proficiency div
    const negativeValues = new Set(['no', 'very confident', 'very familiar', 'never']);

    // Find the closest parent element with the class 'indicator-section'
    const indicatorSection = this.closest('.indicator-section');
    if (!indicatorSection) return;

    // Find the proficiency div within the indicator section
    const proficiencyFieldset = indicatorSection.querySelector('.proficiency-fieldset');
    if (!proficiencyFieldset) return;

    const shouldShow = !negativeValues.has(this.value);

    // Show the proficiency div if the selected value is not in the negative values set, otherwise hide it
    if (shouldShow) {
      proficiencyFieldset.hidden = false;
      proficiencyFieldset.offsetHeight; // Force reflow to ensure the transition works
      proficiencyFieldset.classList.add('is-visible');
    }
    else {
      proficiencyFieldset.classList.remove('is-visible');

      window.setTimeout(() => {
        proficiencyFieldset.hidden = true;

        // clear any selected proficiency radios so stale values are not submitted
        proficiencyFieldset
          .querySelectorAll('input[type="radio"]')
          .forEach((radio) => {
            radio.checked = false;
          });

      }, 500); // ⬅ must match your CSS transition duration
      
    }
  }

  Drupal.behaviors.showHiddenProficiency = {
    attach: function (context) {

      // Select all radio buttons within the context that are part of the question-fieldset class
      const radios = once(
        'radio-buttons-once',
        context.querySelectorAll('.question-fieldset input[type="radio"]')
      );

      // If no radio buttons are found, exit the function
      if (!radios.length) {
        return;
      }

      // Add a change event listener to each radio button which calls showHide when the value changes
      radios.forEach((radio) => {
        radio.addEventListener('change', showHide);
      });
    }
  };
})(Drupal, once);
