d3.dsv(';', '147_desratizacion.csv', d3.autoType).then(data => {
    const groupedData = d3.rollup(
      data,
      v => d3.group(v, d => d.estado_del_contacto),
      d => d.domicilio_barrio,
    );
  
    const barChartData = Array.from(groupedData, ([domicilio_barrio, value]) => {
      const closed = value.get('Cerrado')?.length || 0;
      const opened = value.get('Abierto')?.length || 0;
      const count = opened + closed;
      console.log(closed, opened, count)
      return { domicilio_barrio, closed, opened, count };
    });
  
    const sortedData = barChartData.sort((a, b) => d3.descending(a.count, b.count));
    console.log(sortedData)
    const xDomain = d3.extent(sortedData, d => Math.abs(d.count));
    const xMax = xDomain[1];
    console.log(xMax)
  
    const chart = Plot.plot({
      height: 800,
      marginLeft: 200,
      marginBottom: 60,
      grid: true,
      x: {
        axis: 'top',
        round: true,
        label: '← CERRADOS · Estado de los contactos · ABIERTOS →',
        labelAnchor: 'center',
        domain: [-xMax, xMax],
        tickFormat: d => Math.abs(d)
      },
      y: {
        label: 'BARRIO',
        domain: sortedData.map(d => d.domicilio_barrio)
      },
      color: {
        range: ['#e15759', '#4e79a7']
      },
      marks: [
        Plot.barX(sortedData, {
          y: 'domicilio_barrio',
          x: d => - (d.closed), // cambiar el signo de las coordenadas x de los negocios cerrados
          fill: '#e15759'
        }),
        Plot.barX(sortedData, {
          y: 'domicilio_barrio',
          x: d => d.opened,
          fill: '#4e79a7'
        })
      ]
    });
  
    d3.select('#chart_9').append(() => chart);
  });
  
  