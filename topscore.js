/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

var color = d3.scaleLinear()
  .domain([0,1,2,3,4,5,6,10,15,20,100])
  .range(["red", "blue", "teal", "orange", "green", "steelblue", "maroon", "pink", "violet", "#94b8b8", "#cce6ff", "#ffff99"]);
  
const draw = (words) => {
  d3.select("#top-score").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "wordcloud")
  .append("g")
  // without the transform, words words would get cutoff to the left and top, they would
  // appear outside of the SVG area
  .attr("transform", "translate(320, 150)")
  .selectAll("text")
  .data(words)
  .enter().append("text")
  .style("font-size", function(d) { return d.size + "px"; })
  .style("fill", function(d, i) { return color(i); })
  .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  })
  .text(function(d) { return d.text; });
}


const load = () => {
  // Load your data here...
  d3.tsv("stats.tsv", function(data) {
    let top = data.map(d => {return {text: d.Name, size: d.G}})
    d3.layout.cloud().size([width+100, height+100])
    .words(top)
    .rotate(0)
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();
  })
}

load()
