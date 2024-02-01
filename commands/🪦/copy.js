const config = {
  name: "copy",
  description: "",
  usage: "[mentions?] [content]/[off]",
  cooldown: 3,
  permissions: [2],
  credits: "",
  isAbsolute: true
};

if (!global.copy_173) {
  global.copy_173 = new Map();
}

async function onCall({ message, args }) {
  let content = args.join(" ");

  if (content === "s") {
    global.copy_173.delete(message.threadID);
    return await message.reply("𝐴𝘯ℎ 𝐿𝘢 𝘕𝑔𝘶𝑦𝘦𝑛 𝐺𝘪𝑎 𝑃𝘩𝑢𝘤 𝘛𝑟𝘢𝑖 𝐷𝘦𝑝 𝑁𝘢𝑚 𝐾𝘪  ");
  }

  let ids_reply = Object.keys(message.mentions);

  global.copy_173.set(message.threadID, ids_reply);

  await message.reply("Đã bật");
}

export default {
  config,
  onCall,
};