var request = require('request');

module.exports = function (io) {
  global.stock_arr = ['CSCO'];
  global.stock_data = [];
  
  io.on('connection', function(socket){
    console.log('-----------------hello-----------------', socket.id);

    socket.on('initial_data', function(data){
      if(global.stock_data.length === 0){
        send_data_for_graph();
      }else{  //we already have data, just send
        io.sockets.emit('initial_data', {
          stock_symbols: global.stock_arr,
          data_for_charts: global.stock_data
        });
      }
      
    });
    
    socket.on('add_stock_item', function(data){
      console.log('**************************************', data.item);
      global.stock_arr.push(data.item);
      add_and_send_data_for_graph();
    });
    
    
    
  })
  
  function send_data_for_graph(){
    var test = 0;
    
    for(var i = 0; i < global.stock_arr.length; i++){
      global.stock_data.push([]);
    }
    for(var i = 0; i < global.stock_arr.length; i++){
      
      (function(index){
        request.get({
          url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + global.stock_arr[index] + '/data.json?api_key=' + process.env.QUANDL_API_KEY + '&column_index=1&start_date=2017-01-01&order=asc',
        }
        , function(err, resp, body){
            if (err) throw err;
            var wanted_data = JSON.parse(body);
            console.log('777777777777777777777777777777777777777', wanted_data);
            for(var i = 0; i < wanted_data.dataset_data.data.length; i++){
              global.stock_data[index].push([Date.parse(wanted_data.dataset_data.data[i][0]), wanted_data.dataset_data.data[i][1]]);
            }
            test++;
            if(test === global.stock_arr.length){
              io.sockets.emit('initial_data', {
                stock_symbols: global.stock_arr,
                data_for_charts: global.stock_data
              });
            }
          }
        );
      })(i);
    }
  }
  
  function add_and_send_data_for_graph(){
    
    global.stock_data.push([]);
    var index = global.stock_arr.length - 1;

    request.get({
      url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + global.stock_arr[index] + '/data.json?api_key=' + process.env.QUANDL_API_KEY + '&column_index=1&start_date=2017-01-01&order=asc',
    }
    , function(err, resp, body){
        if (err) throw err;
        var wanted_data = JSON.parse(body);
        console.log('777777777777777777777777777777777777777', wanted_data);
        for(var i = 0; i < wanted_data.dataset_data.data.length; i++){
          global.stock_data[index].push([Date.parse(wanted_data.dataset_data.data[i][0]), wanted_data.dataset_data.data[i][1]]);
        }

        io.sockets.emit('initial_data', {
          stock_symbols: global.stock_arr,
          data_for_charts: global.stock_data
        });
          
      }
    );
  }
  
  
}



