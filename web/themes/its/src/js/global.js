/**
 * @file
 * Vite sitewide JavaScript entry.
 *
 * Side-effect imports Drupal behaviors used on most pages: hamburger,
 * menu dropdowns, background-image scroll blur, search/quick-action
 * aria labels, datetime-local inputs, and FAQ accordions.
 */

import './behaviors/hamburger-menu.js';
import './behaviors/dropdown-menu.js';
import './behaviors/scroll-blur.js';
import './behaviors/add-aria.js';
import './behaviors/datetime-override.js';
import './pages/faq.js';
