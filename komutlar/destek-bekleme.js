const { MessageMentions } = require("discord.js");
exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.reply("***Bu komutu kullanmak için Yönetici iznine sahip olmalısın.***");
    }

  const user = message.mentions.users.first();
  if (!user) {
    return message.reply("***Lütfen bir kullanıcı etiketleyin.***");
  }

  try {

    const supportChannel = "1137044889897541712";
    const destekkanalı = "1134289373752463410";

    await message.delete();
    await client.channels.cache.get(supportChannel).send(`> ${user}, **Destek Beklemeye Geçer Misiniz?**\n\n> **Odaya Katılmak İçin Tıkla: <#${destekkanalı}>**`);
  } catch (error) {
    console.error(error);
    message.reply("Bir hata oluştu, destek talebi gönderilemedi.");
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "destekbekleme"
};
