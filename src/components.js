import {dom} from 'nomplate';
import timeline from './timeline';

function constitution(document) {
  return dom.div({className: 'doc'}, () => {
    acluDonate();
    //timeline(document);
    dom.header(() => {
      dom.h1('The Constitution of the');
      dom.h1('United States of America');
     /* if (document.children) {
        // Create a container for these links that can be positioned as one grouped object. 
        // @todo trevor
        document.children.forEach((part, index) => index > 0 ? partLink(part) : null);
      } */ 
    });

    dom.div({className: 'content'}, () => {
      // Handle the Premble first, then the rest of the contents
      processChildren(document.children);
    });
  });
}

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
    dom.text("Protect people's rights. Donate to the ACLU today →");
  });
}

function getId(entity) {
  if (entity.identifier) {
    return `${entity.name}-${entity.identifier}`;
  } else {
    return entity.name;
  }
}

function amendment(amendment) {
  return dom.div({id: getId(amendment), className: 'amendment'}, () => {
    dom.h2({className: 'amendment-num'},`${amendment.num}`);
    dom.h3({className: 'amendment-name'}, `${amendment.name}`);

    dom.div({className: 'amendment-content'}, () => {
      processChildren(amendment.children);
    });
  });
}

function article(article) {
  return dom.div({id: getId(article), className: 'article'}, () => {
    dom.h2({className: 'article-title'}, `${article.num}: ${article.name}`);
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
    if (part.name == 'The Amendments') {
      dom.h1({className: 'amendments-header'}, part.name);
    }
    processChildren(part.children);
    dom.hr();
  });
}

function section(section) {
  return dom.div({id: getId(section), className: 'section'}, () => {
    dom.h3({id: getId(section), className: 'section-label'}, 
      `${section.num}: ${section.name}`);
    dom.div({className: 'section-content'}, () => {
      processChildren(section.children);
    });
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

