const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    const embed = new MessageEmbed()
    .addField(" ", `\`\`\`Sunucu IP: Connect 192.168.1.1\`\`\``)
    .addField(" ", `\`\`\`TS3 IP: 192.168.1.1\`\`\``)
    .setColor("RANDOM")
    .setFooter({ text: `HT ROLEPLAY`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Sunucuya Giriş Yap")
        .setURL("https://link1.com"),
      new MessageButton()
        .setStyle("LINK")
        .setLabel("TS3 Giriş Yap")
        .setURL("https://link2.com")
    );

  return message.reply({ embeds: [embed], components: [row] });

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "ip"
};
