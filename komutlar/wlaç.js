const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("<a:carpi:1112172837491458081> | **Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  const targetChannelId = "1137044889897541712"; 
  const roleId = "1137047984018837525";
  try {
    const targetChannel = await client.channels.fetch(targetChannelId);

    await targetChannel.permissionOverwrites.edit(roleId, {
      SEND_MESSAGES: true,
      ATTACH_FILES: true,
      EMBED_LINKS: true
    });

    const reopenEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({ name: 'İyi Sohbetler & İyi Roller...', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setDescription("> **Sohbet kanalı artık <@&1137047984018837525> rolüne açılmış durumda. İyi sohbetler!**")
      .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    await message.delete();
    await message.channel.send({ embeds: [reopenEmbed] });
  } catch (error) {
    console.error(error);
    message.reply("<a:carpi:1112172837491458081> | Bir hata oluştu, kanal izinleri değiştirilemedi.");
  }
};/// https://discord.gg/3GeA96NWts

exports.conf = {
  aliases: []
};

exports.help = {
  name: "wlaç"
};
