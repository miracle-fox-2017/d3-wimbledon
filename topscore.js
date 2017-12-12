/* global d3 width height */

const cloud = d3.layout.cloud;
let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 1000])
var color = d3.scaleLinear()
  .domain([0,1,2,3,4,5,6,10,15,20,100])
  .range(["red", "green", "blue", "yellow", "orange", "lime", "grey", "teal", "purple", "pink", "cyan", "black"]);



const draw = (words) => {
  // Draw your data here...
  d3.select("body").append("svg")
  .attr("width", 1000)
  .attr("height", 500)
  .attr("class", "wordcloud")
  .append("g")
  // without the transform, words words would get cutoff to the left and top, they would
  // appear outside of the SVG area
  .attr("transform", "translate(320,200)")
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
  let data = []
  d3.tsv("stats.tsv", function(inputData) {
    inputData.forEach(element => {
      data.push({
        text: element.Name,
        goal: parseInt(element.G)
      })
    })
    d3.layout.cloud().size([1000, 500])
    .words(data)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .fontSize(function(d) { return d.goal; })
    .on("end", draw)
    .start();
  })
}

load()
