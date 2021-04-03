var express = require("express");
var https = require('https');
var fs = require('fs');
var WebSocket = require('ws');
var privateKey  = fs.readFileSync('./cert/private.pem', 'utf8');
var certificate = fs.readFileSync('./cert/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var app = express();

app.get('/', function(req, res){
	res.send('Hello,myServer'); //服务器响应请求
});

const LoginController = require('./jsonAdapt/login/tsdk_login_cmd');
const ChatController = require('./jsonAdapt/chat/tsdk_chat_cmd');

var httpsServer = https.createServer(credentials, app);
const PORT = 3000;
const hostname = '0.0.0.0';
httpsServer.listen(PORT,hostname, function() {
    console.log('Websocket Server is running on: https://'+hostname+':%s', PORT);
});

var wss = new WebSocket.Server({server: httpsServer});
wss.on('connection', function connection(ws) {
	console.log('链接成功！');
	ws.on('message', async function incoming(data) {
		let message = JSON.parse(data)
		console.log(message)
		await jsonAdapt(message, ws)
   });
});

function  jsonAdapt(message, ws) {
	switch (message.cmd) {
		case 1001:
		    LoginController.login(message.param.loginParam, ws)
			break;
		case 1002:
			LoginController.reconnectBindWs(message.param.userId, ws)
			break;
		case 3001:
			ChatController.singlePersonChat(message.param.chatInfo , ws)
			break;
	}
}