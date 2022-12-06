import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { UtilService } from './../../../utils/UtilService';
import imagemTo64 from 'image-to-base64/browser'

const PurchaseOrderPdf = (pedido) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const titulo = [
        {
            text: `Pedido de compra número ${pedido.pedido[0].id}`,
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 95], 
            alignment: 'center'
        },
    ]

    const dadosPedido = pedido.itensPedido.map((item) => {
        // const image64 =imagemTo64(`../../../../../backend/src/estoque.application/public/products/${item.imagemUrl}`)
        const image64 =()=>{
           return imagemTo64(`http://localhost:5000/imagensprodutos/${item.imagemUrl}`)
                //  .then((result) => { return (`data:image/jpeg;base64,${result}`) }).catch((err) => console.log('erro 64', err))
        }
        return [
            { text: item.descricao, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: item.quantidade, fontSize: 9, margin: [0, 2, 0, 2], alignment: 'center' },
            { text: (UtilService.formatCurrency(item.valor)), fontSize: 9, margin: [0, 2, 0, 2], alignment: 'right' },
            { text: (UtilService.formatCurrency(item.quantidade * item.valor)), fontSize: 9, margin: [0, 2, 0, 2], alignment: 'right' },
            { text: `"${image64().then(x=> x.toString())}`, fontSize: 9, margin: [0, 2, 0, 2], alignment:'right' },
        ]

    })

    const details = [
        [{ text: ` \n\n Data do processamento do pedido: ` + UtilService.formatLongDate(pedido.pedido[0].createAt) + '\n', fontSize: 9, margin:[25,0] }],
        [{ text: `Forma de pagamento: ` + UtilService.tipoPagamento(pedido.pedido[0].tiposPagamentos) + '\n', fontSize: 9, margin:[25,0] }],
        [{ text: `Status do pedido: ` + UtilService.statusPedido(pedido.pedido[0].statusPedidos) + '\n', fontSize: 9, margin:[25,0] }],
        [{ text: `Nome do usuário: ` + pedido.pedido[0].nome + '\n\n\n\n', fontSize: 9, margin:[25,0] }],
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*', '*'],
                body: [
                    [{ text: 'Descrição', style: 'tableHeader', fontSize: 10, bold: true },
                    { text: 'Quantidade', style: 'tableHeader', fontSize: 10, bold: true, alignment: 'center' },
                    { text: 'Valor', style: 'tableHeader', fontSize: 10, bold: true, alignment: 'right' },
                    { text: 'Total', style: 'tableHeader', fontSize: 10, bold: true, alignment: 'right' },
                    { text: 'Foto do produto', style: 'tableHeader', fontSize: 10, bold: true, alignment: 'right' },
                    ],
                    ...dadosPedido,
                ]
            },
            // layout: 'headerLineOnly'
            layout: 'lightHorizontalLines'
        },

        [{ text: '\n\n\n\n Valor Total ' + UtilService.formatCurrency(pedido.itensPedido.reduce((current, previous) => (current + (previous.quantidade * previous.valor)), 0)), style: 'tableHeader', fontSize: 12, alignment: 'right', bold: true }]
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
        pageMargins: [15, 50, 15, 40,], //left top, right, botton
        header: [titulo],
        content: [details],
        footer: rodape
    }
    pdfMake.createPdf(docDefinitions).open()
}

export default PurchaseOrderPdf