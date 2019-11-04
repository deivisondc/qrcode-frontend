import React, { useState, useMemo } from 'react';
import axios from 'axios'
// import Camera from 'react-html5-camera-photo';

import './styles.css';

function CameraPage() {
  const [thumbnail, setThumbnail] = useState(null)

  const apiUrl = 'http://192.168.0.7:3333'
  // const apiUrl = 'http://10.254.253.239:3333'

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : ''
  }, [thumbnail])

  function handleChangeFile(event) {
    event.preventDefault()
    setThumbnail(event.target.files[0])
  }

  function handleCancelUpload(event) {
    event.preventDefault();
    setThumbnail(null)
  }

  async function handleConfirmUpload(event) {
    event.preventDefault();
    const data = new FormData();

    data.append('thumbnail', thumbnail);
    
    await axios.post(`${apiUrl}/upload`, data)
  }

  return (
    <div className="container">
        <label
          id="thumbnail" 
          style={{ backgroundImage: `url(${preview})`}}
          className={thumbnail ? 'has-thumbnail' : ''}
        >
          {thumbnail ? '' : 'Clique para selecionar uma foto da galeria ou tirar uma foto com a câmera'}
          <input type="file" onChange={handleChangeFile} />
        </label>

        <div className="action-container">
          <button className="confirm" onClick={handleConfirmUpload}>Confirmar</button>
          <button className="cancel" onClick={handleCancelUpload}>Cancelar</button>
        </div>
    </div>
  )
}

export default CameraPage