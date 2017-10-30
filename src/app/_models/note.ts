import { RxCollection, RxDocument } from 'rxdb';

declare class Note extends RxDocument {
    text?: string;
    createDate?: string;
    isDone?: boolean;
}

declare class RxNoteCollection extends RxCollection<Note>{}

export {
    RxNoteCollection as RxNoteCollection,
    Note as Note
}