import { beforeEach, describe, expect, it } from 'vitest';
import './tabbed-content.js';

describe('tabbedContent', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="tab-button" data-tab="1">One</button>
      <button class="tab-button" data-tab="2">Two</button>
      <div class="tab-content" data-tab="1"></div>
      <div class="tab-content" data-tab="2"></div>
    `;
    Drupal.behaviors.tabbedContent.attach(document, {});
  });

  it('activates the first tab and panel on attach', () => {
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    expect(buttons[0].classList.contains('active')).toBe(true);
    expect(buttons[1].classList.contains('active')).toBe(false);
    expect(contents[0].classList.contains('active')).toBe(true);
    expect(contents[1].classList.contains('active')).toBe(false);
  });

  it('switches the active panel when another tab is clicked', () => {
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    buttons[1].click();
    expect(buttons[0].classList.contains('active')).toBe(false);
    expect(buttons[1].classList.contains('active')).toBe(true);
    expect(contents[0].classList.contains('active')).toBe(false);
    expect(contents[1].classList.contains('active')).toBe(true);
  });
});
