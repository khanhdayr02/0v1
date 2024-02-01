const config = {
  "name": "treo",
  "aliases": ["treo"],
  "description": "",
  "usage": "",
  "cooldown": 3,
  "permissions": [2],
  "credits": "WaifuCat",
  "extra": {}
};

const list = [
``,
  `🐳#𝐇𝐨𝐭 𝐓𝐫𝐞𝐨 𝐓𝐫 𝐌𝐢𝐧𝐡 𝐓𝐡𝐮𝐚𝐧 𝐚𝐤𝐚 𝐁𝐨𝐲 Đ𝐞̣𝐩 𝐓𝐫𝐚𝐢 𝐝𝐭𝐡𝐰 𝐯𝐥 𝐅𝐫𝐨𝐦 𝐀𝐄𝐏𝐍 ⁉️💤`,
];

let index = 0;
let isStopped = false;

export function onCall({ message }) {
  const args = message.body.split(" ").slice(1); 
  if (args[0] === "s") {
    isStopped = true; 
    message.send("win à=))");
    return;
  }

  if (isStopped) {
    isStopped = false;
  }

  const sendText = () => {
    message.send(list[index]);
    index = (index + 1) % list.length;
    if (!isStopped) {
      setTimeout(sendText,8000); 
    }
  };
  sendText();
}

export default {
  config,
  onCall
};