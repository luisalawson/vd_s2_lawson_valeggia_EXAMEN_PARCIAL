d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.csv('autos_2.csv', d3.autoType).then(data => {
  console.log(data.length)
  let chart_3 = 
  Plot.plot({
    marginBottom: 100,
    x: {
        tickRotate: -45,
        ticks: 14,
        tickFormat: d => d3.timeFormat('%a %d')(d).toUpperCase(),
    },
    y: {
      grid: true,
      label: 'Cantidad de reclamos',
      tickFormat: 'd',
    },
    inset: 10,
    marks: [
      framed ? Plot.frame() : [],
      Plot.rectY( data, Plot.binX({y: 'count'}, {x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso), thresholds: d3.timeDay, fill:'yellow', opacity:0.5 })),
      Plot.rectY( data, Plot.binX({y: 'count'}, {x: d => d3.timeParse('%d/%m/%Y')(d.fecha_cierre_contacto), thresholds: d3.timeDay, fill:'red', opacity:0.5 })),
    ],
  })
  d3.select('#chart_3').append(() => chart_3)
})

