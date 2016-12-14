import {dom} from 'nomplate';
import timeline from './timeline';

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

function acluDonate() {
  dom.a({className: 'aclu-button', href: 'http://bit.ly/2hmlTd3', target: '_blank'}, () => {
    dom.text('Donate to the ACLU now!');
  });
}

function constitution(document) {
  return dom.div({className: 'doc'}, () => {
    acluDonate();
    dom.header(() => {
      dom.h1(document.name);
      timeline(document);
      if (document.children) {
        document.children.forEach((part, index) => index > 0 ? partLink(part) : null);
      }
    });
    processChildren(document.children);
  });
}

function getId(entity) {
  if (entity.identifier) {
    return `${entity.name}-${entity.identifier}`;
  } else {
    return entity.name;
  }
}

function partLink(part) {
  dom.span({className: 'part-link'}, () => {
    dom.a({href: `#${getId(part)}`}, part.name);
  });
}

function amendment(amendment) {
  return dom.div({id: getId(amendment), className: 'amendment'}, () => {
    dom.h3(`${amendment.num}: ${amendment.name}`);
    processChildren(amendment.children);
  });
}

function article(article) {
  return dom.div({id: getId(article), className: 'article'}, () => {
    dom.h3(article.name);
    processChildren(article.children);
  });
}

function processParagraph(text) {
  return text;
}

function paragraph(paragraph) {
  return dom.p(processParagraph(paragraph.content.join('')));
}

function part(part) {
  return dom.div({id: getId(part), className: 'part'}, () => {
    if (part.name !== 'Preamble') {
      dom.h2(part.name);
      dom.a({href: '#'}, 'Back to top');
      dom.br();
    }
    processChildren(part.children);
  });
}

function section(section) {
  return dom.div({id: getId(section), className: 'section'}, () => {
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
  timeline,
};

export default lookup;

