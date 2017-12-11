/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])


const color = d3.scaleLinear()
  .domain([0,1,2,3,4,5,6,10,15,20,100])
  .range([
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
  ]);

const draw = (words) => {
  d3.layout.cloud().size([850, 350])
    .words(words)
    .rotate(0)
    .fontSize(function(d) {
      return d.size
    })
    .on("end", setCloud)
    .start()

  function setCloud(setWords) {
    d3.select('#top-score')
      .append('svg')
        .attr('width', 850)
        .attr('height', 350)
        .attr('class', 'WordCloud')
      .append('g')
        .attr('transform', 'translate(420, 200)')
      .selectAll('text')
      .data(setWords)
      .enter()
      .append('text')
        .style('font-size', function(d) {
          return d.size + "px"
        })
        .style('fill', function(d, index) {
          return color(index)
        })
      .transition()
        .duration(3600)
        .ease(d3.easeBounce)
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill-opacity", 1)
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .text(function(d) {
          return d.text
        })
      
  }
}


const load = () => {
  // Load your data here...
  d3.tsv("stats.tsv", function(error, data) {
    let allData = []
    data.map(newData => {
      let object = {
        text: newData.Name,
        size: newData.G * 2
      }
      allData.push(object)
    })
    draw(allData)
  })
}

load()
