d3.csv('limpieza_filtrado.csv', d3.autoType).then(data => {
  // Filtrar por domicilio
  const domiciliosFiltrados = ['PALERMO', 'CABALLITO', 'VILLA URQUIZA', 'FLORES'];
  const dataFiltrada = data.filter(d => domiciliosFiltrados.includes(d.domicilio_barrio));

  let chart_8 = Plot.plot({
    y: {
      grid: true
    },
    color: {
      legend: true
    },
    marks: [
      Plot.areaY(dataFiltrada, Plot.stackY(Plot.binX({y: "count"}, {x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso), thresholds: d3.timeHour, fill: "domicilio_barrio"}))),
    ]
  })
  d3.select('#chart_8').append(() => chart_8);

  // Agregar desplegable
  d3.select('#barrio_select').on('change', actualizarGrafico);

  function actualizarGrafico() {
    const barrioSeleccionado = d3.select('#barrio_select').property('value');
    let dataFiltrada;
      dataFiltrada = data.filter(d => d.domicilio_barrio === barrioSeleccionado);
    chart_8.setData({
      marks: [
        Plot.areaY(dataFiltrada, Plot.stackY(Plot.binX({y: "count"}, {x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso), thresholds: d3.timeHour, fill: "domicilio_barrio"}))),
      ]
    });
  }
});

