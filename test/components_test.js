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
    return renderElement(element, document);
  }

  it('is instantiable', () => {
    const element = components.constitution({
      name: 'abcd'
    });

    assert.equal(render(element).outerHTML,
      '<div class="doc"><a class="aclu-button" href="http://bit.ly/2hmlTd3" target="_blank">Donate to the ACLU now!</a><header><h1>abcd</h1><div class="timeline"><svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect height="100%" width="100%" style="stroke:#333; fill:#ccc;"></rect></svg></div></header></div>');
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
