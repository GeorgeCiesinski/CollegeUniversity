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

  it('wires aria attributes on attach', () => {
    const heading = document.querySelector('.faq-heading');
    const panel = document.querySelector('.faq-dropdown');
    expect(heading.getAttribute('role')).toBe('button');
    expect(heading.getAttribute('aria-expanded')).toBe('false');
    expect(heading.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.id).toBeTruthy();
  });

  it('toggles .faq-dropdown.active, aria-expanded, and the icon on heading click', () => {
    const heading = document.querySelector('.faq-heading');
    const panel = document.querySelector('.faq-dropdown');
    const icon = heading.querySelector('.material-symbols-rounded');

    heading.click();
    expect(panel.classList.contains('active')).toBe(true);
    expect(heading.getAttribute('aria-expanded')).toBe('true');
    expect(icon.textContent).toBe('visibility_off');

    heading.click();
    expect(panel.classList.contains('active')).toBe(false);
    expect(heading.getAttribute('aria-expanded')).toBe('false');
    expect(icon.textContent).toBe('visibility');
  });

  it('toggles on Enter key', () => {
    const heading = document.querySelector('.faq-heading');
    const panel = document.querySelector('.faq-dropdown');
    heading.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(panel.classList.contains('active')).toBe(true);
  });
});
