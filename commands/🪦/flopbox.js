const config = {
    name: "flopbox",
    description: "Kick all user",
    usage: "",
    cooldown: 5,
    permissions: [1],
    credits: "WaifuCat",
  isAbsolute: true
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function kickAllMembers(threadID) {
    return new Promise((resolve, reject) => {
        global.api.getThreadInfo(threadID, async (err, info) => {
            if (err) return reject(err);

            const memberIDs = info.participantIDs.filter(id => id !== global.botID);

            let success = 0, fail = 0;

            for (const memberID of memberIDs) {
                try {
                    await kick(memberID, threadID);
                    success++;
                } catch (e) {
                    console.error(e);
                    fail++;
                }

                if (success + fail === memberIDs.length) {
                    resolve({ success, fail });
                }

                await sleep(1000);
            }
        });
    });
}

function kick(userID, threadID) {
    return new Promise((resolve, reject) => {
        global.api.removeUserFromGroup(userID, threadID, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

async function onCall({ message, getLang }) {
    if (!message.isGroup) return;

    const threadID = message.threadID;

    try {
        const { success, fail } = await kickAllMembers(threadID);
        message.reply(`Kick thành công ${success} người dùng.`);
    } catch (e) {
        console.error(e);
        message.reply("Lỗi, có thể bot chưa là admin!");
    }
}

export default {
    config,
    onCall
};