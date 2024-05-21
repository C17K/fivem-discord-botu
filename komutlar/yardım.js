const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("**Bu komutu kullanmak için Yönetici iznine sahip olmalısın.**");
  }

  const embed = new MessageEmbed()
    .setTitle("<a:etiket:1109585831473188874> Yardım Komutu <a:etiket:1109585831473188874>")
    .setThumbnail('https://cdn.discordapp.com/attachments/1075155275138482236/1124725493644660847/basarili-min.gif')
    .addField("<a:hashtag:1109940082099638313> !ip", `\`\`Sunucu Ip'sini Atar!\`\``)
    .addField("<a:hashtag:1109940082099638313> !destekbekleme", `\`\`Destek Beklemeye Çağarır!\`\``)
    .addField("<a:hashtag:1109940082099638313> !everyone", `\`\`Bot Everyone & Here Atar!\`\``)
    .addField("<a:hashtag:1109940082099638313> !kurallar", `\`\`Bot Sunucu Kurallarını Atar!\`\``)
    .addField("<a:hashtag:1109940082099638313> !onay", `\`\`Whitelist Verir Ve Kayıt Eder!\`\``)
    .addField("<a:hashtag:1109940082099638313> !aktif", `\`\`Sunucu Aktif Diye Bildirim Atar!\`\``)
    .addField("<a:hashtag:1109940082099638313> !restart", `\`\`Sunucu Restart Yiyecek Diye Bildirim Atar!\`\``)
    .addField("<a:hashtag:1109940082099638313> !bakım", `\`\`Sunucu Bakıma Alınacak Diye Bildirim Atar!\`\``)
    .addField("<a:hashtag:1109940082099638313> !wlkapat", `\`\`Sohbet Kanalını Kullanıcılara Kapatır!\`\``)
    .addField("<a:hashtag:1109940082099638313> !wlaç", `\`\`Sohbet Kanalını Kullanıcılara Açar!\`\``)
    .addField("<a:hashtag:1109940082099638313> !oylama", `\`\`İstek Öneri Oluşturur!\`\``)
    .addField("<a:hashtag:1109940082099638313> !küfürengelle", `\`\`Küfürleri Engeller!\`\``)
    .addField("<a:hashtag:1109940082099638313> !kayıt-başvuru", `\`\`Butonlu Kayıt Başvuru!!\`\``)
    .addField("<a:hashtag:1109940082099638313> !sil", `\`\`Mesajlarınızı Siler!!\`\``)
    .setColor("#36393F")
    .setFooter({ text: "HT ROLEPLAY", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp();


    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Discord Sunucumuz")
        .setURL("https://discord.gg/N3Y68HkWq7")
    );
    return message.reply({ embeds: [embed], components: [row] });

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "yardım"
};
