import Chart from 'chart.js';
import { IUser } from '../types';

declare global {
    // tslint:disable-next-line: interface-name
    interface ParentNode {
        style: any;
    }
}

export default class PodiumView {
    private chart: Chart;
    constructor() {
        this.chart = null;
    }
    private display(users: IUser[]) {
        const ctx: any = document.getElementById('podiumChart');
        this.chart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                datasets: [
                    {
                        label: 'WPM',
                        backgroundColor: '#20c7ab50',
                        borderColor: '#20c7ab',
                        borderWidth: 1,
                        barPercentage: 0.9,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                        },
                        gridLines: {
                            color: '#191919',
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#191919',
                        },
                    }],
                },
                legend: {
                    position: 'bottom',
                },
            },
        });

        for (let i = 0; i < 10; i++) {
            this.chart.data.labels[i] = `#${i + 1} - ${users[i].name}`;
            this.chart.data.datasets[0].data[i] = 60;
        }
        this.chart.canvas.parentNode.style.width = '300px';
        this.chart.canvas.parentNode.style.height = '300px';
    }
    private update(users: IUser[]) {
        for (let i = 0; i < 10; i++) {
            this.chart.data.datasets[0].data[i] = users[i].WPM;
        }
        this.chart.update();
    }
}
