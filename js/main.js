
import { getData } from './database.js';
import { displayMap } from './map.js';
import { showAlert } from './functions.js';
import {filterAndDisplayData} from './filter-data.js';


displayMap();
getData(filterAndDisplayData, showAlert);

