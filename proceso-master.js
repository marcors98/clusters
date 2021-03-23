const cluster = require('cluster');
console.log(`Master pid: ${process.pid}`)
cluster.setupMaster({
    exec: __dirname + '/servicio-recetas.js'
});

cluster.fork();
cluster.fork();

cluster.on('disconnect', (worker) => {
    console.log(`Desconectado: ${worker.id}`);
}).on('exit', (worker, code, signal) => {
    console.log(`Salida: ${worker.id}`);
}).on('listening', (worker, {address, port}) => {
    console.log(`Escuchando ${worker.id} en ${address}:${port}`);
});


