const { MessageEmbed } = require("discord.js");
const ayar = require("../cross.json");

exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('BLACK').setFooter('')
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
    let user = message.guild.member(member)
    if (!args[0]) {
        return message.channel.send(embed.setDescription(`${message.author}, Hatalı kullanım örnek: \`.rol vip @Kullanıcı\``))
    }
    if (args[0] === "vip") {
        if (!user) return message.channel.send(embed.setDescription(`${message.author}, Bir kullanıcı belirtmelisin.`))
        if (!user.roles.cache.has(ayar.vipRolü)) {
            user.roles.add(ayar.vipRolü)
            message.channel.send(embed.setDescription(`${user}, Adlı kullanıcıya ${message.guild.roles.cache.get(ayar.vipRolü)} rolü verildi`))
        }
        if (user.roles.cache.has(ayar.vipRolü)) {
            user.roles.remove(ayar.vipRolü)
            message.channel.send(embed.setDescription(`${user}, Adlı kullanıcıdan ${message.guild.roles.cache.get(ayar.vipRolü)} rolü alındı.`))
        }
    }


}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["vip"],
    name: 'rol',
    permLevel: 0
}