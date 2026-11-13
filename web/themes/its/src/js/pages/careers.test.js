import { beforeEach, describe, expect, it } from 'vitest';
import './careers.js';

describe('careerItemDropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul class="career-item">
        <li>
          <h4>Smart Classrooms</h4>
        </li>
      </ul>
    `;
    Drupal.behaviors.careerItemDropdown.attach(document, {});
  });

  it('adds a visibility icon and aria on the h4, not the li', () => {
    const item = document.querySelector('.career-item li');
    const heading = item.querySelector('h4');
    const icon = item.querySelector('.material-symbols-rounded');
    expect(icon).not.toBeNull();
    expect(icon.textContent).toBe('visibility');
    expect(item.getAttribute('role')).toBeNull();
    expect(heading.getAttribute('role')).toBe('button');
    expect(heading.getAttribute('aria-expanded')).toBe('false');
    expect(heading.getAttribute('tabindex')).toBe('0');
  });

  it('toggles .li-active, aria-expanded on h4, and the icon on click', () => {
    const item = document.querySelector('.career-item li');
    const heading = item.querySelector('h4');
    item.click();
    expect(item.classList.contains('li-active')).toBe(true);
    expect(heading.getAttribute('aria-expanded')).toBe('true');
    expect(item.querySelector('.material-symbols-rounded').textContent).toBe('visibility_off');

    item.click();
    expect(item.classList.contains('li-active')).toBe(false);
    expect(heading.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles on Enter key on the h4', () => {
    const item = document.querySelector('.career-item li');
    const heading = item.querySelector('h4');
    heading.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(item.classList.contains('li-active')).toBe(true);
    expect(heading.getAttribute('aria-expanded')).toBe('true');
  });
});
