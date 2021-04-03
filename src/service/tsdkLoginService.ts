import tsdkLoginWrapper from '../wrapper/tsdkLoginWrapper'
import Observer from '../util/observer'
import Logger from '../util/logger'
export default class tsdkLoginService{
	private wrapper: tsdkLoginWrapper
	
	constructor() {
		this.wrapper = tsdkLoginWrapper.getInstance()
		this.wrapper.build()
		this.registerLoginEvent()
	}
	
	public async login(loginParam: any, callback: Function){
		let retData = await this.wrapper.login(loginParam);
		callback(retData)
	}

	public async reconnectBindWs(userId: number, callback: Function){
		let retData = await this.wrapper.reconnectBindWs(userId);
		callback(retData)
	}

	public registerLoginEvent() {
		Logger.info("tsdkLoginService","registerLoginEvent")
		this.wrapper.registerLoginEvent({
			onEvtLoginSuccess: tsdkLoginService.handleOnEvtLoginSuccess,
			onEvtLoginFailed: tsdkLoginService.handleonEvtLoginFailed
		})
	}
	
	public static handleOnEvtLoginSuccess(ret){
		Observer.publish("onEvtLoginSuccess", ret)
	}
	
	public static handleonEvtLoginFailed(ret){
		Observer.publish("onEvtLoginFailed", ret)
	}
}