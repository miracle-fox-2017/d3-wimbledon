/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

var color = d3.scaleLinear()
  .domain([0, 100])
    .range(['purple', 'crimson', 'teal', 'blue', 'wheat'])


function draw(words) {
  d3.select("#top-score").append("svg")
    .attr("width", 850)
    .attr("height", 350)
    .attr("class", "wordcloud")
    .append("g")
    .attr("transform", "translate(320,200)")
    .selectAll("Name")
    .data(words)
    .enter().append("text")
    .style("font-size", function (d) { return +d.size  + "px"; })
    .style("fill", function (d, i) { return color(i); })
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + Math.floor(Math.random() * 30) + 1  + ")";
    })
    .text(function (d) { return d.Name; });
}


const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', (rows) => {
    // draw(rows)

    var allPlayer = rows

    allPlayer.map(item => {
      item.size = +item.G * 3
    })
   
    d3.layout.cloud().size([800, 300])
      .words(allPlayer)
      .rotate(function() {
        return (~~(Math.random() * 6) - 3) * 30;
      })
      .fontSize(function (d) { return d.size; })
      .on("end", draw)
      .start();
  })
}

load()
