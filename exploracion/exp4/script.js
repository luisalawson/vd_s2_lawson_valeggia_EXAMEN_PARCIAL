
d3.csv("autos_2.csv", d3.autoType).then((data) => {
  let chart_4 = Plot.plot({
    marks: [
      Plot.dot(data, {
        x: 'lon',
        y: 'lat',
        //r: 'cantidad',
        fill: 'cantidad'
      }),
  //YlGnBu
      Plot.frame(),
    ],
    grid: true,
    nice: true,
    x: { domain:[-58.55,-58.33]},
    y:{
        domain:[-34.69,-34.52]
    },
    
    color:{
      legend: true,
      scheme: "ylorrd",
    },
  });
  
  d3.select("#chart_4").append(() => chart_4);
});

