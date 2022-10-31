import React, { useCallback, useEffect, useState, useContext, useRef } from 'react';
import styles from './UserDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import { GetById, UpdateAvatar } from '../../../api/UserApi';
import webApi from './../../../api/webApi';
import { UtilService } from '../../../utils/UtilService';
import imgError from './../../../Assets/Images/imageNotFound.png';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const UserDetails = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [carregaImagem, setCarregaImagem] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [imagemFile, setImagemFile] = useState();
  const { id } = useParams();
  const imageFile = useRef();
  const [imageLoading, setImageLoading] = useState(false);

  const openFiles = () => {
    imageFile.current.click();
  };

  const pegarUserById = useCallback(async () => {
    try {
      const result = await GetById(id);
      if (!result) {
        return;
      }
      setUserData(result);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleCarregaImagem = e => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (e.target.files[0]) {
        const image = e.target.files[0];
        if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg') {
          setCarregaImagem(URL.createObjectURL(e.target.files[0]));
          formData.append('imagemperfil', e.target.files[0]);
          setImagemFile(formData);
          const imagemName = e.target.value;
          const nomeFinal = imagemName.slice(12).trim();
          setImagemUrl(nomeFinal);
        } else {
          alert('Formato de imagem não permitido');
          return;
        }
      }
    } catch (error) {
      return error;
    }
  };

  const updateAvatar = useCallback(async () => {
    try {
      setImageLoading(true);
      const result = await UpdateAvatar(id, imagemFile);
      toast.success(result.message, { autoClose: 1000, position: 'bottom-center' });
      setImageLoading(false);
      return result.message;
    } catch (error) {
      toast.error(error);
      return;
    }
  }, [id, imagemFile]);

  useEffect(() => {
    if (imagemFile) {
      updateAvatar();
    }
  }, [imagemFile, updateAvatar]);

  useEffect(() => {
    if (userData.error) {
      setAuthenticated(false);
      localStorage.clear();
    }
  }, [userData, setAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem('@token');
    webApi.defaults.headers.common['authorization'] = `bearer ${token}`;
    pegarUserById();
  }, [pegarUserById]);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.box}`}></div>
      {userData.length > 0 && authenticated ? (
        userData.map((x, i) => (
          <div key={i}>
            <div className={`${styles.cardPrincipal} card shadow-sm`}>
              <div className={`card-header`}>
                {imageLoading && <p>Salvando imagem...</p>}
                <div className={`card-title text-center`}>
                  <h4>
                    <p>{x.nome.toUpperCase()}</p>
                  </h4>
                </div>
                <div className="card-subtitle">
                  <p>{x.email}</p>
                </div>
              </div>
              <div className={`card-body ${styles.corpo}`}>
                <div className={`${styles.descricao}`}>
                  <p className={`${styles.infos}`}>CPF: {UtilService.cpf(x.cpf)}</p>
                  <p className={`${styles.infos}`}>Ultimo acesso: {UtilService.formatLongDate(x.UltimoAcesso)}</p>
                  <p className={`${styles.infos}`}>Senha expira em: {UtilService.formatLongDate(x.PasswordExpirationDate)}</p>
                </div>
                <div className="avatar">
                  {carregaImagem ? (
                    <>
                      <img className={`${styles.imgAvatar}`} src={`${carregaImagem}`} alt="imagem" onClick={openFiles} />
                    </>
                  ) : (
                    <img
                      src={`http://localhost:5000/imagens/${x.imagemperfil}`}
                      alt={`${x.imagemperfil}`}
                      className={`${styles.imgAvatar} shadow-lg`}
                      onError={e => {
                        e.target.onError = null;
                        e.target.src = imgError;
                      }}
                      onClick={openFiles}
                    ></img>
                  )}
                  <p>
                    <input className={`${styles.imageFile}`} type="file" ref={imageFile} onChange={handleCarregaImagem} />
                  </p>
                </div>
              </div>
              <div className={`card-footer text-center p-4`}>
                <div>
                  <Link to={'/'}>
                    <button className="btn btn-secondary ms-3">Voltar</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={`${styles.erroAutorizacao} alert alert-danger w-75`}>{userData.message}</p>
      )}
    </div>
  );
};

export default UserDetails;
