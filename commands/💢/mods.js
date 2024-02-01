const config = {
    name: "mods",
    aliases: ["moderators"],
    version: "1.0.1",
    description: "List, Add or remove moderators",
    permissions: [2],
    cooldown: 5
}

const langData = {
    "en_US": {
        "notAbsolute": "You are not an absolute moderator.",
        "alreadyModerator": "This user is already a moderator.",
        "notModerator": "This user is not a moderator.",
        "missingTarget": "Please mention or reply someone.",
        "add.success": "Added to moderator list:\n{added}",
        "remove.success": "Removed from moderator list:\n{removed}",
        "list": "Moderators:\n{moderators}",
        "error": "Error: {error}"
    },
    "vi_VN": {
        "notAbsolute": "𝑩𝒂𝒏 𝒌𝒉𝒐𝒏𝒈 𝒑𝒉𝒂𝒊 𝒍𝒂 𝒒𝒖𝒂𝒏 𝒕𝒓𝒊 𝒗𝒊𝒆𝒏 𝒕𝒖𝒚𝒆𝒕 𝒅𝒐𝒊.",
        "alreadyModerator": "𝑵𝒈𝒖𝒐𝒊 𝒅𝒖𝒏𝒈 𝒏𝒂𝒚 𝒅𝒂 𝒍𝒂 𝒒𝒖𝒂𝒏 𝒕𝒓𝒊 𝒗𝒊𝒆𝒏.",
        "notModerator": "𝑵𝒈𝒖𝒐𝒊 𝒅𝒖𝒏𝒈 𝒏𝒂𝒚 𝒌𝒉𝒐𝒏𝒈 𝒑𝒉𝒂𝒊 𝒍𝒂 𝒒𝒖𝒂𝒏 𝒕𝒓𝒊 𝒗𝒊𝒆𝒏.",
        "missingTarget": "𝑽𝒖𝒊 𝒍𝒐𝒏𝒈 𝒏𝒉𝒂𝒄 𝒅𝒆𝒏 𝒉𝒐𝒂𝒄 𝒕𝒓𝒂 𝒍𝒐𝒊 𝒎𝒐𝒕 𝒏𝒈𝒖𝒐𝒊.",
        "add.success": "𝑫𝒂 𝒕𝒉𝒆𝒎 𝒗𝒂𝒐 𝒅𝒂𝒏𝒉 𝒔𝒂𝒄𝒉 𝒒𝒖𝒂𝒏 𝒕𝒓𝒊 𝒗𝒊𝒆𝒏:\n{added}",
        "remove.success": "𝑫𝒂 𝒙𝒐𝒂 𝒌𝒉𝒐𝒊 𝒅𝒂𝒏𝒉 𝒔𝒂𝒄𝒉 𝒒𝒖𝒂𝒏 𝒕𝒓𝒊 𝒗𝒊ê𝒏:\n{removed}",
        "list": "𝑸𝒖𝒚𝒆𝒏 𝒂𝒅𝒎𝒊𝒏 𝑩𝑶𝑻 \n{moderators}",
        "error": "Lỗi: {error}"
    },
    "ar_SY": {
        "notAbsolute": "أنت لست المشرف المطلق.",
        "alreadyModerator": "هذا المستخدم هو بالفعل مسؤول.",
        "notModerator": "هذا المستخدم ليس مسؤولاً.",
        "missingTarget": "يرجى ذكر أو الرد على شخص.",
        "add.success": "تمت الإضافة إلى قائمة المشرفين:\n{added}",
        "remove.success": "تمت إزالته من قائمة الإدارة:\n{removed}",
        "list": "المسؤولين:\n{moderators}",
        "error": "خطأ: {error}"
    }
}

async function onCall({ message, args, getLang }) {
    const { type, messageReply, mentions, senderID, reply } = message;

    try {
        const isAbsolute = global.config.ABSOLUTES.some(id => id == senderID);

        let query = args[0]?.toLowerCase();
        switch (query) {
            case "add":
                {
                    if (!isAbsolute) return reply(getLang("notAbsolute"));

                    let success = [];
                    if (type == "message_reply") {
                        let userID = messageReply.senderID;
                        if (global.config.MODERATORS.some(id => id == userID)) return reply(getLang("alreadyModerator"));
                        global.config.MODERATORS.push(String(userID));
                        success.push({
                            id: userID,
                            name: (await global.controllers.Users.getInfo(userID))?.name || userID
                        });
                    } else if (Object.keys(mentions).length > 0) {
                        for (const userID in mentions) {
                            if (global.config.MODERATORS.some(id => id == userID)) continue;
                            global.config.MODERATORS.push(String(userID));
                            success.push({
                                id: userID,
                                name: mentions[userID].replace(/@/g, '')
                            });
                        }
                    } else return reply(getLang("missingTarget"));

                    global.config.save();
                    reply({
                        body: getLang("add.success", { added: success.map(user => user.name).join(", ") }),
                        mentions: success.map(user => ({ tag: user.name, id: user.id }))
                    });;

                    break;
                }
            case "remove":
            case "rm":
            case "delete":
            case "del":
                {
                    if (!isAbsolute) return reply(getLang("notAbsolute"));

                    let success = [];
                    if (type == "message_reply") {
                        let userID = messageReply.senderID;
                        if (!global.config.MODERATORS.some(id => id == userID)) return reply(getLang("notModerator"));
                        global.config.MODERATORS = global.config.MODERATORS.filter(id => id != userID);
                        success.push({
                            id: userID,
                            name: (await global.controllers.Users.getInfo(userID))?.name || userID
                        });
                    } else if (Object.keys(mentions).length > 0) {
                        for (const userID in mentions) {
                            if (!global.config.MODERATORS.some(id => id == userID)) continue;
                            global.config.MODERATORS = global.config.MODERATORS.filter(id => id != userID);
                            success.push({
                                id: userID,
                                name: mentions[userID].replace(/@/g, '')
                            });
                        }
                    } else return reply(getLang("missingTarget"));

                    global.config.save();
                    reply({
                        body: getLang("remove.success", { removed: success.map(user => user.name).join(", ") }),
                        mentions: success.map(user => ({ tag: user.name, id: user.id }))
                    });;

                    break;
                }
            default:
                {
                    let moderators = global.config.MODERATORS.map(async id => {
                        let info = await global.controllers.Users.getInfo(id);
                        return `${info?.name || id} (${id})`;
                    });
                    moderators = await Promise.all(moderators);

                    reply(getLang("list", { moderators: moderators.join("\n") }));
                    break;
                }
        }
    } catch (error) {
        reply(getLang("error", { error }));
    }

    return;
}

export default {
    config,
    langData,
    onCall
}
