function addAxesAndLegend (svg, xAxis, yAxis, margin, chartWidth, chartHeight, params) {

  var legendWidth  = 0,
      legendHeight = 0;

  // clipping to make sure nothing appears behind legend
  svg.append('clipPath')
    .attr('id', 'axes-clip')
    .append('polygon')
      .attr('points', (-margin.left)                 + ',' + (-margin.top)                 + ' ' +
                      (chartWidth - legendWidth - 1) + ',' + (-margin.top)                 + ' ' +
                      (chartWidth - legendWidth - 1) + ',' + legendHeight                  + ' ' +
                      (chartWidth + margin.right)    + ',' + legendHeight                  + ' ' +
                      (chartWidth + margin.right)    + ',' + (chartHeight + margin.bottom) + ' ' +
                      (-margin.left)                 + ',' + (chartHeight + margin.bottom));

  var axes = svg.append('g')
    .attr('clip-path', 'url(#axes-clip)');

  axes.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(xAxis);

  axes.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(params);

  // var legend = svg.append('g')
  //   .attr('class', 'legend')
  //   .attr('transform', 'translate(' + (chartWidth - legendWidth) + ', 0)');

  // legend.append('rect')
  //   .attr('class', 'legend-bg')
  //   .attr('width',  legendWidth)
  //   .attr('height', legendHeight);

  // legend.append('rect')
  //   .attr('class', 'outer')
  //   .attr('width',  75)
  //   .attr('height', 20)
  //   .attr('x', 10)
  //   .attr('y', 10);

  // legend.append('text')
  //   .attr('x', 115)
  //   .attr('y', 25)
  //   .text('5% - 95%');

  // legend.append('rect')
  //   .attr('class', 'inner')
  //   .attr('width',  75)
  //   .attr('height', 20)
  //   .attr('x', 10)
  //   .attr('y', 40);

  // legend.append('text')
  //   .attr('x', 115)
  //   .attr('y', 55)
  //   .text('25% - 75%');

  // legend.append('path')
  //   .attr('class', 'median-line')
  //   .attr('d', 'M10,80L85,80');

  // legend.append('text')
  //   .attr('x', 115)
  //   .attr('y', 85)
  //   .text('Median');
}

function drawPaths (svg, data, x, y) {
  // var upperOuterArea = d3.svg.area()
  //   .interpolate('basis')
  //   .x (function (d) { return x(d.date) || 1; })
  //   .y0(function (d) { return y(d.pct95); })
  //   .y1(function (d) { return y(d.pct75); });

  // var upperInnerArea = d3.svg.area()
  //   .interpolate('basis')
  //   .x (function (d) { return x(d.date) || 1; })
  //   .y0(function (d) { return y(d.pct75); })
  //   .y1(function (d) { return y(d.data1); });

  var medianLine = d3.svg.line()
    .interpolate('basis')
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.data1); });
  
  var medianLine1 = d3.svg.line()
    .interpolate('basis')
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.data2); });

  // var lowerInnerArea = d3.svg.area()
  //   .interpolate('basis')
  //   .x (function (d) { return x(d.date) || 1; })
  //   .y0(function (d) { return y(d.data1); })
  //   .y1(function (d) { return y(d.pct25); });

  // var lowerOuterArea = d3.svg.area()
  //   .interpolate('basis')
  //   .x (function (d) { return x(d.date) || 1; })
  //   .y0(function (d) { return y(d.pct25); })
  //   .y1(function (d) { return y(d.pct05); });

  svg.datum(data);

  // svg.append('path')
  //   .attr('class', 'area upper outer')
  //   .attr('d', upperOuterArea)
  //   .attr('clip-path', 'url(#rect-clip)');

  // svg.append('path')
  //   .attr('class', 'area lower outer')
  //   .attr('d', lowerOuterArea)
  //   .attr('clip-path', 'url(#rect-clip)');

  // svg.append('path')
  //   .attr('class', 'area upper inner')
  //   .attr('d', upperInnerArea)
  //   .attr('clip-path', 'url(#rect-clip)');

  // svg.append('path')
  //   .attr('class', 'area lower inner')
  //   .attr('d', lowerInnerArea)
  //   .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'median-line')
    .attr('d', medianLine)
    .attr('id' , 'median')
    .attr('clip-path', 'url(#rect-clip)');
  
  svg.append('path')
    .attr('class', 'median-line')
    .attr('d', medianLine1)
    .attr('id' , 'median')
    .attr('clip-path', 'url(#rect-clip)');
}

function addMarker (marker, svg, chartHeight, x) {
  var radius = 32,
      xPos = x(marker.date) - radius - 3,
      yPosStart = chartHeight - radius - 3,
      yPosEnd = (marker.type === 'Client' ? 80 : 160) + radius - 3;

  var markerG = svg.append('g')
    .attr('class', 'marker '+marker.type.toLowerCase())
    .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
    .attr('opacity', 0);

  markerG.transition()
    .duration(1000)
    .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
    .attr('opacity', 1);

  markerG.append('path')
    .attr('d', 'M' + radius + ',' + (chartHeight-yPosStart) + 'L' + radius + ',' + (chartHeight-yPosStart))
    .transition()
      .duration(1000)
      .attr('d', 'M' + radius + ',' + (chartHeight-yPosEnd) + 'L' + radius + ',' + (radius*2));

  markerG.append('circle')
    .attr('class', 'marker-bg')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', radius);

  markerG.append('text')
    .attr('x', radius)
    .attr('y', radius*0.9)
    .text(marker.text);

  markerG.append('text')
    .attr('x', radius)
    .attr('y', radius*1.5)
    .text(marker.version);
}

function startTransitions (svg, chartWidth, chartHeight, rectClip, markers, x) {
  rectClip.transition()
    .duration(1000*markers.length)
    .attr('width', chartWidth);

  markers.forEach(function (marker, i) {
    setTimeout(function () {
      addMarker(marker, svg, chartHeight, x);
    }, 1000 + 500*i);
  });
}

// function changestrokewidth(){
//   document.getElementsByClassName('median').style.stroke-width=3;
//   console.log('change')
//   // size = elems.length;
//   // for(i=0 ; i<size ; i++){
//   //   elems[i].style.stroke-width = 3;
//   //   console.log('change1');
//   // }
// }

function makeChart (data, markers, target, params) {
  var svgWidth  = 640,
      svgHeight = 350,
      margin = { top: 20, right: 20, bottom: 40, left: 40 },
      chartWidth  = svgWidth  - margin.left - margin.right,
      chartHeight = svgHeight - margin.top  - margin.bottom;

  var x = d3.time.scale().range([0, chartWidth])
            .domain(d3.extent(data, function (d) { return d.date; })),
      y = d3.scale.linear().range([chartHeight, 0])
            .domain([0, d3.max(data, function (d) { return d.data1; })+5]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom')
                .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
      yAxis = d3.svg.axis().scale(y).orient('left')
                .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

  var svg = d3.select(target).append('svg')
    .attr('width',  svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // clipping to start chart hidden and slide it in later
  var rectClip = svg.append('clipPath')
    .attr('id', 'rect-clip')
    .append('rect')
    .attr('width', 0)
    .attr('height', chartHeight);

  addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight, params);
  drawPaths(svg, data, x, y);
  if(markers != null){
    startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x);
  }
  
  // changestrokewidth();
}

function line_chart(json, target, params){


  var parseDate  = d3.time.format('%Y-%m-%d %H:%M:%S').parse;

  var data = json.data.map(function (d) {
    return {
      date:  parseDate(d.date),
      data1: d.data1,
      data2: d.data2
    };
  });



  if(json.marker != null){
    var markers = json.marker.map(function (marker) {
      // console.log(marker);
      return {
        date: parseDate(marker.date),
        type: marker.type,
        version: marker.version
      };
    });
  }

    

    makeChart(data, markers, target, params);

}

