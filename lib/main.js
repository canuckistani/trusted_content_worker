
const data = require('self').data;

var { setInterval, clearInterval } = require('timers');

let worker = require('page-worker').Page({
    contentURL: data.url('worker.html')
});

var interval, 
    counter = 0;

worker.port.on('goodbye', function() {
    if (counter === 10) {
        clearInterval(interval);
    } else {
        counter++;
        console.log('worker is at '+counter);
    }
});

interval = setInterval(function() {
    worker.port.emit('hello');
}, 2000);

