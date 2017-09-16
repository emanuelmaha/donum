import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member, Donation } from '../../../../_models';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'donation',
  templateUrl: './donation.html',
  styleUrls: ['./donation.scss']

})
export class DonationComponent implements OnInit {
  source: LocalDataSource;
  memberPlaceholder = 'Member name';
  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      memberName: {
        title: 'Member Name',
        type: 'string',
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: [
                {
                  id: 1, firstName: 'Emanuel', lastName: 'Mahalean',
                  username: 'emanuel', email: 'emanuel@gmail.com', age: 20
                },
                {
                  id: 1, firstName: 'Roby', lastName: 'Mahalean',
                  username: 'emanuel', email: 'emanuel@gmail.com', age: 20
                },
                {
                  id: 1, firstName: 'Parker', lastName: 'Mahalean',
                  username: 'emanuel', email: 'emanuel@gmail.com', age: 20
                },
                {
                  id: 1, firstName: 'Jony', lastName: 'Mahalean',
                  username: 'emanuel', email: 'emanuel@gmail.com', age: 20
                },
              ],
              searchFields: 'firstName',
              titleField: 'firstName',
              placeholder: 'Member name',
              overrideSuggested: true
            },

          }
        }
      },
      scope: {
        title: 'Scope',
        type: 'string'
      },
      amount: {
        title: 'Amount',
        type: 'number'
      },
      date: {
        title: 'Date',
        type: 'string'
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    let donations = [
      { id: 1, memberName: 'Petru Vasile', scope: 'Ajutor', amount: 12.4, date: "08/15/2017" },
      { id: 2, memberName: 'Ion Vasile', scope: 'Ajutor', amount: 200, date: "08/15/2017" },
      { id: 3, memberName: 'Marku Vasile', scope: 'Ajutor', amount: 120.4, date: "08/15/2017" },
      { id: 4, memberName: 'Tudor Ilies', scope: 'Ajutor', amount: 150, date: "08/15/2017" },
    ];
    this.source = new LocalDataSource(donations);
  }

  ngOnInit() {
    let memberId = this.route.snapshot.queryParams['memberId'];
    if (memberId) {
      this.source.setFilter([
        {
          field: 'id',
          search: memberId
        }
      ], false)
    }
  }

  delete(event): void {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  add(event): void {
    console.log(event);
    let d = new Date();

    event.newData.date = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()
    event.confirm.resolve(event.newData);
  }

  edit(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
