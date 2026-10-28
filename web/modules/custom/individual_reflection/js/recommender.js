
/**
 * @file
 * This JavaScript file contains the logic for analyzing the user's responses to the digital fluency questionnaire
 * and generating personalized training course recommendations based on their answers. It also includes functionality
 * to download the recommendations as a PDF using the html2pdf library.
 */
(function (Drupal, once) {

  Drupal.behaviors.analyzeResponses = {
    attach: function (context) {

      // PDF settings
      const opt = {
        margin:       1,
        filename:     'my_training_recommendations.pdf',  // Document title
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: ['.page-break-before']
        },  // Avoid splitting elements across pages
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCors: true, letterRendering: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Select resultsSection if exists, otherwise return early to prevent errors
      const resultsSection = context.querySelector('#results-section');
      if (!resultsSection) return;

      /**
       * Populates the results section with recommended courses based on user responses.
       *
       * @param {Object} recommendations
       *   Object keyed by indicator index, containing arrays of courses
       *   grouped by competency level (competent, proficient, leader).
       */
      function populateResults(recommendations) {
        // Loop through each indicator key in recommendations
        Object.keys(recommendations).forEach(indicatorIndex => {
          // Select the corresponding indicator div using the indicator index
          const indicatorDiv = document.querySelector(`.indicator-${indicatorIndex}-div`);
          // Tracks if indicator has at least one course recommendation across all proficiency levels
          let hasCourses = false;
          // Iterate over each competency level and populate the course list for that level
          ["competent", "proficient", "leader"].forEach(level => {
            // Select the competency div and course list for the current level
            const competencyDiv = indicatorDiv.querySelector(`.${level}`);
            const list = indicatorDiv.querySelector(`.${level} .course-sections`);
            // Clear any existing courses from the list in case of multiple submissions
            list.innerHTML = "";
            // Get unique courses for the current indicator and level
            const courses = recommendations[indicatorIndex][level];
            const uniqueCourses = [...new Set(courses)];
            // Loop through each unique course and add it to the list
            uniqueCourses.forEach(course => {
              const li = document.createElement("li");
              li.textContent = course;
              list.appendChild(li);
            });
            // Turn competencyDiv visible if at least one course was added
            if (uniqueCourses.length > 0) {
              hasCourses = true;
              competencyDiv.classList.add("is-visible");
            } else {
              competencyDiv.classList.remove("is-visible"); // optional reset safety
            }
          });
          // Select empty message element
          const emptyMessage = indicatorDiv.querySelector('.indicator-empty');
          // Toggle visibility based on whether any courses were recommended for the indicator
          if (hasCourses) {
            emptyMessage.classList.remove("is-visible");
          } else {
            emptyMessage.classList.add("is-visible");
          }
        });
      }

      /*
       * Suggests training courses based on the user's answers to the questionnaire.
       * It accesses the indicators data from a global variable set in the questionnaire-form Twig template,
       * filters out negative answers, and sends a list of recommendation results to populateResults.
       */
      function suggestTraining() {
        // Access the indicators data from the global variable set in the Twig template
        const indicators = window.indicatorsData;
        // Define negative answers to filter out - selecting these options does not show the hidden proficiency level questions
        const negativeAnswers = ["no", "very confident", "very familiar","never"];
        // Initialize an object to hold the recommendations for each indicator and proficiency level
        const recommendations = {};
        // Loop through each indicator in the dataset
        indicators.forEach((indicator, indicatorIndex) => {
          const indicatorKey = indicatorIndex + 1;
          // If indicatorKey doesn't exist in recommendations, initialize it with empty arrays for each proficiency level
          if (!recommendations[indicatorKey]) {
            recommendations[indicatorKey] = {
              competent: [],
              proficient: [],
              leader: []
            };
          }
          // Loop through each question section within the indicator
          indicator.sections.forEach(section => {
            // Determine the selected answer for the current question
            const answer = document.querySelector(`input[name="${section.id}"]:checked`);
            // Exit loop if no answer selected, or negative answer selected
            if (!answer) return;
            const value = answer.value.toLowerCase();
            if (negativeAnswers.includes(value)) return;
            // Determine the selected proficiency level for the current question
            const proficiencyInput = document.querySelector(
              `input[name="${section.id}-proficiency"]:checked`
            );
            // Set proficiency to "competent" by default if no proficiency level is selected, otherwise use the selected value
            const proficiency = proficiencyInput ? proficiencyInput.value : "competent";
            // Add course recommendation to the appropriate proficiency level array for the current indicator
            recommendations[indicatorKey][proficiency].push(section.course);
          });
        });
        // Call populateResults function to update the results section with the generated recommendations
        populateResults(recommendations);
        // Turn resultsSection visible after populating it with recommendations
        resultsSection.classList.add('is-visible');
      }

      // Use html2pdf to generate a PDF of the results section
      function downloadRecommendations() { 
        // Force reflow to ensure the latest styles are applied
        resultsSection.offsetHeight; 
        html2pdf().set(opt).from(resultsSection).save();
      }

      /* 
       * SUBMIT BUTTON - listens for form submission, prevents page reload, and calls 
       * suggestTraining to generate recommendations based on the user's answers.
       */


      const form = document.getElementById("questionnaire-form");

      form.addEventListener("submit", function (e) {
        e.preventDefault();      // Prevent page reload
        suggestTraining();       // Run your recommendation logic
        downloadRecommendations(); // Calls downloadRecommendations when clicked
      });
    }
  };
})(Drupal, once);