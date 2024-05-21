const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("<a:carpi:1112172837491458081> | **Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  if (args.length === 0) {
    const destekbeklemekanalı = "1137030886391545916";
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({ name: 'En Yakın Zamanda Açılacaktır...', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTitle(`Sohbet @Whitelist Rolüne Kapatıldı!`)
      .setDescription(`***HT Roleplay Sunucumuzla Alakalı Bir Problemi Olan Veya Destek Almak İsteyen Varsa <#${destekbeklemekanalı}> Kanalından Bizlere Ulaşabilir!***`)
      .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    try {
      const targetChannel = await client.channels.fetch("1137044889897541712");
      await targetChannel.permissionOverwrites.edit("1137047984018837525", {
        SEND_MESSAGES: false,
        ATTACH_FILES: false,
        EMBED_LINKS: false
      });
      await targetChannel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return message.reply("**<a:carpi:1112172837491458081> | Bir hata oluştu, kanal izinleri değiştirilemedi!**");
    }
  } else {
    let targetHour, targetMinute;

    if (args.length > 0) {
      const content = args.join(" ");
      const [hours, minutes] = content.split(":");
      targetHour = parseInt(hours);
      targetMinute = parseInt(minutes);

      if (isNaN(targetHour) || targetHour < 0 || targetHour > 23 || isNaN(targetMinute) || targetMinute < 0 || targetMinute > 59) {
        return message.reply("<a:carpi:1112172837491458081> | **Geçerli bir saat belirtmelisiniz (örn. 23:00) veya saat belirtmeden komutu kullanmalısınız!**");
      }
    }

    const roleId = "1137047984018837525"; 
    const timeToWait = targetHour ? targetHour * 60 + targetMinute - (new Date().getHours() * 60 + new Date().getMinutes()) : 0;

    try {
      const targetChannel = await client.channels.fetch("1137044889897541712"); 

      await targetChannel.permissionOverwrites.edit(roleId, {
        SEND_MESSAGES: false,
        ATTACH_FILES: false,
        EMBED_LINKS: false
      });

      if (targetHour && timeToWait > 0) {
        const reopenTime = new Date(Date.now() + timeToWait * 60000);
        const reopenTimeString = reopenTime.toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
        const destekbeklemekanalı = "1137030886391545916";
        const reopenEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor({ name: 'En Yakın Zamanda Açılacaktır...', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
          .setDescription(`***HT Roleplay Sunucumuzla Alakalı Bir Problemi Olan Veya Destek Almak İsteyen Varsa <#${destekbeklemekanalı}> Kanalından Bizlere Ulaşabilir!\n\nGenel Sohbet Açılma Saati: \`\`${reopenTimeString}\`\`***`)
          .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp();

        await message.delete()
        await targetChannel.send({ embeds: [reopenEmbed] });

        setTimeout(async () => {
          await targetChannel.permissionOverwrites.edit(roleId, {
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            EMBED_LINKS: true
          });

          const reopenEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({ name: 'İyi Sohbetler & İyi Roller...', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription("Sohbet kanalı artık <@&1137047984018837525> rolüne açılmış durumda. İyi sohbetler!")
            .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

          await targetChannel.send({ embeds: [reopenEmbed] });
        }, timeToWait * 60000);
      }
    } catch (error) {
      console.error(error);
      return message.reply("**<a:carpi:1112172837491458081> | Bir hata oluştu, kanal izinleri değiştirilemedi!**");
    }
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "wlkapat"
};
