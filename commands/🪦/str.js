const config = {
    name: "str",
    description: "dvn",
    permissions: [2]
}
const icons = ["🤣", "😂", "😜", "😛", "🌶", "😳", "🤔", "😏", "🤪"];
const atstr = [
    "Chạy Đi",
    "Chó Ngu Ăn Cứt",
    "Ngu"
]

function getGUID() {
    var sectionLength = Date.now();
    var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.floor((sectionLength + Math.random() * 16) % 16);
        sectionLength = Math.floor(sectionLength / 16);
        var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
        return _guid;
    });
    return id;
}

async function onCall({ message, args }) {
    let quantity, delay;

    if (!args[0] || isNaN(parseInt(args[0]))) return message.reply("Số lượng không khả dụng");
    if (!args[1] || isNaN(parseInt(args[1]))) return message.reply("Độ trễ không khả dụng");

    quantity = parseInt(args[0]);
    delay = parseInt(args[1]);

    let uuid;

    for (let i = 0; i < quantity; i++) {
        uuid = getGUID();
        const formData = {
            "input": {
                "audiences": [
                    {
                        "stories": {
                            "self": {
                                "target_id": global.botID
                            }
                        }
                    }
                ],
                "audiences_is_complete": true,
                "logging": {
                    "composer_session_id": uuid
                },
                "navigation_data": {
                    "attribution_id_v2": "StoriesCreateRoot.react,comet.stories.create,unexpected,1703684425230,805093,,,;CometHomeRoot.react,comet.home,via_cold_start,1703684399926,79234,4748854339,,"
                },
                "source": "WWW",
                "message": {
                    "ranges": [],
                    "text": atstr[i] + Array.from({ length: 2 }, () => {
                        const randomIndex = Math.floor(Math.random() * icons.length);
                        return icons[randomIndex];
                    }).join('')
                },
                "text_format_metadata": {
                    "inspirations_custom_font_id": "233490655168261"
                },
                "text_format_preset_id": "277332376527537",
                "tracking": [
                    null
                ],
                "actor_id": global.botID,
                "client_mutation_id": Math.floor(Math.random() * 17)
            }
        };
        const form = {
            av: global.botID,
            fb_api_caller_class: "RelayModern",
            fb_api_req_friendly_name: "StoriesCreateMutation",
            variables: JSON.stringify(formData),
            doc_id: "6197602830367217"
        };

        global.api.httpPost('https://www.facebook.com/api/graphql/', form, (e, info) => {
            try {
                if (e) console.error(e);
            }
            catch (e) {
                console.log(e)
                return message.reply(`Tạo story thất bại, vui lòng thử lại sau`);
            }
        });
    }
}

export default {
    config,
    onCall,
}