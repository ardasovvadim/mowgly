export function errorsToHtml(errors: string[]): string {
  return errors.filter((value, index, self) => {
    return self.indexOf(value) === index;
  }).map(it => `<li>${it}</li>`).join('\n');
}
