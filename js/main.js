
import { getData } from './database.js';
import { displayMap, displayMarkers } from './map.js';
import { showAlert } from './functions.js';


displayMap();
getData(displayMarkers, showAlert);

