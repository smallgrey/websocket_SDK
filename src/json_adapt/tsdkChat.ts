
export default class tsdkChat{
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
	
	//cmd 3001
	singlePersonChat(chatInfo: any, callback) {
		this.callbackResponse(callback, 3001)
		
		let data = {
			"cmd": 3001,
			"description": "tsdk_single_person_chat",
			"param": {
				"chatInfo": chatInfo
			}
		}
		
		this.sendData(data)
	}
	
	setBasicEvent(callbacks:any) {
		if(typeof callbacks.onEvtNewsInComing === 'function') {
			this.serviceTunnel.notifyFuncs[3002] = callbacks.onEvtNewsInComing
		}
	}
}