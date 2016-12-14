import {dom} from 'nomplate';

function processChildren(children) {
  if (children) {
    children.forEach(child => {
      if (!lookup[child.type]) {
        console.error('UNSUPPORTED TYPE: ' + child.type);
      }
      lookup[child.type](child);
    });
  }
}

function amendment(amendment) {
  return dom.div({className: 'amendment'}, () => {
    dom.h2(amendment.name);
    processChildren(amendment.children);
  });
}

function article(article) {
  return dom.div({id: `article-${article.identifier}`, className: 'article'}, () => {
    dom.h3(article.name);
    processChildren(article.children);
  });
}

function constitution(document) {
  return dom.div({className: 'doc'}, () => {
    dom.h1(document.name);
    processChildren(document.children);
  });
}

function paragraph(paragraph) {
  return dom.p(paragraph.content.join(''));
}

function part(part) {
  return dom.div({className: 'part'}, () => {
    dom.h2(part.name);
    processChildren(part.children);
  });
}

function section(section) {
  return dom.div({id: `section-${section.identifier}`, className: 'section'}, () => {
    processChildren(section.children);
  });
}

const lookup = {
  amendment,
  article,
  constitution,
  paragraph,
  part,
  section,
};

export default lookup;

