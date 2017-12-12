
let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const color = d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["blue", "green", "red", "pink", "yellow", "cyan", "orange", "lime", "grey", "purple", "gold", "black"]);

function cloudRotate() {
  return (~~(Math.random() * 2)) * 90;
}

const draw = (words) => {
  d3.layout.cloud().size([800, 300])
          .words(words)
          .rotate(function () {
            return cloudRotate()
          })
          .fontSize(function(d) { return d.size })
          .on("end", Word)
          .start()

   function Word(setWords) {
     d3.select('#top-score')
       .append('svg')
       .attr('width', 825)
       .attr('height', 350)
       .attr('class', 'WordCloud')
       .append('g')
       .attr('transform', 'translate(320, 200)')
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
  let dataset = d3.tsv('stats.tsv', function(rows) {
    let arr = []
    rows.forEach((row) => {
      obj = {
        text: row.Name,
        size: row.G*2
      }
      arr.push(obj)
    })
    draw(arr)
  })
}

load()
