const { log } = require('console');
var fs = require('fs')
var os = require('os')

var user = os.userInfo()
console.log(user);

fs.appendFile('greeting.txt', 'Hi '+ user.username + '!',()=>console.log('file created') )

// console.log(os);