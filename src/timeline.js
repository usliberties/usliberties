import {dom, svg} from 'nomplate';

function timeline(constitution) {
  return dom.div({className: 'timeline'}, () => {
    svg({
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
    }, () => {
    
    svg.line({'x1': '0', 'y1': '50%', 'x2': '100%', 'y2': '50%', 'stroke': 'black', 'stroke-width': '0.5'});
    });
  });
}

export default timeline;

