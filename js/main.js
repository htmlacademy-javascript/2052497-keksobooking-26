import {createElements} from './create-elements.js';
import { generateCards } from './create-cards.js';
import {changeFormStatus} from './form.js';
changeFormStatus(false);
generateCards(createElements());
