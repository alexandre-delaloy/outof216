import Chart from 'chart.js';
declare const particlesJS: any;

import { loadFirebaseData, typeWrite } from './utils';

setTimeout(typeWrite, 500);

loadFirebaseData();

particlesJS.load('particles-js', 'particles.json', null);

Chart.defaults.global.animation.duration = 1500;
