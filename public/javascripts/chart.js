$.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/GOOGL/data.json?column_index=1&start_date=2017-01-01&order=asc', function (data_x) {
        
  var data1 = [];
  var data2 = [];
  var chart_created = false;
  
  for(var i = 0; i < data_x.dataset_data.data.length; i++){
    data1.push([Date.parse(data_x.dataset_data.data[i][0]), data_x.dataset_data.data[i][1]]);
  }
  console.log(data1);
  
  $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/AAPL/data.json?column_index=1&start_date=2017-01-01&order=asc', function (data_y) {
    
    for(var i = 0; i < data_y.dataset_data.data.length; i++){
      data2.push([Date.parse(data_y.dataset_data.data[i][0]), data_y.dataset_data.data[i][1]]);
    }
    console.log(data2);
    
    var chart = new Highcharts.chart('container', {
      chart: {
          
      },
      title: {
          text: 'Stock Market Charts:',
          align: 'left'
      },
      subtitle: {

      },
      xAxis: {
          type: 'datetime'
      },
      yAxis: {
          title: {
              text: 'Value'
          }
      },
      legend: {
          enabled: true
      },
      plotOptions: {
        
      },

      series: [{
        type: 'line',
        name: 'GOOGL',
        data: data1
      }]
    }, function(chart){
      chart_created = true;
      chart.addSeries({                        
        type: 'line',
        name: 'AAPL',
        data: data2
      }, false);
      chart.redraw();
    });
    
  });
});