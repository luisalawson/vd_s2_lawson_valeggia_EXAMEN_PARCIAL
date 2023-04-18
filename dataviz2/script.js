// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'limpieza_y_recoleccion_filtrado.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) 
  console.log('reclamosPorBarrio', reclamosPorBarrio)
  
  let chart_def_2 = Plot.plot({
   
    projection: {
      type: 'mercator',
      domain: barrios, 
    },
    color: {
      scheme: 'greens',
      legend: true
    },
    marks: [
     
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO
          let cantReclamos = reclamosPorBarrio.get(nombreBarrio).length
          return cantReclamos
        },

        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
    ],
    facet: {
      data: data,
      x: d => d3.timeFormat('%a')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
    },
    fx: {
      domain: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
    },
    width: 1000
  })

 
  d3.select('#chart_def_2').append(() => chart_def_2)
})
