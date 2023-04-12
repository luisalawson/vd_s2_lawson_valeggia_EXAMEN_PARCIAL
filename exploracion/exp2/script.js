d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})
d3.csv('autos_2.csv', d3.autoType).then(data => {
  console.log(data)
  let chart_2 = Plot.plot({
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

  d3.select('#chart_2').append(() => chart_2);
});
