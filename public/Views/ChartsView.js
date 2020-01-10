"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chart_js_1 = __importDefault(require("chart.js"));
var ChartsView = /** @class */ (function () {
    function ChartsView() {
        this.ratioChart = null;
        this.wpmChart = null;
    }
    ChartsView.prototype.display = function (user, recordOfWpm) {
        var ctxs = {
            ratio: document.getElementById('ratioChart'),
            wpm: document.getElementById('wpmChart'),
        };
        var chartStyle = {
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
        var chartOptions = {
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
        this.ratioChart = new chart_js_1.default(ctxs.ratio, {
            type: 'doughnut',
            data: {
                labels: [
                    'validated',
                    'skipped',
                ],
                datasets: [__assign({ data: [
                            50,
                            50,
                        ] }, chartStyle)],
            },
            options: chartOptions.ratio,
        });
        this.wpmChart = new chart_js_1.default(ctxs.wpm, {
            type: 'bar',
            data: {
                labels: [
                    'current',
                    'record',
                ],
                datasets: [__assign({ data: [
                            recordOfWpm + recordOfWpm / 2,
                            recordOfWpm + recordOfWpm / 2,
                        ] }, chartStyle)],
            },
            options: chartOptions.wpm,
        });
    };
    ChartsView.prototype.update = function (user, recordOfWpm) {
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
    };
    return ChartsView;
}());
exports.default = ChartsView;
//# sourceMappingURL=ChartsView.js.map