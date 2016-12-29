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
      `<div class="doc"><a class="aclu-button" href="http://bit.ly/2hmlTd3" target="_blank">Protect people's rights. Donate to the ACLU today →</a><header><h1>The Constitution of the</h1><h1>United States of America</h1></header><div class="content"></div></div>`);
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
  });
});
