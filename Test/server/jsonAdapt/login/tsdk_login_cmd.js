const { _makeMsgSetAndSend } = require('../../util/util');
const Tunnel = require('../../util/Tunnel');
const LoginService = require('./tsdk_login_notify');
const Users = require('../../mock/users');
const { LoginMsg } = require('../../msgCode/login');

class LoginController {

	static async login(loginParam, ws) {

        if(!loginParam.username || !loginParam.pwd){
            let ret = _makeMsgSetAndSend(1001, 10001, "tsdk_login")
            ws.send(ret)
            return
        }
        let ret = _makeMsgSetAndSend(1001, 0, "tsdk_login")
        ws.send(ret)
        

        let curUser = Users.find((item) => {
            return item.account == loginParam.username && item.pwd == loginParam.pwd
        })
        let jsonResult = ''
        if(!curUser) {
            let msgTip = Object.assign({}, LoginMsg(20001))
            jsonResult = LoginService.onEvtLoginFailed(msgTip)
            ws.send(jsonResult)
            return
        }
        await Tunnel.bindWsByUserId(curUser.userId, ws)
        jsonResult = LoginService.onEvtLoginSuccess(curUser)
        ws.send(jsonResult)
	}

    static async reconnectBindWs(userId, ws) {
		Tunnel.bindWsByUserId(userId, ws)
		let ret = _makeMsgSetAndSend(1002, 0, "tsdk_reconnect_bind_ws")
		ws.send(ret)
	}
    	
}

module.exports = LoginController;