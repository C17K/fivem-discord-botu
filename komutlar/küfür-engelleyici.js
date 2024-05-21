const Discord = require('discord.js');
const fs = require('fs');
let küfürEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));

const ayarlar = require('../config.json');

exports.run = (client, message) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  if (message.channel.type === "DM") return;
  if (message.channel.type !== "GUILD_TEXT") return;

  let args = message.content.split(' ').slice(1);
  const secenekler = args.slice(0).join(' ');

  var errembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Yanlış Kullanım!`)
    .addField(`Doğru Kullanım:`, `${ayarlar.prefix}küfür-engelle aç veya kapat`);

  if (secenekler.length < 1 || (secenekler !== "aç" && secenekler !== "kapat")) {
    return message.channel.send(errembed).then(m => m.delete({ timeout: 10000 }));
  }

  message.delete();

  if (secenekler === "aç") {
    message.channel.send(`HT Bot Küfür Engelleme Sistemi: **açık**!`).then(m => m.delete({ timeout: 5000 }));
    küfürEngel[message.guild.id] = {
      küfürEngel: "acik"
    };

    fs.writeFile("./jsonlar/kufurEngelle.json", JSON.stringify(küfürEngel), (err) => {
      if (err) console.log(err);
    });
  } else if (secenekler === "kapat") {
    message.channel.send(`HT Bot Küfür Engelleme Sistemi: **kapalı**!`).then(m => m.delete({ timeout: 5000 }));
    küfürEngel[message.guild.id] = {
      küfürEngel: "kapali"
    };

    fs.writeFile("./jsonlar/kufurEngelle.json", JSON.stringify(küfürEngel), (err) => {
      if (err) console.log(err);
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['küfürengel', 'küfür-engelle'],
  permLevel: "ADMINISTRATOR"/// https://discord.gg/3GeA96NWts
};

exports.help = {
  name: 'küfürengelle',
  description: 'Küfür engelleme sistemini açıp kapatmanızı sağlar.',
  usage: 'küfür-engelle aç veya kapat'
};
