import Chart from 'chart.js';
import { ChartOptions } from 'chart.js';
import { IUser } from '../types';

export default class ChartsView {
    private wpmChart: Chart;
    private ratioChart: Chart;
    private lpsChart: Chart;
    constructor() {
        this.ratioChart = null;
        this.wpmChart = null;
        this.lpsChart = null;
    }
    private display(user: IUser, recordOfWpm: number) {
        const ctxs: any = {
            wpm: document.getElementById('wpmChart'),
            ratio: document.getElementById('ratioChart'),
            lps: document.getElementById('lpsChart'),
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
            lps: ChartOptions;
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
            lps: {
                title: {
                    display: true,
                    text: 'LPS',
                },
                legend: {
                   display: false,
                },
                responsive: true,
                // scales: {
                //     xAxes: [{
                //         stacked: true,
                //         gridLines: {
                //             color: '#222',
                //         },
                //     }],
                //     yAxes: [{
                //         stacked: true,
                //         gridLines: {
                //             color: '#222',
                //         },
                //     }],
                // },
            },
        };
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
        this.lpsChart = new Chart(ctxs.lps, {
            type: 'line',
            data: {
                labels: [
                    '10s',
                    '20s',
                    '30s',
                    '40s',
                    '50s',
                    '60s',
                ],
                datasets: [{
                    data: [
                       0, 0, 0, 0, 0, 0
                    ],
                    backgroundColor: '#20c7ab50',
                    borderColor: '#20c7ab',
                    borderWidth: 1,
                }],
            },
            options: chartOptions.lps,
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
    private lpsUpdate(user: IUser) {
        this.lpsChart.data.datasets[0].data = user.LPS.all;
        this.lpsChart.update();
    }
}
