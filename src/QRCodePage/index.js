import React, { useState, useEffect, useMemo } from 'react';
import QRCode from 'qrcode.react';
import socketio from 'socket.io-client';
import Modal from 'react-modal';

import './styles.css';

function QRCodePage() {
  const [thumbnail, setThumbnail] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const apiUrl = 'http://192.168.0.7:3333'
  const baseUrl = 'http://192.168.0.7:3000'
  // const apiUrl = 'http://10.254.253.239:3333'
  // const baseUrl = 'http://10.254.253.239:3000'

  const preview = useMemo(() => {
    if (thumbnail && typeof thumbnail === 'string') {
      return thumbnail ? `${apiUrl}/files/${thumbnail}` : null
    }
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  const socket = useMemo(() => socketio(apiUrl, {
    query: { userId: 1 }
  }), [])
  
  useEffect(() => {
    socket.on('updatePicture', data => {
      console.log(data)
      setThumbnail(data)
    })
  }, [socket])

  function handleShowQRCode(event) {
    event.preventDefault()
    setShowQRCode(!showQRCode)
  }

  function handleCancelUpload(event) {
    event.preventDefault();
    setThumbnail(null)
  }

  let QRCodeBlock = '';
  if (showQRCode) {
    QRCodeBlock = (<QRCode value={`${baseUrl}/camera`} />)
  }

  const closeModal = () => {
    setShowQRCode(false)
  }

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding: '50px'
    }
  };

  Modal.setAppElement('#root')

  return (
    <div>
      <form className="qrForm">
        <label>Nome</label>
        <input type="text" />
        <label>Email</label>
        <input type="text" />
        <label>Foto</label>
        <div className="thumbnail-container">
          <label
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail' : ''}
          >
            <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
          </label>
          <button onClick={handleShowQRCode} />
        </div>

        <hr />

        <div className="action-container">
          <button className="confirm" onClick={event => event.preventDefault()}>Confirmar</button>
          <button className="cancel" onClick={handleCancelUpload}>Cancelar</button>
        </div>
      </form>

      <Modal
        isOpen={showQRCode}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {QRCodeBlock}
      </Modal>
    </div>
  )
}

export default QRCodePage