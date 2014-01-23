// Dependencies
var lineReader = require('line-reader');

var logs = [];
var occurrenceArray;
var requestsArray;

//sorting by string
var sortByProp = function(arr, prop) {
    arr.sort(function(a, b) {
        if (a[prop] < b[prop]) {
            return -1;
        }
        if (a[prop] > b[prop]) {
            return 1;
        }
        return 0;
    })
};


var occurrenceCounter = function(arr, prop) {
    sortByProp(arr, prop);

    var a = [], b = [], prev;

    for (var i = 0; i < arr.length; i++) {
        if (logs[i][prop] !== prev) {
            a.push(logs[i][prop]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = logs[i][prop];
    }
    return [a, b];
};

var combineArrays = function(arr){
    var container = [];
    var hosts = arr[0];
    var counts = arr[1];
    for(var i = 0, l = counts.length; i < l; i++){
        var obj = {
            host: hosts[i],
            counts: counts[i]
        };
        container.push(obj);
    }
    return container;
};

lineReader.eachLine('logs/varnish.log',function(line, last) {
    var log = line.match(/^(\S+) (\S+) (\S+) \[([^:]+):(\d+:\d+:\d+) ([^\]]+)\] \"(\S+) (.*?) (\S+)\" (\S+) (\S+) "([^"]*)" "([^"]*)"$/);

    var obj = {
        ip: log[0],
        date: log[4],
        time: log[5],
        method: log[7],
        request: log[8],
        status: log[10],
        domain: log[12].trim()
    };
    logs.push(obj);
}).then(function() {

            occurrenceArray = occurrenceCounter(logs, "domain");
            occurrenceArray = combineArrays(occurrenceArray);
            occurrenceArray.sort(function(obj1, obj2) {
                return obj2.counts - obj1.counts;
            });
            occurrenceArray = occurrenceArray.slice(0,5);

            requestsArray = occurrenceCounter(logs, "request");
            requestsArray = combineArrays(requestsArray);
            requestsArray.sort(function(obj1, obj2) {
                return obj2.counts - obj1.counts;
            });
            requestsArray = requestsArray.slice(0,5);
        });

/**
 * ROUTES
 * @param req
 * @param res
 */
exports.index = function(req, res) {
    res.render('index', { title: 'Express' });
};

exports.hosts = function(req, res) {
    return res.send(occurrenceArray);
};

exports.request = function(req, res) {
    console.log(requestsArray);
    return res.send(requestsArray);
};