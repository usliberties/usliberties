import {renderElement} from 'nomplate';

import constitutional from './src/constitutional';
import components from './src/components';

if (require.main === module) {
  global.window.onload = () => {
    const element = renderElement(constitutional(), global.document);
    const container = document.querySelector('#container')
    container.appendChild(element);
  };
}

// TODO(lbayes): Why won't export default work here?
module.exports = {
  components,
  constitutional,
};


