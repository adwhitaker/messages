export const methods = {
  removeTemplateFromWord,
  getPlaceholdersFromString
}

function removeTemplateFromWord(word: string): string {
  console.assert(word != null, 'Assertion Fail @ regexUtils#removeTemplateFromWord: No word');
  return  word.slice(1, -1).trim();
}

function getPlaceholdersFromString(message: string): string[] {
  console.assert(message != null, 'Assertion Fail @ regexUtils#getPlaceholdersFromString: No message');
  return message.match(/{([^{}]*)}/g);
}
