export class Link {
    id: number;
    name: string;
    value: string;
    isActive: boolean;
    
    constructor (id:number, name:string, value:string, isActive:boolean) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.isActive = isActive;
    }
}