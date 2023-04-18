d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(';','limpieza_y_recoleccion_filtrado.csv', d3.autoType).then(data => {
  console.log(data.length)
  let chart_3 = 
  Plot.plot({
    marginBottom: 100,
    x: {
        
        ticks: 7,
        label: 'Dia',
        tickFormat: d => d3.timeFormat('%a %d')(d).toUpperCase(),
    },
    y: {
      grid: true,
      label: 'Cantidad de reclamos',
      tickFormat: 'd',
    },
    //inset: 10,
    marks: [
      //framed ? Plot.frame() : [],
      Plot.rectY( data, Plot.binX({y: 'count'}, {x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), thresholds: d3.timeDay, fill:'' })),
    ],
  })
  d3.select('#chart_3').append(() => chart_3)
})

