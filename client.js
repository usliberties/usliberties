import {renderElement} from 'nomplate';

import constitutional from './src/constitutional';
import components from './src/components';

if (require.main === module) {
  const element = renderElement(constitutional(), global.document);
  
  global.window.onload = () => {
    const container = document.querySelector('#container');
    container.appendChild(element);
  };
}

// TODO(lbayes): Why won't export default work here?
module.exports = {
  components,
  constitutional,
};


