import { slug } from "github-slugger";
import { marked } from "marked";
import smartypants from 'smartypants';




// wordsExtractor.ts

export const makeExcerpt = (inputString: string, numberOfWords: number): string => {
  const wordsArray: string[] = inputString.split(/\s+/);

  // If the string has fewer words than numberOfWords, use the whole string
  const selectedWords: string[] = wordsArray.slice(0, numberOfWords > wordsArray.length ? wordsArray.length : numberOfWords);

  let resultString: string = selectedWords.join(' ');

  // Add ellipsis if there are more words in the string
  if (wordsArray.length > numberOfWords) {
      resultString += '...';
  }

  return resultString;
};



export const setPageTitle = (inputString: string) => {
  const colonIndex: number = inputString.indexOf(':');
  
  // Check if there is a colon in the string
  if (colonIndex !== -1) {
    // Extract the portion before and including the colon
    const extractedText: string = inputString.substring(0, colonIndex + 1).trim();
    
    // Extract the portion after the colon
    const remainingText: string = inputString.substring(colonIndex + 1).trim();
    
    // Wrap the extracted text in a span with the specified class, including a space after the colon
    const result: string = `<small>${extractedText} </small>${remainingText}`;
    
    return result;
  } else {
    // If there is no colon, return the original string
    return inputString;
  }
}

// slugify
export const slugify = (content: string) => {
  return slug(content);
};


// smartify
export const smartify = (content: string) => {
  return smartypants(content);
};





// markdownify
export const markdownify = (content: string, div?: boolean) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// plainify
export const plainify = async (content: string) => {
  const parsedContent = await marked.parse(content);
  const filteredContent = parsedContent.replace(/<\/?[^>]+(>|$)/gm, "").replace(/[\r\n]\s*[\r\n]/gm, "");
  return htmlEntityDecoder(filteredContent);
};

// strip entities for plainify
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


export const metafy = async (content: string) => {
  const parseMarkdown = await marked.parse(content); // Wait for the promise to resolve
  const parseMarkdownString = typeof parseMarkdown === 'string' ? parseMarkdown : '';

  const filterBrackets = parseMarkdownString.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);

  // Replace hyphens and underscores with spaces
  const replaceHyphensUnderscores = stripHTML.replace(/[-_]/g, " ");

  // Define common words that should not be capitalized
  const nonCapitalizedWords = ["a", "an", "and", "of", "with" /* Add more words as needed */];

  // Capitalize each word, excluding common words if they don't appear at the beginning
  const capitalizeWords = replaceHyphensUnderscores.replace(/\b\w+\b/g, (match, index) => {
    const lowercasedWord = match.toLowerCase();
    return index === 0 || !nonCapitalizedWords.includes(lowercasedWord)
      ? lowercasedWord.charAt(0).toUpperCase() + lowercasedWord.slice(1)
      : lowercasedWord;
  });

  // Trim leading and trailing white space
  const trimmedResult = capitalizeWords.trim();

  return trimmedResult;
};


