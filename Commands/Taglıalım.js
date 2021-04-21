const { MessageEmbed } = require("discord.js");
const ayar = require("../cross.json");
const db = require("quick.db");
exports.run = async(client, message, args) => {

    let embed = new MessageEmbed().setColor('BLACK').setFooter('')
    let data = await db.get(`taglıalım.${message.guild.id}`)

    if (args[0] === "aç") {
        if (data) return message.channel.send(embed.setDescription(`${message.author}**, taglı alım modu zaten aktif.**`))
        db.set(`taglıalım.${message.guild.id}`, 'acik')
        message.channel.send(embed.setDescription(`${message.author}**, taglı alım modu başarıyla aktif edildi.**`))
    }
    if (args[0] === "kapat") {
        if (!data) return message.channel.send(embed.setDescription(`${message.author}**, taglı alım modu zaten kapalı.**`))
        db.delete(`taglıalım.${message.guild.id}`)
        message.channel.send(embed.setDescription(`${message.author}**, taglı alım modu başarıyla kapatıldı.**`))
    }
    if (!args[0]) {
        message.channel.send(embed.setDescription(`${message.author}**, hatalı kullanım:** \`.taglı-alım aç/kapat\``))
    }


}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["taglı-alım","taglıalım"],
    name: 'taglıalım',
    permLevel: 0
};