const config = {
    name: "maintain",
    description: "on/off maintain mode",
    usage: "[on/off]",
    cooldown: 3,
    permissions: [2],
    credits: "XaviaTeam",
    isAbsolute: true
}

const langData = {
    "vi_VN": {
        "alreadyOn": "𝗖𝗵𝗮 𝗡𝗴𝘂𝘆𝗲̂̃𝗻 𝗚𝗶𝗮 𝗣𝗵𝘂́𝗰 (𝗭𝗡) Đ𝗼̂́ 𝗠𝗮̀𝘆 𝗦𝗽𝗮𝗺 𝗕𝗼𝘁 Đ𝗼́ 🤪",
        "on": "𝗖𝗵𝗮 𝗡𝗴𝘂𝘆𝗲̂̃𝗻 𝗚𝗶𝗮 𝗣𝗵𝘂́𝗰 (𝗭𝗡) Đ𝗼̂́ 𝗠𝗮̀𝘆 𝗦𝗽𝗮𝗺 𝗕𝗼𝘁 Đ𝗼́ 🤪",
        "alreadyOff": "𝗖𝗵𝗮 𝗡𝗴𝘂𝘆𝗲̂̃𝗻 𝗚𝗶𝗮 𝗣𝗵𝘂́𝗰 (𝗭𝗡) Đ𝗼̂́ 𝗠𝗮̀𝘆 𝗦𝗽𝗮𝗺 𝗕𝗼𝘁 Đ𝗼́ 🤪",
        "off": "𝗖𝗵𝗮 𝗡𝗴𝘂𝘆𝗲̂̃𝗻 𝗚𝗶𝗮 𝗣𝗵𝘂́𝗰 (𝗭𝗡) Đ𝗼̂́ 𝗠𝗮̀𝘆 𝗦𝗽𝗮𝗺 𝗕𝗼𝘁 Đ𝗼́ 🤪",
    },
    "en_US": {
        "alreadyOn": "Bot is already in maintain mode",
        "on": "Turned on maintain mode",
        "alreadyOff": "Bot is already out of maintain mode",
        "off": "Turned off maintain mode"
    },
    "ar_SY": {
        "alreadyOn": "الروبوت في وضع الصيانة بالفعل",
        "on": "تم تشغيل وضع الصيانة",
        "alreadyOff": "البوت خارج وضع الصيانة بالفعل",
        "off": "تم إيقاف تشغيل وضع الصيانة"
    }
}

async function onCall({ message, args, getLang }) {
    let input = args[0]?.toLowerCase() == "on" ? true : args[0]?.toLowerCase() == "off" ? false : null;

    if (input == null) input = !global.maintain;

    if (input) {
        if (global.maintain) return message.reply(getLang("alreadyOn"));
        global.maintain = true;

        message.reply(getLang("on"));
    } else {
        if (!global.maintain) return message.reply(getLang("alreadyOff"));
        global.maintain = false;

        message.reply(getLang("off"));
    }
}

export default {
    config,
    langData,
    onCall
}
