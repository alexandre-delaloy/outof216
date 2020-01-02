import { loadFirebaseData } from './utils';
import Chart from 'chart.js';

declare var particlesJS: any;

loadFirebaseData();

particlesJS.load('particles-js', 'particles.json', null);

Chart.defaults.global.animation.duration = 1500;
