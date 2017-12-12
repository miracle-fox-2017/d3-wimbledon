/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const draw = (words) => {
  // Draw your data here...
  var word = words.name.map(function(d,i) {
      return {text: d, size: words.goal[i]};
  });

  d3.layout
    .cloud()
    .size([960, 600])
    .words(word)
    .rotate(function() {
      return ~~(Math.random() * 2) * 90;
    })
    .font("Impact")
    .fontSize(function(d) {
      return d.size;
    })
    .on("end", draw)
    .start();

  function draw(words) {
    d3.select("body").append("svg")
      .attr("width", 960)
      .attr("height", 600)
      .append("g")
      .attr("transform", "translate(400,300)")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) {
        return d.size + "px";
      })
      .style("font-family", "Impact")
      .style("fill", function(d, i) {
        return fill(i);
      })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) {
        return d.text;
      });
  }
}


const load = () => {
  // Load your data here...
  d3.tsv("stats.tsv", function(data) {
    // use data here
    let name = data.map(d => d.Name)
    let goal = data.map(d => (+d.G * 2))
    let result = {
      name: name,
      goal: goal
    }
    draw(result)
  })
}

load()
