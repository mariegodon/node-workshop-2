function firstChar(someString, callback) {
    var first = someString.substring(0, 1);
    setTimeout(function(){
    callback(first);    
    }, 1000);
}


function lastChar(someString, callback) {
    var last = someString.substring(someString.length - 1, someString.length);
    setTimeout(function(){
    callback(last);  
    }, 1000);
}

function getFirstAndLast(someString, callback) {
    firstChar(someString, function(first){
        lastChar(someString, function(last){
            callback(first + last);
        });
    }); 
}

getFirstAndLast("hello", function(firstLast) {
    console.log(firstLast); // should output "ho"
});

