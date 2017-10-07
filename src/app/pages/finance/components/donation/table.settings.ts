export class TableSettings {

  static GetSettings(): any {
    return {
      pager: {
        display: true,
        perPage: 15
      },
      add: {
        addButtonContent: '',
        createButtonContent: '',
        cancelButtonContent: '',
        confirmCreate: false
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
          title: 'Count',
          type: 'number',
          sort: true,
          editable: false,
        },
        memberName: {
          title: 'Member',
          type: 'string',
          editable: false,
        },
        checkNo: {
          title: 'Check No',
          type: 'string'
        },
        scope: {
          title: 'Scope',
          type: 'string'
        },
        sum: {
          title: 'Amount',
          type: 'number'
        },
        dateOfReceived: {
          title: 'Date',
          type: 'string',
          editable: false,
        }
      },
    }
  }
}