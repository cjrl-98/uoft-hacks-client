import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from './firebase/AuthContext';
import {ClothingCollectionProvider} from './store/store';


ReactDOM.render(<AuthProvider><ClothingCollectionProvider><App/></ClothingCollectionProvider></AuthProvider>, document.getElementById('root'));
