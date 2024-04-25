import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, args: string): any {
    if (!args) { return value; }
    const re = new RegExp(args, 'gi');
    return value.replace(re, `<span class="highlight">${args}</span>`);
  }

}
