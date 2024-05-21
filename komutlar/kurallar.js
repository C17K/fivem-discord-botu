const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

    const embed = new Discord.MessageEmbed()
    .setTitle("HT ROLEPLAY SUNUCU KURALLARI!")
    .setDescription("**Sunucu Kuralınız!**")
    .setColor("#36393F")
    .setImage('https://media.discordapp.net/attachments/833290710325264394/910808305461493760/Kurallar.png?width=680&height=160')
    .setFooter({ text: `HT ROLEPLAY`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
  
    await message.delete();
    return message.channel.send({embeds : [embed]});

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "kurallar"
};
