/* global d3 */

// Our canvas
const width = 750, height = 300, margin = 20, marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('./afcw-results.tsv',(rows)=>{
    redraw(rows);
  });
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const scores=data.map((score)=>{
    return parseInt(score.GoalsScored)
  });
  const xScale=d3.scaleLinear().domain([0,scores.length]).range([0,width]);
  const yScale=d3.scaleLinear().domain([d3.min(scores),d3.max(scores)]).range([0,300]);
  const yScaleReverse=d3.scaleLinear().domain([d3.max(scores),d3.min(scores)]).range([0,300]);
  const colorScale=d3.scaleLinear().domain([d3.min(scores),d3.max(scores)]).range(['red','blue']);
  const axis=d3.axisLeft(yScale());
  svg.style('padding-left', '30px')
    .style('padding-bottom','30px')
    .style('padding-top','10px')
    .selectAll('rect')
    .data(scores)
    .enter()
    .append('rect')
    .attr('width','10px')
    .attr('height',function(score){
      return 0
      // return yScale(score)
    })
    .attr('x',function(score,i){
      return i * 12
    })
    .attr('y',function(score,i){
      return height - yScale(score)
    })
    .attr('fill',colorScale)
    .transition()
    .duration(2000)
    .attr('height',function(score){
      return yScale(score)
    })
  svg.append('g')
    .call(d3.axisLeft(yScaleReverse))
    .append('g')
    .call(d3.axisBottom(xScale))
    .attr('transform','translate(0,300)');
}

reload()
