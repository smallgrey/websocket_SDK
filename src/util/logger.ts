export default class Logger {
	public static readonly _instance = new Logger()
	
	public static getCurrentTime(){
		let date = new Date()
		let separtor1 = '-'
		let separtor2 = ':'
		let month:any = date.getMonth() + 1
		let strDate:any = date.getDate() + 1
		let hour:any = date.getHours()
		let minute:any = date.getMinutes()
		let seconds:any = date.getSeconds()
		
		if(month <= 9){
			month = "0" + month
		}
		
		if(strDate <= 9){
			strDate = "0" + strDate
		}
		
		if(hour <= 9){
			hour = "0" + hour
		}
		
		if(minute <= 9){
			minute = "0" + minute
		}
		
		if(seconds <= 9){
			seconds = "0" + seconds
		}
		
		let currentDate = date.getFullYear() + separtor1 + month + separtor1+ strDate + ' ' + hour + separtor2 + minute + separtor2 + seconds
		return "[" + currentDate + "]"
	}
	
	// error
	public static error(moduleName:string, ...arg:any[]){
		console.error(Logger.getCurrentTime() + "[" + moduleName + "][error]: " + arg)
	}
	
	// debug
	public static debug(moduleName:string, ...arg:any[]){
		console.debug(Logger.getCurrentTime() + "[" + moduleName + "][debug]: " + arg)
	}
	
	// info
	public static info(moduleName:string, ...arg:any[]){
		console.info(Logger.getCurrentTime() + "[" + moduleName + "][info]: " + arg)
	}
}