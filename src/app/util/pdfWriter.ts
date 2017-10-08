import * as jsPDF from 'jspdf';
import { IDonation, IMember } from '../_models/';
import { Logo } from './logo';
import { DateUtil } from './dateUtil';
import { DonationView, MemberView } from '../modelView/'

export class PdfWriter {

    static buildReportAll(doc: jsPDF, reportFor: string, startDate: Date, endDate: Date, donations: IDonation[]) {
        donations = DonationView.GroupDonationByMemberName(donations);
        PdfWriter.writeHeader(doc);
        PdfWriter.writeReportTitle(doc, 'All Members', startDate, endDate)
        PdfWriter.writeTableAll(doc);
        let lineX = PdfWriter.writeDonationsAll(doc, donations);
        PdfWriter.writeTotalAmount(doc, DonationView.GetToatalDonation(donations), lineX)
        PdfWriter.writeFooter(doc);
    }

    static buildReportMembers(doc: jsPDF, startDate: Date, endDate: Date, members: MemberView[]) {
        let forMembers = ''
        let donationsAll = [];
        members.forEach(element => {
            forMembers += element.getFullName() + ', ';
            if (Array.isArray(element.donations)) {
                element.donations.forEach(don => {
                    donationsAll.push(don);
                });
            }
        });
        forMembers = forMembers.slice(0, -2);

        PdfWriter.writeHeader(doc);
        PdfWriter.writeReportTitle(doc, forMembers, startDate, endDate);
        PdfWriter.writeTableMember(doc);
        let lineY = PdfWriter.writeDonationsMember(doc, members);
        PdfWriter.writeTotalAmount(doc, DonationView.GetToatalDonation(donationsAll), lineY);
        PdfWriter.writeFooter(doc);
    }

    static writeFooter(doc: jsPDF) {
        doc.setFontSize(12)
        doc.text('2809 Milroy Ln. Houston, TX. 77066  ~ www.graceromanianchurch.org ~  © GRPC', 35, 290);
    }

    static writeHeader(doc: jsPDF) {
        doc.addImage(Logo.getLogoGRPC(), 'jpeg', 20, 10, 20, 20);
        doc.setFont('victorian');
        doc.setFontSize(22);
        doc.text('Grace Romanian Penticostal Church', 50, 23);
        doc.setFontSize(12);
        doc.text('Pastor, Vasile Streango', 160, 28);
    }

    static writeReportTitle(doc: jsPDF, reportFor: string, startDate: Date, endDate: Date) {
        doc.setFontSize(16);
        doc.text('Donation Report', 90, 35);
        doc.setFontSize(14);
        doc.text('For: ' + reportFor, 20, 45);
        doc.setFontSize(12);
        doc.text('Report Date: ' + DateUtil.getUSDateFormat(startDate) + ' through ' + DateUtil.getUSDateFormat(endDate), 20, 50)
        doc.text('Date: ' + DateUtil.getUSDateFormat(), 20, 55)
    }

    static writeTableAll(doc: jsPDF) {
        doc.setLineWidth(1)
        doc.line(5, 60, 205, 60);
        doc.setFontSize(14);
        doc.text('Name', 20, 66);
        doc.text('Amount', 100, 66);
        doc.setLineWidth(0.5)
        doc.line(5, 69, 205, 69);
    }

    static writeDonationsAll(doc: jsPDF, donations: IDonation[]): any {
        doc.setFontSize(12)
        let lineY = 75;
        let index = 1;
        for (let donation of donations) {
            doc.text(index.toString(), 10, lineY);
            doc.text(donation.memberName.toString(), 20, lineY)
            doc.text(donation.sum.toString() + ' $', 100, lineY);
            lineY += 7;
            index += 1;
            if (lineY > 270) {
                doc.addPage();
                PdfWriter.writeHeader(doc);
                PdfWriter.writeFooter(doc)
                lineY = 40;
            }
        }
        return lineY
    }

    static writeTableMember(doc: jsPDF) {
        doc.setLineWidth(1)
        doc.line(5, 60, 205, 60);
        doc.setFontSize(14);
        doc.text('Num', 40, 66);
        doc.text('Date', 60, 66);
        doc.text('Memo', 85, 66);
        doc.text('Check', 150, 66);
        doc.text('Amount', 175, 66);
        doc.setLineWidth(0.5)
        doc.line(5, 69, 205, 69);
    }

    static writeDonationsMember(doc: jsPDF, members: MemberView[]): any {
        doc.setFontSize(12)
        let lineY = 75;
        let index = 1;
        for (let member of members) {
            if (Array.isArray(member.donations) && member.donations.length > 0) {
                doc.text(member.getFullName(), 10, lineY);
                lineY += 7
                for (let donation of member.donations) {
                    doc.text(donation.id.toString(), 40, lineY)
                    doc.text(donation.dateOfReceived, 60, lineY)
                    doc.text(donation.scope == null ? '' : donation.scope, 85, lineY);
                    doc.text(donation.checkNo == null ? '' : donation.checkNo, 150, lineY);
                    doc.text(donation.sum.toString() + ' $', 175, lineY);
                    lineY += 7;
                    index += 1;
                    if (lineY > 270) {
                        doc.addPage();
                        PdfWriter.writeHeader(doc);
                        PdfWriter.writeFooter(doc)
                        lineY = 40;
                    }
                }
            }
        }
        return lineY
    }

    static writeTotalAmount(doc: jsPDF, totalAmount: number, lineY: number) {
        doc.setLineWidth(0.5)
        doc.line(5, lineY - 5, 205, lineY - 5);
        doc.setFontSize(14);
        doc.text('Total Amount: ' + totalAmount + ' $', 100, lineY + 4)
    }

}