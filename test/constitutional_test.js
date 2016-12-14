import {assert} from 'chai';
import {jsdom} from 'jsdom';
import constitution from '../';

describe.skip('Constitutional test', () => {
  let document, instance;

  beforeEach(() => {
    document = jsdom('<body></body>');
    instance = constitution(document);
  });

  it('is instantiable', () => {
    assert(instance);
  });
});

