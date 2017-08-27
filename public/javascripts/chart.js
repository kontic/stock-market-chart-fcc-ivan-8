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
});

