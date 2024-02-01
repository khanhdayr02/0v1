const config = {
    name: "restart",
    aliases: ["rs", "rest", "reboot"],
    permissions: [2],
    isAbsolute: true
}

async function onCall({ message, getLang }) {
    await message.send("um");
    global.restart();
}

export default {
    config,
    onCall
}
