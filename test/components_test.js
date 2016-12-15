import {assert} from 'chai';
import {dom, renderElement} from 'nomplate';
import {jsdom} from 'jsdom';

import {components} from '../';

describe('Components', () => {
  let document;

  beforeEach(() => {
    document = jsdom('<body></body>');
  });

  function render(element) {
    return renderElement(element, null, document);
  }

  it('is instantiable', () => {
    const element = components.constitution({
      name: 'abcd'
    });

    assert.equal(render(element).outerHTML,
      '<div class="doc"><a class="aclu-button" href="http://bit.ly/2hmlTd3" target="_blank">Donate to the ACLU now!</a><h1>abcd</h1><header></header></div>');
  });

  it('builds child part', () => {
    const element = components.constitution({
      name: 'efgh',
      children: [
        {
          type: 'part',
          name: 'Preamble',
          children: [
          ],
        }
      ],
    });

    // const result = render(element);
    //assert.equal(result.outerHTML,
      //'<div class="doc"><h1>efgh</h1><div class="part"><h2>Preamble</h2></div></div>');
  });
});
