import Chart from 'chart.js';
import { ChartOptions } from 'chart.js';
import { IUser } from '../types';

export default class ChartsView {
    private ratioChart: Chart;
    private wpmChart: Chart;
    constructor() {
        this.ratioChart = null;
        this.wpmChart = null;
    }
    private display(user: IUser, recordOfWpm: number) {
        const ctxs: any = {
            ratio: document.getElementById('ratioChart'),
            wpm: document.getElementById('wpmChart'),
        };
        const chartStyle = {
            backgroundColor: [
                '#20c7ab50',
                '#ff9d0050',
            ],
            borderColor: [
                '#20c7ab',
                '#ff9d00',
            ],
            borderWidth: 1,
        };
        interface IChartsOpts {
            ratio: ChartOptions;
            wpm: ChartOptions;
        }
        const chartOptions: IChartsOpts = {
            ratio: {
                title: {
                    display: true,
                    text: 'Ratio',
                },
                legend: {
                    position: 'bottom',
                },
                responsive: true,
                animation: {
                    animateScale: true,
                    animateRotate: true,
                },
            },
            wpm: {
                title: {
                    display: true,
                    text: 'WPM',
                },
                legend: {
                   display: false,
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            color: '#222',
                        },
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            color: '#222',
                        },
                    }],
                },
            },
        };
        this.ratioChart = new Chart(ctxs.ratio, {
            type: 'doughnut',
            data: {
                labels: [
                    'validated',
                    'skipped',
                ],
                datasets: [{
                    data: [
                        50,
                        50,
                    ],
                    ...chartStyle,
                }],
            },
            options: chartOptions.ratio,
        });

        this.wpmChart = new Chart(ctxs.wpm, {
            type: 'bar',
            data: {
                labels: [
                    'current',
                    'record',
                ],
                datasets: [{
                    data: [
                       recordOfWpm + recordOfWpm / 2,
                       recordOfWpm + recordOfWpm / 2,
                    ],
                   ...chartStyle,
                }],
            },
            options: chartOptions.wpm,
        });
    }
    private update(user: IUser, recordOfWpm: number) {
        this.wpmChart.data.datasets[0].data = [
            user.WPM,
            recordOfWpm,
        ];
        this.ratioChart.data.datasets[0].data = [
            user.words.success,
            user.words.fail,
        ];
        this.wpmChart.update();
        this.ratioChart.update();
    }
}
