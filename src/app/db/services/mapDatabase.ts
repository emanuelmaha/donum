export class MapDatabase {
    static getCollection() {
        return [
            {
                name: 'user',
                schema: require('../schemas/user.schema.json')
            },
            {
                name: 'link',
                schema: require('../schemas/link.schema.json')
            },
            {
                name: 'member',
                schema: require('../schemas/member.schema.json')
            }
        ];
    }
}