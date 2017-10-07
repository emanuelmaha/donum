import * as jsPDF from 'jspdf';
import { Donation } from '../../../../_models/';
import { Logo } from './logo';

export class PdfWriter {

    static writeFooter(doc: jsPDF) {
        doc.setFontSize(12)
        doc.text('2809 Milroy Ln. Houston, TX. 77066  ~ www.graceromanianchurch.org ~  © GRPC', 35, 290);
    }

    static writeHeader(doc: jsPDF) {
        let logoImgData = '';
        doc.addImage('', 'jpeg', 20, 10, 20, 20);
        doc.setFont('victorian');
        doc.setFontSize(22);
        doc.text('Grace Romanian Penticostal Church', 50, 23);
        doc.setFontSize(12)
        doc.text('Pastor, Vasile Streango', 160, 28)
    }

    static writeDonation(doc: jsPDF, donations: Donation[]): any {
        let lineX = 40;
        let index = 1;
        for (let donation of donations) {
            doc.text(20, lineX, 'Member name:' + donation.memberName + ' donate ' + donation.sum + ' $');
            lineX += 10;
            index += 1;
            if(lineX > 270 ){
                doc.addPage();
                lineX = 40;
            }
        }
        return lineX
    }

    static writeTotalAmount(doc: jsPDF, totalAmount: number, linex: number) {
        doc.setFontSize(14);
        doc.text('Total Amount: ' + totalAmount, linex, 120)
    }
}