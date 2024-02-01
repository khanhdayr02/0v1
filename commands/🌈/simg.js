const config =
 {
  "name": "simg",
  "aliases": ["si"],
  "description": "Spam ảnh bằng link",
  "usage": "<link>",
  "cooldown": 3,
  "permissions": [2],
  "credits": "",
  "extra": {}
};

let isStopped = false;

export async function onCall({ message }) {
  const [link] = message.body.split(" ").slice(1);
  
  if (!link) {
    message.reply("Vui lòng nhập link ảnh để gửi.");
    return;
  }

  const sendImages = async () => {
    try {
      const imageStream = await global.getStream(link);
      await message.send({
        attachment: [imageStream]
      });

      if (!isStopped) {
        setTimeout(sendImages, 1500);
      }
    } catch (error) {
      message.reply("Có lỗi xảy ra!");
    }
  };

  if (link === "stop") {
    isStopped = true;
    message.reply("Đã dừng gửi ảnh.");
    return;
  }

  sendImages();
}

export default {
  config,
  onCall
};