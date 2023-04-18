d3.dsv(';', 'data/147_desratizacion.csv', d3.autoType).then(data => {
  const groupedData = d3.rollup(
    data,
    v => d3.group(v, d => d.estado_del_contacto),
    d => d.domicilio_barrio,
  );

  const barChartData = Array.from(groupedData, ([domicilio_barrio, value]) => {
    const closed = value.get('Cerrado')?.length || 0;
    const opened = value.get('Abierto')?.length || 0;
    const count = opened + closed;
    return { domicilio_barrio, closed, opened, count };
  });

  const sortedData = barChartData.sort((a, b) => d3.descending(a.count, b.count));
  const xDomain = d3.extent(sortedData, d => Math.abs(d.count));
  const xMax = xDomain[1];

  const chart = Plot.plot({
    height: 800,
    marginLeft: 200,
    marginBottom: 60,
    grid: true,
    x: {
      axis: 'top',
      round: true,
      label: '← CERRADOS · Estado de los contactos · ABIERTOS →      ',
      labelAnchor: 'center',
      domain: [-xMax, xMax],
      tickFormat: d => Math.abs(d),
      ticks:0
    },
    y: {
      label: 'BARRIO',
      domain: sortedData.map(d => d.domicilio_barrio)
    },
    color: {
      range: ['#e15759', '#4e79a7', '#006837', '#fbb4ae']
    },
    marks: [
      Plot.barX(sortedData, {
        y: 'domicilio_barrio',
        x: d => - (d.closed), // cambiar el signo de las coordenadas x de los negocios cerrados
        fill: '#d7301f'
      }),
      
      Plot.barX(sortedData, {
        y: 'domicilio_barrio',
        x: d => d.opened,
        fill: '#ADDD8E'
      }),
      
      Plot.text(sortedData, {
        x: d => -d.closed,
        y: d => d.domicilio_barrio,
        text: d => d.closed,
        textAnchor: 'end',
        dx: -5,
        fill: 'black',
        stroke: 'white',
        strokeWidth: 1
      }),
      
      Plot.text(sortedData, {
        x: d => d.opened,
        y: d => d.domicilio_barrio,
        text: d => d.opened,
        textAnchor: 'start',
        dx: 5,
        fill: 'black',
        stroke: 'white',
        strokeWidth: 1
      })
    ]
  });

  d3.select('#chart_def_3').append(() => chart);
});
