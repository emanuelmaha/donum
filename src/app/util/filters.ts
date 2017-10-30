import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchBy:string, searchKey: string): any {
        if(searchKey) {
            return items.filter(item => (item[searchBy[0]] + ' ' + item[searchBy[1]]).toLowerCase().indexOf(searchKey.toLowerCase()) > -1);
        }
        return items;
    }
}
