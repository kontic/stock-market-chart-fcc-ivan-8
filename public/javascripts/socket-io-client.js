var socket = io.connect('https://stock-market-chart-fcc-ivan-8-ivan8.c9users.io/');

var btn = document.getElementById('testbtn');

//emit to server
btn.addEventListener('click', function(){
  socket.emit('testmsg', {
    message: '1234567'
  });
});

//listen from server
socket.on('testmsg', function(data){
  console.log(data.message);
});
