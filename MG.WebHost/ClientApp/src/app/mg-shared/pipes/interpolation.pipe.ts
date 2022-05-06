import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interpolation'
})
export class InterpolationPipe implements PipeTransform {

  private readonly pattern = '{\\w+}';

  transform(value: string, ...args: any[]): string {
    const object = args != null && args.length > 0 ? args[0] : null;

    if (object == null)
      return value;

    let result = String(value);
    const matches = result.match(this.pattern) as string[];

    if (matches == null || matches.length == 0)
      return value;

    matches.forEach(match => {
      const key = match.substr(1, match.length - 2);
      const objectValue = object[key] as string;
      if (objectValue != null)
        result = result.replace(match, objectValue);
    });

    return result;
  }

}
