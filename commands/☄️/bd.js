export const config = {
    name: "bd",
  aliases: ["đổi\ bd"],
    version: "1.0.0",
    credits: "vml",
    description: "Đổi biệt danh ai đó",
  permissions: [2],
    usage: "[name]",
    cooldowns: 3
};

export async function onCall({ message, args }) {
    const nickname = args.join(" ")
    const mention = Object.keys(message.mentions)[0];
    if (!mention) return global.api.changeNickname(`${nickname}`, message.threadID, message.senderID);
    if (mention[0]) return global.api.changeNickname(`${nickname.replace(message.mentions[mention], "")}`, message.threadID, mention);
}
