import tsdkManagerWrapper from '../wrapper/tsdkManagerWrapper'
import Observer from '../util/observer'

export default class tsdkManagerService{
	private wrapper: tsdkManagerWrapper
	
	constructor(svraddr: string, port: number, ssl: number, reconnectSucessCallback:Function) {
		this.wrapper = tsdkManagerWrapper.getInstance()
		let _connectSucessCallback = () => {
			if(reconnectSucessCallback && typeof reconnectSucessCallback === 'function'){
				reconnectSucessCallback(null)
			}
		}
		let _errorCallback = () => {}
		let _closeCallback = () => {
			Observer.publish("onEvtWebSocketClose", '服务器连接异常') // 上报连接异常
			Observer.reconnect() // 标识重连状态
			// 3s后自动重连
			setTimeout(() => {
				this.wrapper.build(svraddr, port, ssl, _connectSucessCallback, _closeCallback, _errorCallback)
			},3000)
		}
		this.wrapper.build(svraddr, port, ssl, _connectSucessCallback, _closeCallback, _errorCallback)
	}
}