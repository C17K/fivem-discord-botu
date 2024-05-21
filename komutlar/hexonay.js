const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }
  
  const logChannelID = "1137044889897541712";
  const user = message.mentions.users.first();
  const content = args.slice(1).join(" ");

  if (!user || !content) {
    return message.reply("**Kullanıcı Etiketlmeli ve Hex Belirtmelisiniz!**");
  }

  const embed = new MessageEmbed()
    .setAuthor( { name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) } )
    .setColor("GREEN")
    .setDescription(`<a:tik:1112170292756889643> ***Kayıt Edilen kullanıcı: ${user}\n\n<a:dchammer:1112186765764210808> Hex ID'si: \`\`${content}\`\`\n\n<:developer:1112169745584758925> Kayıt Eden Yetkili: <@${message.author.id}>***`)
    .setFooter({ text: `Hex Onay Bekleniyor...`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp();

  try {
    const logChannel = await client.channels.fetch(logChannelID);
    await logChannel.send({ embeds: [embed] });

    const responseEmbed = new MessageEmbed()
      .setTitle('<a:hype2:1112214330818175078> Başarılı <a:hype2:1112214330818175078>')
      .setColor("GREEN")
      .setDescription(`***Onay mesajınız başarıyla gönderildi!***`)
      .setFooter({ text: `HT ROLEPLAY`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    message.reply({ embeds: [responseEmbed] });

    const guildMember = message.guild.members.cache.get(user.id);
    const roleID = "1137047984018837525";
    guildMember.roles.add(roleID);
  } catch (error) {
    console.error(error);
    message.reply("Bir hata oluştu, onay mesajı gönderilemedi.");
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "onay"
};
