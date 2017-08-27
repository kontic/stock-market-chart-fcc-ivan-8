


//emit to server





//listen from server

socket.on('initial_data', function(data){

  var series_num = chart.series.length;
  for(var k = series_num - 1; k >= 0; k--){
    chart.series[k].remove();
  }
  
  for(var j = 0; j < data.data_for_charts.length; j++){
    chart.addSeries({                        
      type: 'line',
      name: data.stock_symbols[j],
      data: data.data_for_charts[j]
    }, false);
  }
  chart.redraw();
  
  var stock_items_for_insert = "";
  for(var i = 0; i < data.stock_symbols.length; i++){
    if(i % 2 === 0){  
      stock_items_for_insert += '<li class="w3-display-container w3-blue-gray">' + data.stock_symbols[i] + '<span value="' + data.stock_symbols[i] + '" class="w3-button w3-transparent w3-display-right">&times;</span></li>';
    }else{
      stock_items_for_insert += '<li class="w3-display-container w3-light-gray">' + data.stock_symbols[i] + '<span value="' + data.stock_symbols[i] + '" class="w3-button w3-transparent w3-display-right">&times;</span></li>';
    }
  }
  $('#stock-items').html(stock_items_for_insert);
  
});

socket.on('error_msg', function(data){

  alert(data.msg);

});


//------------------------------------------------------------------------------
$( "#stock-items" ).on( "click", "li span", function( event ) {
  event.preventDefault();
  socket.emit('remove_stock_item', {
    item: $( this ).attr('value')
  });

});

$( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  
  var item = ($( "form input" ).val()).toUpperCase();
  
  var item_exists = false;
  
  $('ul li span').each(function(i, obj) {
    if(item === $( this ).attr('value')){
      item_exists = true;
      return false;
    }
  });
  
  if(!item_exists){
    socket.emit('add_stock_item', {
      item: item
    });
    $( "form input" ).val('')
  }else{
    alert('Item already exist!');
  }
});








