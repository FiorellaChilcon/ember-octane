import { module, test } from 'qunit';
import { visit, currentURL, click, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logging out', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /teams and clicking logout ', async function(assert) {
    await visit('/teams');
    // await pauseTest(); // It's like debugger, if you dont want to import it youcan call it like: this.pauseTest();
    assert.equal(currentURL(), '/teams');
    // await pauseTest();
    await click('.team-sidebar__logout-button');
    assert.equal(currentURL(), '/login');
  });
});
