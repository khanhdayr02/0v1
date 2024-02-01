const config = {
    name: "taobox",
    aliases: ["vml"],
    description: "Tao box",
    usage: "[số lượng] [ tên box]",
    cooldown: 3,
    permissions: [2],
    credits: ""
}

if (!global.taobox) global.taobox = new Set();

const DELAY = 450;

async function onCall({ message, args }) {
    if (message.senderID != global.botID) return;
    if (message.isGroup) return;

    let isStop = args[0]?.toLowerCase() == "stop";
    message.react("aŸƒ");
    if (isStop) {
        global.taobox.delete(message.threadID);

        return;
    }

    let amount = parseInt(args[0]) || 1;
    let boxname = args[1] ?? null;

    const groupMembers = [message.senderID, message.threadID];
    global.taobox.add(message.threadID);

    for (let i = 0; i < amount; i++) {
        if (!global.taobox.has(message.threadID)) return;

        const newThreadID = await global.api.createNewGroup(groupMembers, boxname);
        global.api.sendMessage("cay anh lắm phải hông😂😂", newThreadID);

        global.api.removeUserFromGroup(global.api.getCurrentUserID(), newThreadID);
        await new Promise(resolve => setTimeout(resolve, 3000)); 
    }
}

export default {
    config,
    onCall
  }