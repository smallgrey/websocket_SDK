import tsdkLogin from '../json_adapt/tsdkLogin'
import tsdkManagerWrapper from './tsdkManagerWrapper'
import Logger from '../util/logger'
export default class tsdkLoginWrapper{
	private static tsdkLogin: tsdkLogin
	private static wrapper: tsdkLoginWrapper = new tsdkLoginWrapper()
	
	constructor() {
		if(tsdkLoginWrapper.wrapper){
			 throw Error("tsdkLoginWrapper has exist")
		}
		tsdkLoginWrapper.wrapper = this
	}
	
	public build () {
		Logger.info("tsdkLoginWrapper","tsdkLoginWrapper has build")
		tsdkLoginWrapper.tsdkLogin = new tsdkLogin({
			socket: tsdkManagerWrapper.socketService
		})
	}
	
	public static getInstance () {
		return tsdkLoginWrapper.wrapper
	}
	
	public login (loginParam: any) {
		let callback = { response: {} }
		let promise = new Promise((resolve, reject) => {
			callback.response = (ret: any) => {
				resolve(ret)
			}
		})
		tsdkLoginWrapper.tsdkLogin.login(loginParam, callback)
		return promise
	}

	public reconnectBindWs (userId: number) {
		let callback = { response: {} }
		let promise = new Promise((resolve, reject) => {
			callback.response = (ret: any) => {
				resolve(ret)
			}
		})
		tsdkLoginWrapper.tsdkLogin.reconnectBindWs(userId, callback)
		return promise
	}

	public registerLoginEvent(callbacks:any) {
		tsdkLoginWrapper.tsdkLogin.setBasicEvent(callbacks)
	}
}