const config = {
		name: "spam",
		description: "spam spam spam",
		usage: "[spam]",
		cooldown: 3,
		permissions: [2],
		credits: "",
}

if (!global.spam) {
		global.spam = [];
}

async function onCall({ message, args }) {
	const isStop = args[0]?.toLowerCase() === "s";
	if (isStop) {
		const index = global.spam.indexOf(message.threadID);
		if (index > -1) {
			global.spam.splice(index, 1);
			return message.reply("Vua Sàn War ZN");
		} else {
			return message.reply("Lại Sồn");
		}
	} else {
		const spam_content = args.join(" ");

		if (spam_content.length === 0) {
			return message.reply("spam đê");
		}

		if (global.spam.indexOf(message.threadID) > -1) {
			return message.reply("Óc Chó Ey");
		} else {
			global.spam.push(message.threadID);
			while (global.spam.indexOf(message.threadID) > -1) {
				message.send(spam_content).catch(e => { console.error(e) });
				await new Promise(resolve => setTimeout(resolve, 3000)); // delay 1000 mili giÃ¢y = 1 giÃ¢y
			}
		}
	}
}

export default {
		config,
		onCall
}