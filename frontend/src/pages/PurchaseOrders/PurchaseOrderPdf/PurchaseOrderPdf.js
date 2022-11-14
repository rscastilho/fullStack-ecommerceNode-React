import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { UtilService } from './../../../utils/UtilService';

const PurchaseOrderPdf = (pedido) => {
    console.log(pedido)
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const titulo = [
        {
            text: `Pedido de compra número ${pedido.pedido[0].id}`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]
        },
    ]

    const dadosPedido = pedido.itensPedido.map((item) => {
          
        return [
            { text: item.descricao, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: item.quantidade, fontSize: 9, margin: [0, 2, 0, 2], alignment:'center' },
            { text: (UtilService.formatCurrency(item.valor)), fontSize: 9, margin: [0, 2, 0, 2], alignment:'right' },
            { text: (UtilService.formatCurrency(item.quantidade * item.valor)), fontSize: 9, margin: [0, 2, 0, 2], alignment:'right' },
        ]

    })

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                    [{ text: 'Descrição', style: 'tableHeader', fontSize: 10, bold:true },
                    { text: 'Quantidade', style: 'tableHeader', fontSize: 10, bold:true, alignment:'center' },
                    { text: 'Valor', style: 'tableHeader', fontSize: 10, alignment:'right' },
                    { text: 'Total', style: 'tableHeader', fontSize: 10, alignment:'right' },
                ], 
                ...dadosPedido,
            ]
            },
            // layout: 'headerLineOnly'
            layout: 'lightHorizontalLines'
        }
    ]

    const rodape = (currentPage, pageCount) => {
        return [
            {
                text: currentPage.toString() + ' / ' + pageCount,
                fontSize: 9,
                alignment: 'right',
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40], //left top, right, botton
        header: [titulo],
        content: [details],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).open()

}

export default PurchaseOrderPdf