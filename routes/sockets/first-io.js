var request = require('request');

module.exports = function (io) {
  global.stock_arr = ['CSCO'];
  global.stock_data = [];
  
  io.on('connection', function(socket){

    socket.on('initial_data', function(data){
      if(global.stock_data.length === 0){
        send_data_for_graph();
      }else{  //we already have data, just send (for additional clients)
        socket.emit('initial_data', { //respond to client that contacted server
          stock_symbols: global.stock_arr,
          data_for_charts: global.stock_data
        });
      }
      
    });

    socket.on('add_stock_item', function(data){
      global.stock_arr.push(data.item);
      add_and_send_data_for_graph(socket);
    });
    
    socket.on('remove_stock_item', function(data){
      for(var i = 0; i < global.stock_arr.length; i++){
        if(data.item === global.stock_arr[i]){
          global.stock_arr.splice(i,1);
          global.stock_data.splice(i,1);
          break;
        }
      }
      io.sockets.emit('initial_data', {
        stock_symbols: global.stock_arr,
        data_for_charts: global.stock_data
      });
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
  
  function add_and_send_data_for_graph(socket){
    
    global.stock_data.push([]);
    var index = global.stock_arr.length - 1;

    request.get({
      url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + global.stock_arr[index] + '/data.json?api_key=' + process.env.QUANDL_API_KEY + '&column_index=1&start_date=2017-01-01&order=asc',
    }
    , function(err, resp, body){
        var test = true;
        try{
          if (err) throw err;
          var wanted_data = JSON.parse(body);
          for(var i = 0; i < wanted_data.dataset_data.data.length; i++){
            global.stock_data[index].push([Date.parse(wanted_data.dataset_data.data[i][0]), wanted_data.dataset_data.data[i][1]]);
          }
        }catch(err){
          global.stock_arr.splice(-1,1);
          global.stock_data.splice(-1,1);
          socket.emit('error_msg', { //respond to client that try to add item
            msg: 'The item you tried to enter does not exist (or there is some problem with the Quandl API)'
          });
          test = false;
        }
        
        if(test){
          io.sockets.emit('initial_data', {
            stock_symbols: global.stock_arr,
            data_for_charts: global.stock_data
          });
        }

      }
    );
  }
  
  
}



