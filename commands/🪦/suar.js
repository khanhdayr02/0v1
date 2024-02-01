const config = {
  name: "suar",
  description: "",
  usage: "",
  cooldown: 3,
  permissions: [2],
};

let arr = [
"Sủa Gì Vậy Con Đĩ {name}",
  "Con chó {name} sủa cha nghe",
  "làm thân anh à",
  "đúng không {name}",
  "sao mày lại chối vậy con chó {name}",
  "thân người đầu thú hèn chi ngu vc",
  "nhìn nó sợ tao kìa bây",
  "cấm cay anh nha {name}",
  "anh rấy thích cái cách con đĩ {name} cố gắng gây sự chú ý",
  "súc vật nào bằng anh đây 😋",
  "tội cho cha mẹ mày ghê",
  "sinh ra thằng nghịch tử này nè",
  "nhìn nó cay tao đến bất lực",
  "anh nghịch thiên em ơi",
  "có bao giờ bằng con thú {name} đâu mà biết",
  "bị anh chọc cho cay rồi",
  "đừng khóc nha cưng",
  "anh sợ mày méc mẹ lắm",
  "con chó {name} ngu kakaka",
  "1 mình nó sồn nãy giờ",
  "nó núp bot kìa anh em huhu",
  "đéo có anh em cay à {name}",
  "Con già mày hấp hối kìa {name}",
  "Mày Cắn Đá Đúng Không?",
  "Nhìn mày ngáo lắm em {name}",
  "thằng bê đê cắn đá mà chết",
  "anh bá sàn mà con thú {name}",
  "Mẹ mày bị tao cho chú đụ nè ",
  "thẳng già mày nhìn chó làm tình vợ của nó nè",
  "sủa cái đê {name}",
  "mày nứng lắm đúng không {name}",
  "mày mà ngưng một giây là con đĩ mẹ mày bả tắt đường thở á con thú {name}",
  "ê chó ngu mày sợ tao hả {name}",
  "mày đú rõ mà sao mày đú dị con chó  {name}",
  "{name} mẹ mày chết chưa con=)))",
  "ê bê đê sủa điên đi  {name}",
  "{name} sao mày sủa chậm dị?",
  "nào làm lại tao nói đê?  {name}",
  "bị tao chọc cay hơn con chó luôn đúng không  {name}?",
  "{name} sủa đi rồi tao tha {name} chó bị anh chửi đến hấp hối",
  "sủa điên lên cho cha đê  {name}",
  "mày ngưng là con đĩ mẹ mày chết nha  {name}",
  "cay tao lòi dái hả {name}",
  "não chó cay à {name}",
  "sao mày thảm dị=))) {name}",
  "thằng bại não {name} bị anh em tao bem nên mày sợ hả {name} sủa chơi đi {name}",
  "không trình bảo anh sài bot cũng nể ",
  "thẳng cặc {name} ganh tị nói anh sài bot à?",
  "tao có trình mà con thú {name}",
  "con đĩ má mày bị tao giết nè {name}",
  "con gà gõ không lại cầm bot kìa",
  "bot kìa",
  "trời gà nên cần có bot",
  "bị anh nói trúng hả {name}",
  "đéo trình nên cân có bot 🤣",
  "thứ ngu bị anh chửi đến bí ngôn đúng không con dog {name}",
  "con gà",
  "cay anh cầm bot kìa",
  "thứ gà cầm bot",
  "con đĩ {name} gà cầm bot kìa",
  "xiếc thú với con bot lỏ của mày à",
  "anh đấng mà ơ",
  "thú {name} bị anh chửi đến phải câm kìa",
  "thằng sex thú đang cố làm cha cay hả thằng bại não {name}",
  "{name} Hăng đi con chó",
  "{name} Hăng Lên Đi Con Chó Ngu",
  "{name} sao em ngu vậy",
  "{name} mồ côi",
  "mồ côi {name} cay",
  "bị anh nói đúng hả {name} mồ côi",
  "{name} mồ côi mãi không biết tình yêu thương của ba mẹ",
  "thằng ngu chửi anh mà không có tí sát thương đúng là {name} óc chó",
  "tao miễn nhiễm mà thằng ngu {name},",
  "mồ côi {name} cố gắng chửi tao để tao tự ái",
  "tội em nó đéo biết dân war miễn nhiễm với lời sỉ nhục của con thú {name}",
  "{name} thằng óc này ngu thật anh em à",
  "đúng là con chó {name} bị tao chửi vậy vẫn sủa được ",
  "muôn đời làm súc vật",
  "Con Thú {name} suốt đời ở dưới chân của tao",

  ]

setInterval(() => {
    for (let [key, value] of global.reoten_888) {
      if (value.index == arr.length) value.index = 0;
      api.sendMessage(arr[value.index].replace(/{name}/g, value.content), key, () => {
        value.index++;
      });
    }
  }, 4600);

if (!global.reoten_888) {
  global.reoten_888 = new Map();
}

async function onCall({ message, args }) {
  let content = args.join(" ");

  if (content === "s") {
    global.reoten_888.delete(message.threadID);
    return await message.send("😜😜");
  }

  global.reoten_888.set(message.threadID, { content, index: 0 });
  await message.reply(" ");
}

export default {
  config,
  onCall,
};