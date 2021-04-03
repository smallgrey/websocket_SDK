const MsgList = [
	{code: 0, msg: '成功'},
	{code: 20001, msg: '用户账号或密码错误'}
]

function LoginMsg(code){
	let res = MsgList.find((item) => {
		return item.code == code
	})
	return res;
}

module.exports = { LoginMsg }