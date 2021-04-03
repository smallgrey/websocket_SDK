import socketService from "../tunnel/socketService"
import Logger from '../util/logger'
export default class tsdkManagerWrapper {
	public static socketService: socketService
	private static wrapper: tsdkManagerWrapper = new tsdkManagerWrapper()
	private onWebsocketReady: Function;
	
	constructor() {
		if(tsdkManagerWrapper.wrapper){
			 throw Error("tsdkManagerWrapper has exist")
		}
		tsdkManagerWrapper.wrapper = this
	}
	
	public build (svraddr: string, port: number, ssl: number, connectSucessCallback: any, closeCallback: any, errorCallback:any) {
		Logger.info("tsdkManagerWrapper","tsdkManagerWrapper has build")
		if(tsdkManagerWrapper.socketService && tsdkManagerWrapper.socketService.socket.readyState == 1){
			Logger.info("tsdkManagerWrapper","websocket is connecting ")
			return;
		}
		let promise = new Promise((resolve, reject) => {
			this.onWebsocketReady = (data) => {
				resolve("")
				Logger.info("tsdkManagerWrapper","websocket connect sucesss")
				if(connectSucessCallback && typeof connectSucessCallback === 'function') {
					connectSucessCallback.call(null,"websocket链接成功")
				}
			}
		})
		let _errCallback = (ret) => {
			if(errorCallback && typeof errorCallback === 'function') {
				errorCallback.call(null, ret)
			}
		}
		let _closeCallback = (ret) => {
			if(closeCallback && typeof closeCallback === 'function') {
				closeCallback.call(null, ret)
			}
		}
		let opt = {
			svraddr: svraddr,
			svrport: port,
			ssl: ssl,
			close: _closeCallback,
			ready: this.onWebsocketReady,
			error: _errCallback
		}
		tsdkManagerWrapper.socketService = new socketService(opt)
		return promise;
	}
	
	public static getInstance () {
		return tsdkManagerWrapper.wrapper
	}
}