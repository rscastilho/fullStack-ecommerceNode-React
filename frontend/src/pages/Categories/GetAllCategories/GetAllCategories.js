import React, { useMemo, useState } from 'react';
import Title from './../../../components/Title/PageTitle';
import { getAllCategories } from '../../../api/CategoryApi';
import Loading from '../../../components/Loading/Loading';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinFill } from 'react-icons/ri';

const GetAllCategories = () => {
  const [data, setData] = useState([]);
  const [registros, setRegistros] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAll = async () => {
    try {
      const result = await getAllCategories();
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
          <Title title={'Categorias dos produtos'} subtitle={'Categoria definida para cada produto'} />
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>Descrição</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((item, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'left' }}>{item.Descricao}</td>
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
          <span>{registros} categorias cadastradas</span>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};

export default GetAllCategories;
