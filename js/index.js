$(document).ready(function() {
    $("div.box-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.box-tab>div.box-tab-content").removeClass("active");
        $("div.box-tab>div.box-tab-content").eq(index).addClass("active");
    });

    var app = new Vue({
        el: '#app',
        data: {
            input: '',
            options: {
                animation: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: -1,
                            max: 1,
                            fixedStepSize: 1,
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                    }]
                },
                responsive: false,
                legend: { display: false },
            }
        },
        methods: {
            generate: function() {
                /* Converted the Input String to Integer Array */
                var data = this.input.split(',').map(function(item) {
                    return parseInt(item, 10);
                });
                data.push(0);

                /* this is for RZ Chart */
                this.makeChart('rz', data);

                /* this is for NRZ-L Chart */
                for (var i = 0; i < data.length - 1; i++) {
                    data[i] = (data[i] == 0) ? -1 : 1;
                }
                this.makeChart('nrz-l', data);

                /* this is for NRZ-I Chart */
                var temp = new Array(data.length);
                temp[0] = 1;
                for (var i = 0; i < data.length - 1; i++) {
                    temp[i + 1] = (data[i] == 1) ? temp[i] * -1 : temp[i];
                }
                temp[i + 1] = 0;
                this.makeChart('nrz-i', temp);
            },

            makeChart: function(id, data) {
                var labels = data.map(String);
                new Chart($(`#${id}`), {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            steppedLine: true,
                        }]
                    },
                    options: this.options,
                });
            },
        }
    });

});