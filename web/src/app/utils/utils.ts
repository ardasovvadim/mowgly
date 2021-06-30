export abstract class Indexer {
  private static id: number = 0;
  public static getId = (): number => (++Indexer.id);
}

declare global {
  interface String {
    format(...replacements: string[]): string;
  }
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

export {}
