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

  it('adds a visibility icon on attach', () => {
    const icon = document.querySelector('.career-item li .material-symbols-rounded');
    expect(icon).not.toBeNull();
    expect(icon.textContent).toBe('visibility');
  });

  it('toggles .li-active and the icon on click', () => {
    const item = document.querySelector('.career-item li');
    item.click();
    expect(item.classList.contains('li-active')).toBe(true);
    expect(item.querySelector('.material-symbols-rounded').textContent).toBe('visibility_off');

    item.click();
    expect(item.classList.contains('li-active')).toBe(false);
    expect(item.querySelector('.material-symbols-rounded').textContent).toBe('visibility');
  });
});
