module.exports = function (io) {
  io.on('connection', function(socket){
    console.log('-----------------hello-----------------', socket.id);
    
    socket.on('testmsg', function(data){
      console.log('**************************************', data);
      io.sockets.emit('testmsg', data);
    });
    
    
    
    
  })
}