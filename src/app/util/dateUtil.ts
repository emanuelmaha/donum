export class DateUtil {
    static getUSDateFormat(date = new Date()): string {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      }
}