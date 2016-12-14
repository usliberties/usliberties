import {dom} from 'nomplate';

import components from './components';
import constitution from '../data/constitution.json';

function constitutional() {
  return dom.div(() => {
    components.constitution(constitution);
  });
};

export default constitutional;

