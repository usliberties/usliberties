import constitutional from './src/constitutional';
import {renderElement} from 'nomplate';


if (require.main === module) {
  console.log('LOOOOOOOOOOOOOOOOOOOOODED', global.document);
  const element = renderElement(constitutional(), null, global.document);
  const container = document.querySelector('.container')
  container.appendChild(element);
}

export default constitutional;
