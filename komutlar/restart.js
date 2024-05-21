const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  message.channel.send('||@everyone|| **&** ||@here||');
  
  const restartSaati = new Date();
  restartSaati.setMinutes(restartSaati.getMinutes() + 15);

  const saat = `${restartSaati.getHours().toString().padStart(2, "0")}.${restartSaati.getMinutes().toString().padStart(2, "0")}`

  const embed = new Discord.MessageEmbed()
    .setAuthor( { name: 'Sunucuya Restart Atılacaktır Lütfen Çıkış Sağlayalım!!', iconURL: message.author.displayAvatarURL({ dynamic: true }) } )
    .setDescription(`***Sunucu Restart Saati \`\`${saat}\`\`***`)
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
  name: "restart"
};
