import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ExamService } from '../../exam/exam/exam.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  characters: Table[];
  constructor(private _userService: UserService, private _examService: ExamService) { }

  ngOnInit() {
    this
      ._userService
      .getCharacters()
      .subscribe((data: Table[]) => {
        this.characters = data;
      });
  }



  // tslint:disable-next-line:member-ordering
  settings = {
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-times"></i>',
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil-square-o"></i>',
      saveButtonContent: '<i class="fa fa-floppy-o"></i>',
      cancelButtonContent: '<i class="fa fa-times"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'No Users To show ',
    attr: {
      class: 'table table-bordered'
    },
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Name'
      },
      age: {
        title: 'Age'
      }
    }
  };
  rowSelectEvent(event) {
    console.log(event);
  }

}

export interface Table {
  id: Number;
  name: String;
  age: Number;
}
