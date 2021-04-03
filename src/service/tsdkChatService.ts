import tsdkChatWrapper from '../wrapper/tsdkChatWrapper'
import Observer from '../util/observer'
import Logger from '../util/logger'
export default class tsdkChatService{
	private wrapper: tsdkChatWrapper
	
	constructor() {
		this.wrapper = tsdkChatWrapper.getInstance()
		this.wrapper.build()
		this.registerChatEvent()
	}
	
	public async singlePersonChat(chatParam: any, callback: Function){
		let retData = await this.wrapper.singlePersonChat(chatParam);
		callback(retData)
	}
	
	public registerChatEvent() {
		Logger.info("tsdkChatService","registerChatEvent")
		this.wrapper.registerChatEvent({
			onEvtNewsInComing: tsdkChatService.handleOnEvtNewsInComing
		})
	}
	
	public static handleOnEvtNewsInComing(ret){
		Observer.publish("onEvtNewsInComing", ret)
	}
}