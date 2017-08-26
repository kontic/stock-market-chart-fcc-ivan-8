var socket = io.connect('https://stock-market-chart-fcc-ivan-8-ivan8.c9users.io/');
    
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
          text: 'Value [$]'
      }
  },
  legend: {
      enabled: true
  },
  plotOptions: {
    
  },

}, function(chart){
  socket.emit('initial_data');
  /*
  $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/CSCO/data.json?api_key=Ty_Hsnjs7Q_5CcbCKJLv&column_index=1&start_date=2017-01-01&order=asc', function (data_x) {
    
    var data1 = [];
    data1.push(['hello'])
    var chart_created = false;
    
    for(var i = 0; i < data_x.dataset_data.data.length; i++){
      if(i === 0){data1.push([])}
      data1[1].push([Date.parse(data_x.dataset_data.data[i][0]), data_x.dataset_data.data[i][1]]);
    }
    console.log(data1[1]);
    
    $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/IBM/data.json?api_key=Ty_Hsnjs7Q_5CcbCKJLv&column_index=1&start_date=2017-01-01&order=asc', function (data_y) {
      
      for(var i = 0; i < data_y.dataset_data.data.length; i++){
        if(i === 0){data1.push([])}
        data1[2].push([Date.parse(data_y.dataset_data.data[i][0]), data_y.dataset_data.data[i][1]]);
      }
      console.log(data1);
    
      
      chart.addSeries({                        
        type: 'line',
        name: 'CSCO',
        data: data1[1]
      }, false);
      chart.addSeries({                        
        type: 'line',
        name: 'IBM',
        data: data1[2]
      }, false);
      chart.redraw();
    });
  });
  */
});

