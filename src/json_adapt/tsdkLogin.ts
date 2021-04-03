
export default class tsdkLogin{
	private serviceTunnel: any
	
	constructor(opt) {
		this.serviceTunnel = opt.socket
	}
	
	sendData(data) {
		let dataStr = JSON.stringify(data)
		if(this.serviceTunnel.socket){
			this.serviceTunnel.sendData(dataStr)
		}
	}
	
	callbackResponse(callback: any, rsp:number) {
		if(callback.response && typeof callback.response === 'function'){
			this.serviceTunnel.rspFuncs[rsp] = callback.response
		}
	}
	
	//cmd 1001
	login(loginParam: any, callback) {
		this.callbackResponse(callback, 1001)
		
		let data = {
			"cmd": 1001,
			"description": "tsdk_login",
			"param": {
				"loginParam": loginParam
			}
		}
		
		this.sendData(data)
	}

	//cmd 1002
	reconnectBindWs(userId: number, callback) {
		this.callbackResponse(callback, 1002)
		
		let data = {
			"cmd": 1002,
			"description": "tsdk_reconnect_bind_ws",
			"param": {
				"userId": userId
			}
		}
		
		this.sendData(data)
	}

	setBasicEvent(callbacks:any) {
		if(typeof callbacks.onEvtLoginSuccess === 'function') {
			this.serviceTunnel.notifyFuncs[1002] = callbacks.onEvtLoginSuccess
		}
		
		if(typeof callbacks.onEvtLoginFailed === 'function') {
			this.serviceTunnel.notifyFuncs[1003] = callbacks.onEvtLoginFailed
		}
	}
}