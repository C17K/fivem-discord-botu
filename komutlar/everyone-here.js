const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  message.channel.send('||@everyone|| **&** ||@here||')
  await message.delete();

  
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "everyone"
};
/// https://discord.gg/3GeA96NWts