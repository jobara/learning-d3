/*
Code used below is based the pie chart example from
https://github.com/square/intro-to-d3

Licensed under Apache 2.0
https://github.com/square/intro-to-d3/blob/master/LICENSE.txt
*/

var learn = learn || {};

(function () {
    "use strict";
    learn.initPieChart = function (container, options) {

        learn.helpers = {
            count: function (d) {return d.count;}
        };

        learn.sales = [
            { product: 'Hoodie',  count: 12 },
            { product: 'Jacket',  count: 7 },
            { product: 'Snuggie', count: 6 },
            { product: 'Pants', count: 40}
        ];

        learn.pie = d3.layout.pie().value(learn.helpers.count);
        learn.slices = learn.pie(learn.sales);

        learn.arc = d3.svg.arc().innerRadius(0).outerRadius(50);
        learn.color = d3.scale.category10();

        learn.svg = d3.select(container);
        learn.group = learn.svg.append("g").attr("transform", "translate(200, 50)");

        learn.group.selectAll("path.slice").data(learn.slices).enter().append("path").attr({
            class: "slice",
            d: learn.arc,
            fill: function (d) {
                return learn.color(d.data.product);
            },
            tabindex: 0,
            "aria-label": function (d) {
                return d.data.product + " - " + d.data.count;
            }
        }).on("focus", function (d) {
            console.log("event:", d3.event);
            console.log(d.data.product + " - " + d.data.count);
        }).on("mouseover", function (d) {
            console.log("event:", d3.event);
            console.log(d.data.product + " - " + d.data.count);
        });

        learn.svg.append("g").attr("class", "legend").selectAll("text").data(learn.slices).enter().append("text").text(function (d) {
            return "* " + d.data.product;
        }).attr("fill", function (d) {
            return learn.color(d.data.product);
        }).attr("y", function (d, i) {
            return 20 * (i + 1);
        });
    };
})();
