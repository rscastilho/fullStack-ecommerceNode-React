import React from 'react'
import { CSVLink } from 'react-csv'

const headers = [
    { id: 'titulo' }
]
const data = [
    { id: 'conteudo' }
]
const PurchaseOrderCsv = ({pedido}) => {

       return (
        <CSVLink filename={'pedido.csv'} data={data} headers={headers} onClick={()=> console.log(pedido)}> download </CSVLink>
        // <CSVDownload data={data} target="_blank"></CSVDownload>
    )
}

export default PurchaseOrderCsv