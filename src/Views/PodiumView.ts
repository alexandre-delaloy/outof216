import { IUser } from '../types';
import Chart from 'chart.js';

export default class PodiumView {
    public chart: any;
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(users: IUser[]) {
        this.entryNode.innerHTML = `
            <strong>Scoreboard: </strong>
            ${users.map((user: IUser, i: number) => {
                while (i < 10) {
                    return `<li>
                        ${i + 1}.
                        ${user.name} -
                        ${user.WPM} WPM -
                        Acc: ${Math.floor(user.words.ratio * 100)}%
                    </li>`;
                }
            }).join('')}
        `;
    }
    private setPodium(users: IUser[]) {
        const ctx: any = document.getElementById('podiumChart');
        this.chart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: [
                    `#1 - ${users[0].name}`,
                    `#2 - ${users[1].name}`,
                    `#3 - ${users[2].name}`,
                    `#4 - ${users[3].name}`,
                    `#5 - ${users[4].name}`,
                    `#6 - ${users[5].name}`,
                    `#7 - ${users[6].name}`,
                    `#8 - ${users[7].name}`,
                    `#9 - ${users[8].name}`,
                    `#10 - ${users[9].name}`,
                ],
                datasets: [
                    {
                        label: 'WPM',
                        data: [
                            users[0].WPM,
                            users[1].WPM,
                            users[2].WPM,
                            users[3].WPM,
                            users[4].WPM,
                            users[5].WPM,
                            users[6].WPM,
                            users[7].WPM,
                            users[8].WPM,
                            users[9].WPM,
                        ],
                        backgroundColor: [
                            '#20c7ab50',
                            '#20c7ab50',
                            '#20c7ab50',
                            '#20c7ab50',
                            '#20c7ab50',
                            '#20c7ab50',
                            '#20c7ab50',
                            '#20c7ab50',
                            '#20c7ab50',
                            '#20c7ab50',
                        ],
                        borderColor: [
                            '#20c7ab',
                            '#20c7ab',
                            '#20c7ab',
                            '#20c7ab',
                            '#20c7ab',
                            '#20c7ab',
                            '#20c7ab',
                            '#20c7ab',
                            '#20c7ab',
                            '#20c7ab',
                        ],
                        borderWidth: 1,
                        barPercentage: 0.9,
                    },
                    // {
                    //     label: 'Acc',
                    //     data: [
                    //         Math.floor(users[0].words.ratio * 100),
                    //         Math.floor(users[1].words.ratio * 100),
                    //         Math.floor(users[2].words.ratio * 100),
                    //         Math.floor(users[3].words.ratio * 100),
                    //         Math.floor(users[4].words.ratio * 100),
                    //     ],
                    //     backgroundColor: [
                    //         '#b370ff50',
                    //         '#b370ff50',
                    //         '#b370ff50',
                    //         '#b370ff50',
                    //         '#b370ff50',
                    //     ],
                    //     borderColor: [
                    //         '#b370ff',
                    //         '#b370ff',
                    //         '#b370ff',
                    //         '#b370ff',
                    //         '#b370ff',
                    //     ],
                    //     borderWidth: 1,
                    //     barPercentage: 0.2,
                    // },
                ],
            },
            options: {
                // maintainAspectRatio: false,
                responsive: true,
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                        },
                        gridLines: {
                            // display: false ,
                            color: '#191919',
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            // display: false ,
                            color: '#191919',
                        },
                    }],
                },
                legend: {
                    position: 'bottom',
                },
            },
        });
        this.chart.canvas.parentNode.style.width = '300px';
        // ctx.height = 200
        this.chart.canvas.parentNode.style.height = '200px';
        users.forEach((user, i) => {
            // if (user.words.ratio === 1) {
            //     this.chart.data.datasets[1].backgroundColor[i] = '#fffb0050';
            //     this.chart.data.datasets[1].borderColor[i] = '#fffb00';
            //     this.chart.update();
            // }
        });
    }
}
