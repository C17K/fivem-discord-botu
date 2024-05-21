const client = require("../index");

client.on("ready", () => {
    console.log(`${client.user.tag} İsmimli Bot Aktif`)
    client.user.setStatus("dnd");
    client.user.setActivity("discordum: tssb", { type: "WATCHING" });
});
/// https://discord.gg/3GeA96NWts
/// https://discord.gg/3GeA96NWts