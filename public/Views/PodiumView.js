"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chart_js_1 = __importDefault(require("chart.js"));
var PodiumView = /** @class */ (function () {
    function PodiumView() {
        this.chart = null;
    }
    PodiumView.prototype.display = function (users) {
        var ctx = document.getElementById('podiumChart');
        this.chart = new chart_js_1.default(ctx, {
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
        for (var i = 0; i < 10; i++) {
            this.chart.data.labels[i] = "#" + (i + 1) + " - " + users[i].name;
            this.chart.data.datasets[0].data[i] = 60;
        }
        this.chart.canvas.parentNode.style.width = '300px';
        this.chart.canvas.parentNode.style.height = '300px';
        // this.toggle(users);
    };
    PodiumView.prototype.update = function (users) {
        for (var i = 0; i < 10; i++) {
            this.chart.data.datasets[0].data[i] = users[i].WPM;
        }
        this.chart.update();
    };
    PodiumView.prototype.toggle = function (users) {
        var _this = this;
        var toggle = true;
        document.querySelector('#app').addEventListener('click', function () {
            toggle = !toggle;
            for (var i = 0; i < 10; i++) {
                var DATASET = _this.chart.data.datasets[0];
                if (toggle) {
                    DATASET.backgroundColor = '#20c7ab50',
                        DATASET.borderColor = '#20c7ab';
                    DATASET.label = 'WPM';
                    DATASET.data[i] = users[i].WPM;
                }
                else {
                    DATASET.backgroundColor = '#a883ff50';
                    DATASET.borderColor = '#a883ff';
                    DATASET.label = 'ACC';
                    DATASET.data[i] = Math.floor(users[i].words.ratio * 100);
                }
            }
            _this.chart.update();
        });
    };
    return PodiumView;
}());
exports.default = PodiumView;
//# sourceMappingURL=PodiumView.js.map