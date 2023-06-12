import React, { useMemo, useState } from 'react';
import PageTitle from '../../../components/Title/PageTitle';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinFill } from 'react-icons/ri';
import Loading from './../../../components/Loading/Loading';
import { getAllSuppliers } from '../../../api/SupplierApi';
import { UtilService } from './../../../utils/UtilService';

const GetAllSuppliers = () => {
  const [data, setData] = useState([]);
  const [registros, setRegistros] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAll = async () => {
    try {
      const result = await getAllSuppliers();
      setRegistros(result.registros);
      setData(result.data);
      setIsLoading(true);
    } catch (error) {}
  };

  useMemo(() => {
    getAll();
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <PageTitle title={'Fornecedores'} subtitle={`${registros} fornecedores cadastrados`} />
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>CNPJ</th>
                <th>Razão Social</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((item, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'left' }}>{UtilService.cnpj(item.CNPJ)}</td>
                    <td style={{ textAlign: 'left' }}>{item.RazaoSocial}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className={`btn btn-warning btn-sm me-1`}>
                        <TbEdit size={`1.5em`} />
                      </button>
                      <button className={`btn btn-outline-danger btn-sm me-1`}>
                        <RiDeleteBinFill size={`1.5em`} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <span>{registros} fornecedores cadastrados</span>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};

export default GetAllSuppliers;
