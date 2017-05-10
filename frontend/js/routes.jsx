import React from 'react';
import { Route, IndexRoute, Router } from 'react-router';
import { browserHistory } from 'react-router';
import GalleryList from './components/GalleryList.jsx';
import Home from './components/Home.jsx';
import Map from './components/Map.jsx';
import App from './components/App.jsx';
import UploadPage from './components/UploadPage.jsx';

const routes = (
    <Router history={browserHistory}> 
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="galleries" component={GalleryList} /> 
        <Route path="map" component={Map} />
        <Route path="upload" component={UploadPage} />
    </Route>
    </Router>
)

export default routes
        
