import { IUser } from '../types';
import { Chart } from 'chart.js';

const qs = (selector: any): any => document.querySelector(selector);

export default class UserView {
    public chart: any;
    public chart2: any;
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
        this.chart = null;
        this.chart2 = null;
    }
    private setMessage(user: IUser) {
        let message: string;
        if (user.WPM <= 0) {
            message = 'pity..';
        } else if (user.WPM <= 20) {
            message = 'not bad';
        } else if (user.WPM <= 40) {
            message = 'great !';
        } else if (user.WPM <= 60) {
            message = 'unbelievable !!';
        } else if (user.WPM <= 80) {
            message = 'godlike !!!';
        }
        return message;
    }
    private display(
        user: IUser,
        isPopin: boolean,
        progression: any[],
    ) {
        this.entryNode.innerHTML = `
            ${isPopin ? `
                <div id="overlay" class="overlay"></div>
                <div id="content">
                    <h3>${this.setMessage(user)}</h3>
                    <ul>
                        <li>
                            WPM:
                            <span>${user.WPM}</span>
                        </li>
                        <li>
                            <i style="color:#23b923">${user.words.success}</i>
                            &nbsp;/&nbsp;
                            <i style="color:#b92323">${user.words.fail}</i>
                            ( ${Math.floor(user.words.ratio * 100)}% )
                        </li>
                    </ul>
                    <form>
                        <label>
                            Enter your pseudo:
                            <input
                                type="text"
                                placehoder="John Doe"
                                maxLength="12"
                                minLength="2"
                            />
                        </label>
                        <input type="submit" value="Submit score"/>
                    </form>
                    or
                    <a href="">Retry</a>
                </div>
            ` : ''}
        `;
        if (isPopin) {
            setTimeout(() => {
                qs('#popin').className = 'active';
                const input: HTMLInputElement = qs('input[type="text"]');
                input.focus();
            }, 500);
        }
    }
    private destroy() {
        qs('#popin').className = '';
        this.entryNode.innerHTML = '';
        return location.reload();
    }
    private setDoughnut(success: number, fail: number, ratio: number) {
        const ctx: any = document.getElementById('ratioChart');
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'validated',
                    'skipped',
                ],
                datasets: [{
                    label: `Ratio (${Math.floor(ratio * 100)}%)`,
                    data: [
                        success,
                        fail,
                    ],
                    backgroundColor: [
                        '#23b92350',
                        '#b9232350',
                    ],
                    borderColor: [
                        '#23b92350',
                        '#b9232350',
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                },
            },
        });
        this.chart.canvas.parentNode.style.width = '250px';
        this.chart.canvas.parentNode.style.height = '250px';
    }
    private updateDoughnut(success: number, fail: number) {
        this.chart.data.datasets[0].data = [
            success,
            fail,
        ];
        this.chart.update();
    }
    private setChart(WPM: number, recordOfWPM: number) {
        const ctx: any = document.getElementById('wpmChart');
        this.chart2 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'actual',
                    'record',
                ],
                datasets: [{
                    label: 'Words Per Minute',
                    data: [
                        WPM,
                        recordOfWPM,
                    ],
                    backgroundColor: [
                        '#20c7ab50',
                        '#ff9d0050',
                    ],
                    borderColor: [
                        '#20c7ab',
                        '#ff9d00',
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true,
                    }],
                },
            },
        });
        this.chart2.canvas.parentNode.style.width = '250px';
        this.chart2.canvas.parentNode.style.height = '250px';
    }
    private updateChart(WPM: number) {
        this.chart2.data.datasets[0].data = [
            WPM,
            42,
        ];
        this.chart2.reset();
        this.chart2.update();
    }
}
