export default class socketService{
	public socket:any
	public notifyFuncs: Array<Function> = [] // 通知事件集
	public rspFuncs: Array<Function> = [] // 回调事件集
	
	constructor(opt) {
		let wx: any
	    let svraddr = opt.svraddr || "127.0.0.1"
		let svrport = opt.svrport || "3000"
		
		let pcol = "ws://"
		if(opt.ssl){
			pcol = "wss://"
		}
		this.socket = null
		this.socket = new WebSocket(pcol + svraddr + ":" + svrport)
		this.socket.onopen = opt.ready
		this.socket.onclose = opt.close
		this.socket.onerror = opt.error
		// this.socket = wx.connectSocket({
		//   url: "wss://"+ svraddr +":"+ svrport +"/",
		// })
		// wx.onSocketOpen(opt.ready)
		// wx.onSocketClose(opt.close)
		// wx.onSocketError(opt.error)
		// wx.onSocketMessage((ret:any) => {
		this.socket.onmessage = (ret:any) => {
			let data = JSON.parse(ret.data)

			if(data.notify && data.notify>0){
				let notifyIdx = data.notify
				if(typeof this.notifyFuncs[notifyIdx] === 'function' ){
					this.notifyFuncs[notifyIdx](data)
				}
			}
			
			if(data.rsp && data.rsp>0){
				let rspIdx = data.rsp
				if(typeof this.rspFuncs[rspIdx] === 'function' ){
					this.rspFuncs[rspIdx](data)
				}
			}
		}
		
	}
	
	public sendData(data){
		this.socket.send(data)
		// let wx: any
		// wx.sendSocketMessage({
		// 	data
		// })
	}
}