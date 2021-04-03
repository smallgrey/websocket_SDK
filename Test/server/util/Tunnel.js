class Tunnel{
	static users = {}
	static online_sum = 0 // 在线总人数

	static bindWsByUserId(userId, ws) { // 将userId、用户的连接进行绑定
		if(!Tunnel.users[userId]){
			Tunnel.users[userId] = {}
			Tunnel.online_sum++
		}
		Tunnel.users[userId].ws = ws
	}
	
	static getUserWs(userId) { // 根据userId返回用户websocket连接对象
		if(!Tunnel.users[userId]){
			return null
		}
		return Tunnel.users[userId].ws
	}

	static searchUserByWs(ws) { // 通过socket连接查找对应userId
		let allUsers = Object.keys(Tunnel.users)
		for(let i =0; i< allUsers.length; i++) {
			let userId = allUsers[i]
			if(Tunnel.users[userId].ws == ws) {
				return userId
			}
		}
		return -1;
	}
}
module.exports = Tunnel;