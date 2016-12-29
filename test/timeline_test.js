import {assert} from 'chai';
import {dom, renderElement} from 'nomplate';
import {jsdom} from 'jsdom';

import {components} from '../';

describe('Timeline', () => {
  let document;

  beforeEach(() => {
    document = jsdom('<body></body>');
  });

  function render(element) {
    return renderElement(element, document);
  }

  it('is instantiable', () => {
    const element = components.timeline({});

    const result = render(components.timeline());
    assert.equal(result.outerHTML, '<div class="timeline"><svg version="1.1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" stroke-width="0.5"></line></svg></div>');
  });
});

