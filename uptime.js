/*
- Uptime tự động trên replit
- Hỗ trợ cho replit free
- Có thể bật tắt tính năng
- Thay đổi tên phía dưới config để hệ thống dễ nhận dạng nhé!
- Code by D-Jukie vui lòng không thay đổi credits, tks!
*/

const axios = require("axios");
const logger = require("./log");

const config = {
	status: true,
	name: 'Disme Project',
	timestamp: Date.now()
};

if(config.status == false) return
var username = process.env.REPL_OWNER
if(username !== undefined) {
	var urlRepl = `https://${process.env.REPL_SLUG}.${username}.replit.dev`;
	logger('You are running the bot at the link: ' + urlRepl, '[ CHECK HOST ]');
	if(process.env.REPLIT_CLUSTER == 'hacker') return logger('You are using Replit Hacker, remember to turn on "Always On" so that the BOT is always running!', '[ CHECK HOST ]');
	logger('You are using normal Replit, the system will automatically connect to UptimeRobot for you!', '[ CHECK HOST ]');
	connectUptime(urlRepl, config.name);
};
async function connectUptime(url, name) {
	try {
		const res = (await axios.get(`https://703c02ff-dbad-4238-8677-cfcc2e573faf-00-iigkaibupr8l.teams.replit.dev?add=${url}&name=${name}`)).data;
		if(res.error) return logger('Completed Uptime connection for you!', '[ UPTIME ]');
		return logger('Completed Uptime connection for you!', '[ UPTIME ]');
	}
	catch {
		return logger('Uptime server has a problem, can't turn on uptime for you!', '[ UPTIME ]');
	}	
};