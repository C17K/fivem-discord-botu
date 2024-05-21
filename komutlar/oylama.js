const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  const userMessage = args.join(" ");

  if (!userMessage) {
    return message.reply("Lütfen bir mesaj belirtin.");
  }

  const embed = new MessageEmbed()
    .setTitle('<a:hype:1112185962404003871> Oylama <a:hype:1112185962404003871>')
    .setColor("RANDOM")
    .setDescription(`**${userMessage}**`)
    .setTimestamp()
    .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) });

  try {
    const sentMessage = await message.channel.send({ embeds: [embed] });
    await message.delete();

    await sentMessage.react("🟢");
    await sentMessage.react("🔴");

  } catch (error) {
    console.error(error);
    message.reply("Bir hata oluştu, mesaj gönderilemedi.");
  }
};

exports.conf = {
  aliases: []/// https://discord.gg/3GeA96NWts
};

exports.help = {
  name: "oylama"
};
