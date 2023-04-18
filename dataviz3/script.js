d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})
d3.dsv(';','limpieza_y_recoleccion_filtrado.csv', d3.autoType).then(data => {
  console.log(data)
  let chart_def_3 = Plot.plot({
    x: {
      tickFormat: d3.timeFormat('%H'),
    },
    y: {
      grid: true,
      label: 'Cantidad de reclamos',
      domain: [0,350]
    },
    marks: [
      Plot.areaY(
        data,
        Plot.binX(
          { y: 'count'},
          { x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso), thresholds: d3.timeHour, fill:'darkcyan'}
        ),
        Plot.selectMaxY({x:"hora_ingreso", y:'count'})
      ),
    ]
  });

  d3.select('#chart_def_3').append(() => chart_def_3);
});
