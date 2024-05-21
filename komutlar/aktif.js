const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  message.channel.send('||@everyone|| **&** ||@here||');
  
  const embed = new MessageEmbed()
    .setAuthor({ name: 'Sunucu aktif! iyi roller dileriz...', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .addField(" ", `\`\`\`Sunucu IP: 192.168.1.1\`\`\``)
    .addField(" ", `\`\`\`TS3 IP: 192.168.1.1\`\`\``)
    .addField(" ", '***Arkadaşlarını Davet Etmen İçin\nSınırsız Davet: https://discord.gg/htroleplay***')
    .setImage('https://media.tenor.com/HloAqs-j7O4AAAAd/falconsunucuaktif-falconaktif.gif')
    .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setColor("GREEN")
    .setTimestamp();

  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Sunucuya Giriş Yap")
        .setURL("https://link1.com"),
      new MessageButton()/// https://discord.gg/3GeA96NWts
        .setStyle("LINK")
        .setLabel("TS3 Giriş Yap")
        .setURL("https://link2.com")
    );

  await message.delete();/// https://discord.gg/3GeA96NWts
  return message.channel.send({ embeds: [embed], components: [row] });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "aktif"
};
