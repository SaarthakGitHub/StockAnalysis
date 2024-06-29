let chartObj;
async function makeChart(x,y,stock){
  const chartId = document.getElementById('myChart').getContext('2d');
  if (chartObj) {
      chartObj.destroy();
  }
  chartObj = await new Chart(chartId, {
        type: "line",
        data: {
          labels: x,
          datasets: [{
            fill: false,
            lineTension: 0,
            borderColor: "green",
            data: y
          }]
        },
        options: {
          legend: {display: false},
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(tooltipItem) {
                        return `${stock}: $${tooltipItem.yLabel.toFixed(3)}`;
                    }
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        min: Math.min(...y),
                        max: Math.max(...y)
                    }
                }]
            },
            plugins: {
                verticalLinePlugin: {
                    enabled: true
                }
            }
        },
        plugins: [verticalLinePlugin]
      });
}

const verticalLinePlugin = {
  id: 'verticalLinePlugin',
  afterDraw: function(chart) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
          const activePoint = chart.tooltip._active[0];
          const chartLine = chart.ctx;
          const x = activePoint.tooltipPosition().x;
          const topY = chart.scales['y-axis-0'].top;
          const bottomY = chart.scales['y-axis-0'].bottom;
          chartLine.save();
          chartLine.beginPath();
          chartLine.moveTo(x, topY);
          chartLine.lineTo(x, bottomY);
          chartLine.lineWidth = 1;
          chartLine.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          chartLine.stroke();
          chartLine.restore();
      }
  }
};


export default makeChart;