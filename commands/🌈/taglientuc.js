const config = {
"name": "tlt",
"aliases": ["tag"],
"description": "",
"usage": "",
"cooldown": 3,
"permissions": [2],
"credits": "WaifuCat",
"extra": {},
  isAbsolute: true
};

let isStopped = false;

export const onCall = async ({ message }) => {
const args = message.body.split(" ").slice(1);
const { reply, mentions } = message;

if (args[0] === "s") {
isStopped = true;
message.send("bị tag cay đỏ dái à");
return;
}

if (isStopped) {
isStopped = false;
}
if (!mentions || !Object.keys(mentions)[0]) {
return message.send("Vui lòng tag ai đó.");
}

const mention = Object.keys(mentions)[0];
let tag = mentions[mention].replace(/@/g, "");

if (typeof window !== "undefined" && window.innerWidth <= 768) {
tag = ""; 
} else {
tag = `@${tag}`; 
}

if(args.length > 0){
const sendText = (messageToSend) => {
message.send({
body: messageToSend,
mentions: [{ tag, id: mention }],
});
if (!isStopped) {
setTimeout(() => sendText(messageToSend), 3000);
}
};
sendText(args.join(' '));
}else{
message.send('Vui lòng nhập tin nhắn để lặp lại.');
}
};

export default {
config,
onCall
};