const { Permissions, MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
    }

  const amount = parseInt(args[0]);

  if (isNaN(amount) || amount < 1 || amount > 100) {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Geçersiz Miktar!")
      .setDescription(`\`\`\`Lütfen 1 ile 100 arasında bir sayı girin!\`\`\``)
      .setTimestamp()
      .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) });

    return message.channel.send({ embeds: [embed] });
  }

  const maxAmount = Math.min(amount, 100);

  try {
    const deletedMessages = await message.channel.bulkDelete(maxAmount, true);
    const deletedCount = deletedMessages.size;

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Mesajlar Silindi!")
      .setThumbnail('https://cdn.discordapp.com/attachments/1075155275138482236/1124725493644660847/basarili-min.gif')
      .setDescription(`\`\`\`${deletedCount} adet mesaj başarıyla silindi!\`\`\``)
      .setTimestamp()
      .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) });

   await message.channel.send({ embeds: [embed] });

    setTimeout(() => {
    }, 5000);
  } catch (error) {
    console.error("Mesajları silerken bir hata oluştu:", error);
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Hata!")
      .setDescription(`\`\`\`Mesajları silerken bir hata oluştu!\`\`\``)
      .setTimestamp()
      .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) });

    await message.channel.send({ embeds: [embed] });

    setTimeout(() => {
    }, 5000);
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "sil"
};
