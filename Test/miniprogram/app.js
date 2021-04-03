//app.js
import { terminalSDK } from './utils/terminalSDK.js';
App({
	globalData:{
		tsdkClient: '',
		SdkEvents: {},
	},
	onLaunch: function () {
		let that = this
		that.initSdk()
	},
	initSdk: function () {
		let that = this
		let listeners =  {
			onEvtLoginSuccess: (ret) => {
				console.log("登录结果:", ret)
			},
			onEvtNewsInComing: (ret) => {
				console.log('新消息:', ret)
			},
			onEvtWebSocketConnect: (ret) => {
			  that.webSocketLogin()
			},
			onEvtWebSocketClose: (ret) => {},
		}
		let AppConfigureParam = {
			svraddr: '127.0.0.1',
            port: 3000,
            ssl: 1
		}
		that.globalData.tsdkClient = terminalSDK.tsdkCreateClient(AppConfigureParam, listeners)
	},
	webSocketLogin () {
		let that = this
		let loginParam = {
			username: '张三',
			pwd: '123456'
		}
		that.globalData.tsdkClient.login(loginParam, (ret) => {})
	},
	registerEvent (event, listener) {
		let that = this
		that.globalData.SdkEvents[event] = listener
	},
	unregisterEvent (event, listener) {
		let that = this
		that.globalData.SdkEvents[event] = undefined
	},
	callEvent (event, result) {
		let that = this
		if (typeof that.globalData.SdkEvents[event] === 'function') {
		  that.globalData.SdkEvents[event].call(this, result)
		}
	}
})