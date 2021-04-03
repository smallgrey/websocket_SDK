import tsdkManagerService from './service/tsdkManagerService'
import tsdkLoginService from './service/tsdkLoginService'
import tsdkChatService from './service/tsdkChatService'
import  Observer from './util/observer'
export default class tsdkClient {
	private static  __listeners: any = {}
	private static loginService: tsdkLoginService
	private static managerService: tsdkManagerService
	private static tsdkChatService: tsdkChatService
	
	constructor (initParam:any) {
		tsdkClient.managerService = new tsdkManagerService(initParam.svraddr, initParam.port, initParam.ssl, this.reconnectSucessCallback)
		tsdkClient.loginService = new tsdkLoginService()
		tsdkClient.tsdkChatService = new tsdkChatService()
		
		this.registerWebsocketEvent()
		this.registerLoginEvent()
		this.registerChatEvent()
	}

	reconnectSucessCallback() {
		let _this = this
		if(Observer.getReconnectStatus()){
			tsdkClient.loginService = new tsdkLoginService()
			Observer.resetReconnect()
		}
		Observer.publish("onEvtWebSocketConnect", '服务器连接成功') // 上报重连成功
	}

	// login module
	public login(loginParam: any, callback:Function) {
		tsdkClient.loginService.login(loginParam, callback)
	}

	public reconnectBindWs(userId: number, callback:Function) {
		tsdkClient.loginService.reconnectBindWs(userId, callback)
	}

	// chat module
	public singlePersonChat(chatParam: any, callback:Function) {
		tsdkClient.tsdkChatService.singlePersonChat(chatParam, callback)
	}

	public notify (event: string, data:any) {
		let _listen = tsdkClient.__listeners[event]
		if(!_listen){
			return false
		}
		for(let i = 0;i < _listen.length; i++){
			typeof _listen[i] === 'function' && _listen[i](data)
		}
	}
	
	public on(event:string, callbacks:Function) {
		if(!tsdkClient.__listeners[event]){
			tsdkClient.__listeners[event] = []
		}
		tsdkClient.__listeners[event].push(callbacks)
	}

	public registerLoginEvent() {
		Observer.subscribe('onEvtLoginSuccess', (ret:any) => {
			this.notify("onEvtLoginSuccess", ret)
		})
		
		Observer.subscribe('onEvtLoginFailed', (ret:any) => {
			this.notify("onEvtLoginFailed", ret)
		})
	}

	public registerWebsocketEvent() {
		Observer.subscribe('onEvtWebSocketConnect', (ret:any) => {
			this.notify("onEvtWebSocketConnect", ret)
		})
		
		Observer.subscribe('onEvtWebSocketClose', (ret:any) => {
			this.notify("onEvtWebSocketClose", ret)
		})
	}

	public registerChatEvent() {
		Observer.subscribe('onEvtNewsInComing', (ret:any) => {
			this.notify("onEvtNewsInComing", ret)
		})
	}
}