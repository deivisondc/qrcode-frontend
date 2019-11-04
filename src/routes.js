import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import QRCodePage from './QRCodePage'
import Camera from './CameraPage'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={QRCodePage}/>
        <Route path="/camera" component={Camera}/>
      </Switch>
    </BrowserRouter>
  )
}