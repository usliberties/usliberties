import {dom} from 'nomplate';

function constitutional() {
  console.log('CLIENT LOADEd');
  return dom.div(() => {
    dom.h1('We the people!');
  });
};

export default constitutional;

