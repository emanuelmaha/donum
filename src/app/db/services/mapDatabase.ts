export class MapDatabase {
    static getCollection() {
        return [
            {
                name: 'donation',
                schema: require('../schemas/donation.schema.json')
            },
            {
                name: 'user',
                schema: require('../schemas/user.schema.json')
            },
            {
                name: 'member',
                schema: require('../schemas/member.schema.json'),
                migrationStrategies: {
                    // 1 means, this transforms data from version 0 to version 1
                    1: function(oldDoc){
                      return oldDoc;
                    },
                    2: function(oldDoc){
                        return oldDoc;
                    }
                    
                }
            },
            {
                name: 'note',
                schema: require('../schemas/note.schema.json')
            }
        ];
    }
}