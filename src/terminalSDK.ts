import tsdkClient from './tsdkClient'
import Logger from './util/logger'
export default class terminalSDK {
	public static tsdkClient;
	constructor () {
	}
	 
	public static tsdkCreateClient(initParam: any, listeners:any) {
		try{
		    terminalSDK.tsdkClient = new tsdkClient(initParam)
		}catch (err){	
			Logger.error("terminalSDK", "terminal create failed..." + err)
		}
		if(!terminalSDK.tsdkClient){
			return ""
		}

		if(listeners && listeners.onEvtLoginSuccess != 'undefined'){
			terminalSDK.tsdkClient.on("onEvtLoginSuccess", listeners.onEvtLoginSuccess)
		}
		
		if(listeners && listeners.onEvtLoginFailed != 'undefined'){
			terminalSDK.tsdkClient.on("onEvtLoginFailed", listeners.onEvtLoginFailed)
		}

		if(listeners && listeners.onEvtNewsInComing != 'undefined'){
			terminalSDK.tsdkClient.on("onEvtNewsInComing", listeners.onEvtNewsInComing)
		}

		if(listeners && listeners.onEvtWebSocketConnect != 'undefined'){
			terminalSDK.tsdkClient.on("onEvtWebSocketConnect", listeners.onEvtWebSocketConnect)
		}
		
		if(listeners && listeners.onEvtWebSocketClose != 'undefined'){
			terminalSDK.tsdkClient.on("onEvtWebSocketClose", listeners.onEvtWebSocketClose)
		}
				
		return terminalSDK.tsdkClient
	 }
}