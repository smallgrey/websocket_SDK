import tsdkChat from '../json_adapt/tsdkChat'
import tsdkManagerWrapper from './tsdkManagerWrapper'
import Logger from '../util/logger'
export default class tsdkChatWrapper{
	private static tsdkChat: tsdkChat
	private static wrapper: tsdkChatWrapper = new tsdkChatWrapper()
	
	constructor() {
		if(tsdkChatWrapper.wrapper){
			 throw Error("tsdkChatWrapper has exist")
		}
		tsdkChatWrapper.wrapper = this
	}
	
	public build () {
		Logger.info("tsdkChatWrapper","tsdkChatWrapper has build")
		tsdkChatWrapper.tsdkChat = new tsdkChat({
			socket: tsdkManagerWrapper.socketService
		})
	}
	
	public static getInstance () {
		return tsdkChatWrapper.wrapper
	}
	
	public singlePersonChat (chatParam: any) {
		let callback = { response: {} }
		let promise = new Promise((resolve, reject) => {
			callback.response = (ret: any) => {
				resolve(ret)
			}
		})
		tsdkChatWrapper.tsdkChat.singlePersonChat(chatParam, callback)
		return promise
	}
	
	public registerChatEvent(callbacks:any) {
		tsdkChatWrapper.tsdkChat.setBasicEvent(callbacks)
	}
}