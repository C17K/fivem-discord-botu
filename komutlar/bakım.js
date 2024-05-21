const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  message.channel.send('||@everyone|| **&** ||@here||');


  const embed = new Discord.MessageEmbed()
    .setAuthor( { name: 'Sunucu Bakımdadır En Yakın Zamanda Açılacaktır...', iconURL: message.author.displayAvatarURL({ dynamic: true }) } )
    .setDescription(`***Sunucu Bakıma Alınmıştır!***`)
    .addField("***Arkadaşlarını Davet Etmen İçin***", '***Sınırsız Davet: https://discord.gg/htroleplay***', true)
    .setColor("GREEN")
    .setTimestamp();


  await message.delete();
  return message.channel.send({ embeds: [embed] });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "bakım"
};
/// https://discord.gg/3GeA96NWts