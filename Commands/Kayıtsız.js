const { MessageEmbed } = require("discord.js");
const ayar = require("../cross.json");
const db = require("quick.db");
exports.run = async(client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let embed = new MessageEmbed().setColor('BLACK').setTimestamp().setFooter(``)
    if (!message.member.roles.cache.has(ayar.kayıtcıRolü) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}**, bu komutu kullanmak için gerekli yetkiye sahip değilsin.**`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (!member) return message.channel.send(embed.setDescription(`${message.author}**, bir üye belirt.**`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.author}**, bu kullanıcı senden üst/aynı pozisyonda.**`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (member.id === client.user.id) return message.channel.send(embed.setDescription(`${message.author}**, dalga mı geçiyorsun ?**`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${message.author}**, kendini kayıtsıza atamazsın.**`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    member.roles.set([ayar.kayıtsızRolü]).catch()
    member.setNickname(`${ayar.unTag} İsim | Yaş`)
    message.channel.send(embed.setDescription(`
${member}**, adlı kullanıcıya** ${message.author} **tarafından** ${message.guild.roles.cache.get(ayar.kayıtsızRolü)} **rolü verildi.**
`))
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["unregister","kayıtsız","unreg"],
    name: 'kayıtsız',
    permLevel: 0
};