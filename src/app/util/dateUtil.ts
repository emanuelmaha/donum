export class DateUtil {
    static getUSDateFormat(date = new Date()): string {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
      }
}