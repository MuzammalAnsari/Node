function callback (){
    console.log("hello00");
}

const add = function (a,b,callback){
    var result = a+b;
    console.log(result);
    callback()
}

add(3,4, callback)