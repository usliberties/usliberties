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
    let sup = getAmendmentSup(amendment);
    dom.h3({className: 'amendment-num'}, () => {
      dom.text(sup[0]);
      dom.sup(sup[1]);
      dom.text(` Amendment: ${amendment.name}`);
    });

    dom.div({className: 'amendment-content'}, () => {
      processChildren(amendment.children);
    });
  });
}

function getAmendmentSup(amendment) {
  const number = (amendment.num).split(' ')[1];
  if (number == '1' || number == '21') {
    return [number, 'st'];
  } else if (number == '2' || number == '22') {
    return [number, 'nd'];
  } else if (number == '3' || number == '23') {
    return [number, 'rd'];
  } else {
    return [number, 'th'];
  }
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
      dom.h2({className: 'amendments-header'}, part.name);
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

