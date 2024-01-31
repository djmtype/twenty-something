import { slug } from "github-slugger";
import { marked } from "marked";
import smartypants from 'smartypants';


export const makeExcerpt = (content: string, numberOfWords: number): string => {
  const wordsArray: string[] = content.split(/\s+/);

  const selectedWords: string[] = wordsArray.slice(0, numberOfWords > wordsArray.length ? wordsArray.length : numberOfWords);

  let resultString: string = selectedWords.join(' ');

  if (wordsArray.length > numberOfWords) {
      resultString += '...';
  }

  return resultString;
};



export const breakLongTitle = (content: string) => {
  const colonIndex: number = content.indexOf(':');
  
  if (colonIndex !== -1) {
    const extractedText: string = content.substring(0, colonIndex + 1).trim();
    
    const remainingText: string = content.substring(colonIndex + 1).trim();
    
    const result: string = `<small>${extractedText} </small>${remainingText}`;
    
    return result;
  } else {
    return content;
  }
}


export const makeSlug = (content: string) => {
  return slug(content);
};


export const makeSmartText = (content: string) => {
  return smartypants(content);
};


export const makeMarkdown = (content: string, div?: boolean) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};


export const makeHumanReadable = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

export const makePlainText = async (content: string) => {
  const parsedContent = await marked.parse(content);
  const filteredContent = parsedContent.replace(/<\/?[^>]+(>|$)/gm, "").replace(/[\r\n]\s*[\r\n]/gm, "");
  return htmlEntityDecoder(filteredContent);
};

const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};


export const makeRichTitle = async (content: string) => {
  const parseMarkdown = await marked.parse(content); // Wait for the promise to resolve
  const parseMarkdownString = typeof parseMarkdown === 'string' ? parseMarkdown : '';

  const filterBrackets = parseMarkdownString.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);

  const replaceHyphensUnderscores = stripHTML.replace(/[-_]/g, " ");

  const nonCapitalizedWords = ["a", "an", "and", "of", "with" /* Add more words as needed */];

  const capitalizeWords = replaceHyphensUnderscores.replace(/\b\w+\b/g, (match, index) => {
    const lowercasedWord = match.toLowerCase();
    return index === 0 || !nonCapitalizedWords.includes(lowercasedWord)
      ? lowercasedWord.charAt(0).toUpperCase() + lowercasedWord.slice(1)
      : lowercasedWord;
  });

  const trimmedResult = capitalizeWords.trim();

  return trimmedResult;
};


