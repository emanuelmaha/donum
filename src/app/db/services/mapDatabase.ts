export class MapDatabase {
    static getCollection() {
        return [
            {
                name: 'user',
                schema: require('../schemas/user.schema.json'),
                sync: true
            },
            {
                name: 'link',
                schema: require('../schemas/link.schema.json'),
                sync: false
            },
            {
                name: 'member',
                schema: require('../schemas/member.schema.json'),
                sync: true
            }
        ];
    }
}