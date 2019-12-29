import { Chart } from 'chart.js';
import { IUser } from '../types';

export default class ChartsView {
    public ratioChart: any;
    public wpmChart: any;
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
        this.ratioChart = null;
        this.wpmChart = null;
    }
    private display(user: IUser, recordOfWPM: number) {
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
        const chartOptions = {
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
                    label: `Ratio (${Math.floor(user.words.ratio * 100)}%)`,
                    data: [
                        user.words.success,
                        user.words.fail,
                    ],
                    ...chartStyle,
                }],
            },
            options: {
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
        });

        this.wpmChart = new Chart(ctxs.wpm, {
            type: 'bar',
            data: {
                labels: [
                    'current',
                    'record',
                ],
                datasets: [{
                    label: 'Words Per Minute',
                    data: [
                        user.WPM,
                        recordOfWPM,
                    ],
                   ...chartStyle,
                }],
            },
            options: chartOptions.wpm,
        });
    }
    private update(user: IUser) {
        this.wpmChart.data.datasets[0].data = [
            user.WPM,
            52,
        ];
        this.ratioChart.data.datasets[0].data = [
            user.words.success,
            user.words.fail,
        ];
        this.wpmChart.reset();
        this.wpmChart.update();
        this.ratioChart.update();
    }
}
