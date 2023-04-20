d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  const domiciliosFiltrados = ['PALERMO', 'MATADEROS', 'VILLA PUEYRREDON', 'FLORESTA','CABALLITO','VILLA URQUIZA'];
  dataFiltrada = data.filter(d => domiciliosFiltrados.includes(d.domicilio_barrio));
  
  let chart = Plot.plot({
    width: 600,
    height: 600,
    font: 'Poppins',
    marginLeft: 120,
    marks:[
      Plot.barY(
        dataFiltrada, 
        Plot.groupX(
          {y:"count"},
          {x:'domicilio_barrio',
           fill: d => d.estado_del_contacto === "Cerrado" ? "#225EA8" : "#f5f5f5"      
          }
        )
      ),
    ],
    y:{
      label: ""
    },
    x:{
      label: "",
      ticks: 6,
      tickFormat: d => d.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
    },
  });

  d3.select('#chart_def_3').append(() => chart);

  // Agrega la leyenda
  var legendSvg = d3.select("#chart_def_3")
    .append("svg")
    .attr("class", "legend")
    .attr("width", 200)
    .attr("height", 100);

  var legend = legendSvg.selectAll(".legend")
    .data(["Abierto", "Cerrado"])
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return d === "Cerrado" ? "#225EA8" : "#f5f5f5"; });

  legend.append("text")
      .attr("x", 40)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d; });

});
