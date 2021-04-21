const { MessageEmbed } = require("discord.js");
const ayar = require("../cross.json");
const db = require("quick.db");
exports.run = async(client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let embed = new MessageEmbed().setColor('BLACK').setTimestamp().setFooter(``)
    if (!message.member.roles.cache.has(ayar.kayıtcıRolü) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}**, bu komutu kullanmak için gerekli yetkiye sahip değilsin.**`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }) && message.delete())

    let erkek = await db.get(`teyit.${member.id}.erkek`)
    let kız = await db.get(`teyit.${member.id}.kız`)
    let toplam = await db.get(`teyit.${member.id}.toplam`)
    if (!toplam) return message.channel.send(embed.setDescription(`${member}**, adlı kullanıcının kayıt verisi bulunamadı.**`)).then(x => x.delete({ timeout: 7000 }))
    if (erkek === undefined) erkek = "0"
    if (erkek === null) erkek = "0"

    if (kız === undefined) kız = "0"
    if (kız === null) kız = "0"

    if (toplam === undefined) toplam = "0"
    if (toplam === null) toplam = "0"

    message.channel.send(embed.setDescription(`${member}**, kullanıcısının toplam** \`${toplam}\` **kayıtı bulunmakta. (**\`${erkek}\` **Erkek,** \`${kız}\` **Kadın)**`)).then(m => m.delete({ timeout: 10000 }) && message.delete({ timeout: 9999 }))

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kayıt-say","teyit-say"],
    name: 'teyitbilgi',
    permLevel: 0
};