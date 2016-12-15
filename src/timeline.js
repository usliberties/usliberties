import {dom, svg} from 'nomplate';

function timeline(constitution) {
  return dom.div({className: 'timeline'}, () => {
    svg({
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
    }, () => {
      svg.rect({height: '100%', width: '100%', style: 'stroke:#333; fill:#ccc;'});
    });
  });
}

export default timeline;

