const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"], partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "USER"] });
const fs = require("fs");
const ayarlar = require("./config.json");
const { joinVoiceChannel } = require('@discordjs/voice');
const config = require('./config.json');
let küfürEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));/// https://discord.gg/3GeA96NWts
const profanityCounter = new Map();

module.exports = client;

require("./events/message.js")/// https://discord.gg/3GeA96NWts
require("./events/ready.js")

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {/// https://discord.gg/3GeA96NWts
  if (err) console.error(err);
  console.log(`✔️  Toplamda ${files.length} Komut Aktif!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });/// https://discord.gg/3GeA96NWts
});


// Sa As Komut
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content === "sa" || content === "selam aleyküm" || content === "selamın aleyküm" || content === "s.a" || content === "s ve a" || content === "selam") {
    message.reply("***Aleyküm Selam***");
  }
});

// Ses login
client.on('ready', () => { /// https://discord.gg/3GeA96NWts
  joinVoiceChannel(
    {
      channelId: "1134289373752463410",
      guildId: "1100838137074307142",
      adapterCreator: 
      client.guilds.cache.get("1100838137074307142").voiceAdapterCreator
    }
  );
});

// Silinen Mesaj Log
client.on('messageDelete', (deletedMessage) => {
  if (config.silinenmesajlog) {
    const logChannel = client.channels.cache.get(config.silinenmesajlog);/// https://discord.gg/3GeA96NWts
    if (logChannel) {
      try {
        const embed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Mesaj Silindi')
          .addField('Kanal', deletedMessage.channel.name, true)
          .addField('Kullanıcı', deletedMessage.author.tag, true);/// https://discord.gg/3GeA96NWts

        if (deletedMessage.content) {
          embed.addField('Mesaj İçeriği', deletedMessage.content);
        }
        
        embed.setTimestamp();

        logChannel.send({ embeds: [embed] });
      } catch (error) {
        console.error("Mesaj logu gönderilirken bir hata oluştu:", error);
      }
    }
  }
});



// Rol Log
client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (config.RolLog) {
    const logChannel = client.channels.cache.get(config.RolLog);
    if (logChannel) {
      const oldRoles = new Set(oldMember.roles.cache.keys());
      const newRoles = new Set(newMember.roles.cache.keys());
      const addedRoles = [...newRoles].filter(roleId => !oldRoles.has(roleId));
      const removedRoles = [...oldRoles].filter(roleId => !newRoles.has(roleId));

      if (addedRoles.length > 0 || removedRoles.length > 0) {
        const embed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle('Rol Güncellendi')
          .addField('Kullanıcı', newMember.user.tag, true);

        if (addedRoles.length > 0) {
          const addedRoleNames = addedRoles.map(roleId => newMember.guild.roles.cache.get(roleId).name);
          embed.addField('Eklenen Rolleri', addedRoleNames.join(', '), true);
        }

        if (removedRoles.length > 0) {
          const removedRoleNames = removedRoles.map(roleId => oldMember.guild.roles.cache.get(roleId).name);
          embed.addField('Kaldırılan Rolleri', removedRoleNames.join(', '), true);
        }

        logChannel.send({ embeds: [embed] }).catch(console.error);
      }
    }
  }
});

/// Küfür Engel
client.on('messageCreate', async (msg) => {
  if (!msg.guild || !küfürEngel[msg.guild.id]) return;
  if (küfürEngel[msg.guild.id].küfürEngel === 'kapali') return;

  if (küfürEngel[msg.guild.id].küfürEngel === 'acik') {
    const kufur = ['mk', 'amk', 'aq', 'orospu', 'oruspu', 'oç', 'sikerim', 'yarrak', 'piç', 'amq', 'sik', 'amcık', 'çocu', 'sex', 'seks', 'amına', 'cp', 'cocukpornosu', 'ataturk', 'atatürk', 'gore', 'pkk', 'kaltak', 'cc', 'kart', 'kredi kartı', 'orospu çocuğu', 'sg', 'siktir git'];

    const contentLower = msg.content.toLowerCase();/// https://discord.gg/3GeA96NWts
    if (kufur.some((word) => contentLower.includes(word))) {/// https://discord.gg/3GeA96NWts
      if (!msg.member.permissions.has('ADMINISTRATOR')) {
        msg.delete();

        try {
          setTimeout(() => {
          }, 5000);/// https://discord.gg/3GeA96NWts
        } catch (error) {
          console.error('Error sending reply:', error.message);
        }/// https://discord.gg/3GeA96NWts

        const userId = msg.author.id;
        const userProfanityCount = profanityCounter.get(userId) || 0;
        profanityCounter.set(userId, userProfanityCount + 1);

        if (userProfanityCount + 1 >= 3) {
          const roleId = (config.küfürmuteperm);
          const role = msg.guild.roles.cache.get(roleId);
          if (role) {
            msg.member.roles.add(role)
              .then()
              .catch(console.error);
          }
        }

        const logChannelId = (config.küfürlog);/// https://discord.gg/3GeA96NWts
        const logChannel = msg.guild.channels.cache.get(logChannelId);
        if (logChannel) {
          const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Küfür Kullanımı');

          if (msg.author.tag) {
            embed.addField('Kişi', msg.author.tag);
          }

          if (msg.createdAt) {
            const dateStr = msg.createdAt.toISOString();
            if (dateStr) {
              embed.addField('Tarih', dateStr);
            }/// https://discord.gg/3GeA96NWts
          }

          if (msg.content) {
            const contentStr = msg.content.trim();
            if (contentStr) {
              embed.addField('Küfür', contentStr);
            }
          }

          logChannel.send({ embeds: [embed] })
            .catch(console.error);
        }
      }
    }/// https://discord.gg/3GeA96NWts
  }
});


/// Guild Login
client.on('guildMemberAdd', async (member) => {
  const toplamuser = member.guild.memberCount;
  const botest = member.user.bot ? "Evet" : "Hayır";

  const user = await member.user.fetch();
  const discorddate = new Date(user.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const embed = new MessageEmbed()/// https://discord.gg/3GeA96NWts
    .setColor('RANDOM')
    .setTitle('🎉 Hoş Geldin!')
    .setDescription(`- **${member} Sunucumuza katıldı!**\n- 🙋 **Şu anda toplam \`\`${toplamuser}\`\` üyeye sahibiz.**\n- 🤖 **Hesabın bir bot mu? \`\`${botest}\`\`**\n- 📆 **Hesap Oluşturma Tarihi: \`\`${discorddate}\`\`**`)
    .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setImage('https://media.tenor.com/bR5fIwOwjvIAAAAd/discord-welcome.gif');

  const welcomeChannelId = '1135157711839957032';
  const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
  if (welcomeChannel) {
    welcomeChannel.send({ embeds: [embed] });
  }

  const roleToAddId = '1135155891411357787';
  const roleToAdd = member.guild.roles.cache.get(roleToAddId);
  if (roleToAdd) {
    member.roles.add(roleToAdd)
      .then()
      .catch(console.error);
  }
});

/// https://discord.gg/3GeA96NWts

client.login('/// https://discord.gg/3GeA96NWts')

/// https://discord.gg/3GeA96NWts