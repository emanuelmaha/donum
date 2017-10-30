import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';

import { TodoService } from './todo.service';
import { DatabaseService } from 'app/db/services/database.service';
import { RxDonumDatabase } from 'app/db/RxDB';
import { Note } from 'app/_models';

@Component({
  selector: 'todo',
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']
})
export class Todo {
  db: RxDonumDatabase;
  public dashboardColors = this._baConfig.get().colors.dashboard;

  public notes: Note[] = [];
  public newTodoText: string = '';

  constructor(private _baConfig: BaThemeConfigProvider,
    private _todoService: TodoService,
    private databaseService: DatabaseService) {
    this.getDBData();
  }
  private async getDBData() {
    this.db = await this.databaseService.get();

    this.db.note.find().sort({createDate: -1}).exec().then(
      (notes: Note[]) => {
        this.notes = notes
      });
  }
  removeNote(id: string) {
    this.notes.filter((n: any) => n._id == id)[0].remove().then(() => {
      this.notes = this.notes.filter((n: any) => n._id != id);
    });
  }

  addNote($event) {
    if (this.newTodoText.trim() != '') {
      let newNote = this.db.note.newDocument({ text: this.newTodoText, isDone: false, createDate: new Date().getTime().toString() });
      newNote.save().then(() => {
        this.notes.unshift (newNote);
      })
      this.newTodoText = '';
    }
  }

  setDone(note: Note){
    note.save();
  }
}
