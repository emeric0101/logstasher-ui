import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'consoleSyntaxe' })
export class consoleSyntaxePipe implements PipeTransform {
    transform(text: string): string {
        // error
        let search = 'ERROR';
        var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        pattern = pattern.split(' ').filter((t) => {
          return t.length > 0;
        }).join('|');
        var regex = new RegExp(pattern, 'g');
    
        text = search ? text.replace(regex, (match) => `<span class="console-error console-msg">${match}</span>`) : text;

        // INFO 
        search = 'INFO ';
        var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        pattern = pattern.split(' ').filter((t) => {
          return t.length > 0;
        }).join('|');
        var regex = new RegExp(pattern, 'g');
    
        text = search ? text.replace(regex, (match) => `<span class="console-info console-msg">${match}</span>`) : text;

        // INFO 
        search = 'Successfully started Logstash API endpoint';
        var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        pattern = pattern.split(' ').filter((t) => {
          return t.length > 0;
        }).join('|');
        var regex = new RegExp(pattern, 'g');
    
        text = search ? text.replace(regex, (match) => `<span class="console-info console-msg">${match}</span>`) : text;

        // WARN 
        search = 'WARN ';
        var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        pattern = pattern.split(' ').filter((t) => {
          return t.length > 0;
        }).join('|');
        var regex = new RegExp(pattern, 'g');
    
        text = search ? text.replace(regex, (match) => `<span class="console-warn console-msg">${match}</span>`) : text;


        return text;
      }
}