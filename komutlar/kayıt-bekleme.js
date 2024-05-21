const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const etiketlenecekRoller = ["1137047984018837525", "1137047984018837525"];
  
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  const embed = new MessageEmbed()
    .setTitle("<a:hype:1112185962404003871> Kayıt Bekleme <a:hype:1112185962404003871>")
    .setAuthor({ name: 'Lütfen Bekleyiniz...', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setDescription("***> <a:hashtag:1109940082099638313> Butona Basarak Yetkililere Bildirim Gönderebilirsiniz!\n\n> <a:hashtag:1109940082099638313> Sunucumuza Kayıt Olmak İçin Sol Tarafta Bulunan Kayıt Bekleme Kanalına Giriniz!\n\n> <a:hashtag:1109940082099638313> Yetkili Çağırmak İçin Aşağıdaki Butona Basınız!\n\n> <a:hashtag:1109940082099638313> Yetkilileri Beklerken Kuralları Okuyunuz Lütfen!***")
    .setColor("BLUE")
    .setFooter({ text: `HT ROLEPLAY`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp();
    message.delete();

  const etiketleButton = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("🔔 Mülakata Çağır!")
    .setCustomId("etiketle_button");

  const actionRow = new MessageActionRow()
    .addComponents(etiketleButton);

  const msg = await message.channel.send({ embeds: [embed], components: [actionRow] });

  const cooldownTime = 300000;
  const cooldownUsers = new Set();

  const filter = (interaction) => interaction.customId === "etiketle_button" && interaction.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter });

  collector.on("collect", (interaction) => {
    if (cooldownUsers.has(interaction.user.id)) {
      interaction.reply({ content: "> ***5 dakikada bir kayıt başvurusu yapabilirsin!***", ephemeral: true });
    } else {
      const etiketlenecekRolObjeleri = etiketlenecekRoller.map((rolId) => message.guild.roles.cache.get(rolId));
      const etiketlenecekRollerString = etiketlenecekRolObjeleri.join(" ");
      interaction.reply({ content: `> ***Başarıyla Yetkilileri Etiketlediniz En Kısa Sürede Sizinle İlgileneceklerdir...***`, ephemeral: true });

      const kanalId = "1134273408771817542";
      const kanal = client.channels.cache.get(kanalId);
      if (kanal) {
        const onayEmbed = new MessageEmbed()
          .setTitle("Kayıt Bekleniyor!")
          .setDescription(`**Kullanıcı: <@${message.author.id}>\nKullanıcı ismi: ${message.author.tag}\nKullanıcı Id'si: \`\`${message.author.id}\`\`\nKayıt Kanalı: <#${kanalId}>**`)
          .setColor("RANDOM")
          .setFooter({ text: `HT ROLEPLAY`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
          kanal.send(`${etiketlenecekRollerString}`)
        kanal.send({ embeds: [onayEmbed] });
      }

      cooldownUsers.add(interaction.user.id);
      setTimeout(() => {
        cooldownUsers.delete(interaction.user.id);
      }, cooldownTime);
    }
  });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "kayıt-başvuru"
};
