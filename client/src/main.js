import { createApp } from 'vue';  // Import createApp function
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vueAxios from 'vue-axios';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faArrowLeft, faSearch, faBookmark, faShare, faClock, faCheck, faUserCircle, faTrash, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faArrowRight, faArrowLeft, faSearch, faBookmark, faShare, faClock, faCheck, faUserCircle, faTrash, faBars, faTimes);

const app = createApp(App);  // Use createApp to create the app instance

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(vueAxios, axios);
app.use(router);
app.use(store);

app.config.productionTip = false;

app.mount('#app');
