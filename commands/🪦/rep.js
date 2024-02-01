import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const config = {
  name: "rep",
  description: "",
  usage: "",
  cooldown: 3,
  permissions: [2],
};

const path = join(global.assetsPath, 'atr.json');

function onLoad() {
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({}), "utf-8");
  }
  if (!global.atr_888) {
    global.atr_888 = new Map();
  }
}

async function onCall({ message, args }) {
  if (!message.isGroup) return;

  const { threadID } = message;

  let data = JSON.parse(readFileSync(path, "utf-8"));
  if (!data[threadID]) data[threadID] = {
    enable: true,
  };
  let input = args.join(" ");
  if (input == "s") {
    data[threadID].enable = false;
    data[threadID].input = "";
  } else {
    data[threadID].enable = true;
    data[threadID].input = input;
  }
  writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");

  message.send(` ${(input == "s" ? "tắt rồi" : "đang bật")}`);
}

export {
  config,
  onLoad,
  onCall
}