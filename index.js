const dom = require('nomplate').dom;

function index() {
  let hash = '';
  let path = '';
  
  const args = process.argv;
  
  let hashIndex = args.findIndex((arg) => arg === '--hash');
  if (hashIndex > -1) {
    hash = args[hashIndex + 1];
    path = 'pack-' + hash + '/';
  }

  return dom.html(() => {
    dom.head(() => {
      dom.title('Constitution of the United States');
      dom.meta({charset: 'utf-8'});
      dom.link({rel: 'stylesheet', href: path + 'constitutional.css'});
      dom.link({rel: 'stylesheet', href: path + 'fonts.css'});
      dom.script({src: path + 'constitutional.js', type: 'text/javascript'});
    });

    dom.body(() => {
      dom.div({id: 'container'});
    });
  });
};

module.exports = index;