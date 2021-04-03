import Logger from './logger'
export default class Observer{
	private static topics: any = {}
	private static Uid = -1
	private static isReconnect = 0  // 是否处于重连状态

	public static subscribe(topic: string, func:Function) {  // 发布主题
		if(!Observer.topics[topic]){
			Observer.topics[topic] = []
		}
		const token= ++Observer.Uid
		Logger.info("Observer", "subscribe topic:"+ topic + ", uid=" + token)
		Observer.topics[topic].push({ token, func })
	}
	
	public static publish(topic: string, data:any) { // 订阅主题
		if(!Observer.topics[topic]){
			return false
		}
		for(let i = 0; i< Observer.topics[topic].length; i++) {
			Observer.topics[topic][i].func(data)
		}
	}

	public static reconnect() {
		Observer.isReconnect = 1
	}
	
	public static resetReconnect() {
		Observer.isReconnect = 0
	}
	
	public static getReconnectStatus() {
		return Observer.isReconnect
	}
}