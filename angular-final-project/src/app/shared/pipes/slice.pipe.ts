import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform {

  transform(value: string, maxCharCount: number): string {
    debugger
    const dots = value.length > maxCharCount ? '...' : '';
    debugger
    const result = value.substring(0, maxCharCount)
    const message = `<br><br><span class="text-primary">Click on details to read more</span>`
    debugger
    return `${result}${dots}${message}`;
  }

}
