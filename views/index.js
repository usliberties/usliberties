import {dom} from 'nomplate';

function index() {
  return dom.html() => {
    dom.head(() => {
      dom.title('Constitution of the United States');
    });

    dom.body() => {
      dom.h1('Hello World');
    });
  });
};
