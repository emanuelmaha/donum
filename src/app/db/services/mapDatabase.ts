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
                schema: require('../schemas/member.schema.json')
            },
            {
                name: 'note',
                schema: require('../schemas/note.schema.json')
            }
        ];
    }
}