import { beforeEach, describe, expect, it } from 'vitest';
import './add-aria.js';

describe('addAriaBehavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="edit-search-api-fulltext" type="text" />
      <button id="edit-submit-search">Search</button>
      <ul class="quick-action-list">
        <li class="quick-action-item">
          <div class="views-field-title">Password Reset</div>
          <div class="field-content"><a href="/password-reset">Link</a></div>
        </li>
      </ul>
    `;
    Drupal.behaviors.addAriaBehavior.attach(document, {});
  });

  it('sets aria-labelledby on the search input from the submit button', () => {
    const input = document.querySelector('#edit-search-api-fulltext');
    expect(input.getAttribute('aria-labelledby')).toBe('edit-submit-search');
  });

  it('sets aria-labelledby on quick-action links from the title', () => {
    const title = document.querySelector('.views-field-title');
    const link = document.querySelector('.quick-action-item a');
    expect(title.id).toMatch(/^quick-action-title-/);
    expect(link.getAttribute('aria-labelledby')).toBe(title.id);
  });
});
