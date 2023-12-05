import { slug } from "github-slugger";
import { marked } from "marked";

// slugify
export const slugify = (content: string) => {
  return slug(content);
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
export const plainify = (content: string) => {
  const parseMarkdown = marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
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


export const metafy = (content: string) => {
  // Perform the operations similar to plainify function
  const parseMarkdown = marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);

  // Replace hyphens and underscores with spaces
  const replaceHyphensUnderscores = stripHTML.replace(/[-_]/g, " ");

  // Define common words that should not be capitalized
  const nonCapitalizedWords = ["a", "an", "and", "of", "with", /* Add more words as needed */];

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

