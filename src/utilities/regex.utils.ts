export const methods = {
  removeTemplateFromWord,
  getPlaceholdersFromString
}

function removeTemplateFromWord(word: string): string {
  return  word.slice(1, -1).trim();
}

function getPlaceholdersFromString(message: string): string[] {
  return message.match(/{([^{}]*)}/g);
}
