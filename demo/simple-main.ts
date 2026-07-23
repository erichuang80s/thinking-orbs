import { createApp } from 'vue';
import App from './SimpleApp.vue';
import './simple.css';

const rootEl = document.getElementById('root');
if (rootEl) createApp(App).mount(rootEl);
