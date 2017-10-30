export class MapDatabase {
    static getCollection() {
        return [
            {
                name: 'donation',
                schema: require('../schemas/donation.schema.json'),
                // migrationStrategies: {
                //     // 1 means, this transforms data from version 0 to version 1
                //     1: function(oldDoc){
                //         let newDoc = {
                //             id: oldDoc.id,
                //             sum: oldDoc.sum,
                //             memberName: oldDoc.memberName,
                //             checkNo: oldDoc.checkNo,
                //             scope: oldDoc.scope,
                //             dateOfReceived: oldDoc.dateOfReceived,
                //             createdDate: new Date(oldDoc.createdDate).getTime(),
                //             _id: oldDoc._id,
                //             _rev: oldDoc._rev
                //         }
                //       return newDoc;
                //     },
            },
            {
                name: 'user',
                schema: require('../schemas/user.schema.json')
            },
            {
                name: 'member',
                schema: require('../schemas/member.schema.json')
            },
            {
                name: 'note',
                schema: require('../schemas/note.schema.json')
            }
        ];
    }
}