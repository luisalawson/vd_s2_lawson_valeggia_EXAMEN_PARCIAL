


// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';','147_desratizacion.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

  /* Mapa Coroplético */
  const hours = Array.from({length: 24}, (_, i) => i); // create an array with 24 hours [0, 1, ..., 23]
  const charts = hours.map(hour => {
    const filteredData = data.filter(d => d3.timeFormat('%H')(d3.timeParse('%H:%M:%S')(d.hora_ingreso)) == hour);
    const reclamosPorBarrio = d3.group(filteredData, d => d.domicilio_barrio); // crea un Map
    let chartMap = Plot.plot({
      // https://github.com/observablehq/plot#projection-options
      projection: {
        type: 'mercator',
        domain: barrios, // Objeto GeoJson a encuadrar
      },
      color: {
        scheme: 'ylorbr',
        legend: true
      },
      marks: [
        Plot.geo(barrios, {
          fill: d => {
            let nombreBarrio = d.properties.BARRIO
            let cantReclamos = reclamosPorBarrio.get(nombreBarrio)?.length || 0;
            return cantReclamos;
          },
          stroke: 'gray',
          title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
        }),
      ],
     // title: `Mapa de reclamos por barrio - ${hour}:00 hs`,
      width: 200,
      fx:{
        //domain: [00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
    });
    return chartMap;
  });

  d3.select('#chart_5').selectAll('div').data(charts).join('div').attr('class', 'chart-container').append(d => d);
})

