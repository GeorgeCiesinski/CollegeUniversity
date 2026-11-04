import { beforeEach, describe, expect, it } from 'vitest';
import './dropdown-menu.js';

describe('dropdownBehavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul class="menu">
        <li>
          <a href="#">Support</a>
          <ul class="sub-menu"></ul>
        </li>
      </ul>
    `;
    Drupal.behaviors.dropdownBehavior.attach(document, {});
  });

  it('opens a sub-menu on item click', () => {
    const item = document.querySelector('.menu li');
    item.click();
    expect(item.classList.contains('dropdown-active')).toBe(true);
    expect(item.querySelector('.sub-menu').classList.contains('visible')).toBe(true);
  });

  it('closes open sub-menus on document click', () => {
    const item = document.querySelector('.menu li');
    item.click();
    document.body.click();
    expect(item.classList.contains('dropdown-active')).toBe(false);
    expect(item.querySelector('.sub-menu').classList.contains('visible')).toBe(false);
  });
});
