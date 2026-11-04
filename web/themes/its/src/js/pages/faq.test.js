import { beforeEach, describe, expect, it } from 'vitest';
import './faq.js';

describe('faqDropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="faq-heading">
        Question
        <span class="material-symbols-rounded">visibility</span>
      </div>
      <div class="faq-dropdown">Answer</div>
    `;
    Drupal.behaviors.faqDropdown.attach(document, {});
  });

  it('toggles .faq-dropdown.active and the icon on heading click', () => {
    const heading = document.querySelector('.faq-heading');
    const panel = document.querySelector('.faq-dropdown');
    const icon = heading.querySelector('.material-symbols-rounded');

    heading.click();
    expect(panel.classList.contains('active')).toBe(true);
    expect(icon.textContent).toBe('visibility_off');

    heading.click();
    expect(panel.classList.contains('active')).toBe(false);
    expect(icon.textContent).toBe('visibility');
  });
});
