async function displayCharts() {
  const items = await getEnclosures();
  /*
  const totalSurface = data.reduce((stack, current) => {
    return stack + parseFloat(current.surface);
  }, 0)
  */
  let totalSurface = 0;
  let totalsByBiome = {
    desert: 0,
    jungle: 0,
    sea: 0,
    forest: 0
  }
  for (let item of items) {
    totalSurface += item.surface;
    totalsByBiome[item.biome] += item.surface;
  }

  if (totalSurface === 0) {
    return
  };
  const seriesData = Object.keys(totalsByBiome).reduce((stack, current) => {
    const itemData = {
      name: biomeLabels[current],
      y: (totalsByBiome[current] * 100.0) / totalSurface,
      sliced: stack.length === 0,
      selected: stack.length === 0
    }
    return [...stack, itemData]
  }, [])


  Highcharts.chart('surface-chart', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Surface par type d\'enclos',
      align: 'left'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Biomes',
      colorByPoint: true,
      data: seriesData,
    }]
  });
}
