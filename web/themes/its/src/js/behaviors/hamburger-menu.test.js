import { beforeEach, describe, expect, it } from 'vitest';
import './hamburger-menu.js';

describe('hamburgerBehavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="navbar-toggle" aria-expanded="false">Menu</button>
      <nav class="nav-bar"></nav>
    `;
    Drupal.behaviors.hamburgerBehavior.attach(document, {});
  });

  it('toggles aria-expanded and .nav-bar.active on click', () => {
    const toggle = document.querySelector('#navbar-toggle');
    const nav = document.querySelector('.nav-bar');

    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(nav.classList.contains('active')).toBe(true);

    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(nav.classList.contains('active')).toBe(false);
  });
});
