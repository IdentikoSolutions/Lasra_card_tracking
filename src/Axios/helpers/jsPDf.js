import {jsPDF} from 'jspdf'
export const generatePdf = (id) => {
    const doc = new jsPDF('p', 'pt', 'a4')
    doc.html(document.querySelector(id), {
      callback: (pdf) => {
        pdf.save('MyPDf.pdf')
      },
    })
    console.log('generatepdf')

  }