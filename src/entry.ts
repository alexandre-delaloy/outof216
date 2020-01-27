import Chart from 'chart.js';
declare const particlesJS: any;

import { loadFirebaseData, typeWrite, handleCookies } from './utils';

setTimeout(typeWrite, 250);

loadFirebaseData();

handleCookies();

particlesJS.load('particles-js', 'particles.json', null);

Chart.defaults.global.animation.duration = 1500;
