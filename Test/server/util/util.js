const ErrorCode = {
	10001: '参数错误',
	10002: '消息发送失败'
}

// 接口调用的返回格式
function _makeMsgSetAndSend (rsp, code, description) {
	let JsonParam = {
		 description: description,
		 result: code == 0? code : {errorCode: code, reason: ErrorCode[code]},
		 rsp: rsp,
	}
	return JSON.stringify(JsonParam)
}

// 接口回调或通知事件的返回格式
function _makeMsgImport(notify, result, description){
	let JsonParam = {
		 description: description,
		 result: result,
		 notify: notify,
	}
	return JSON.stringify(JsonParam)
}

module.exports = { _makeMsgSetAndSend, _makeMsgImport }