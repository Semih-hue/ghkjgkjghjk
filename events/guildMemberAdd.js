const Discord = require("discord.js");
const ayar = require('../cross.json');
const moment = require("moment");
const { min } = require("moment");
moment.locale('tr')

module.exports = async(member) => {
    let client = member.client;
    let channel = member.guild.channels.cache.get(ayar.registerChat)
    let guildID = client.guilds.cache.get(ayar.guildID)
    let şüphe = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7 ? "Şüpheli!" : "Güvenli!" // 10 OLAN KISIM GÜNDÜR AYARLAYABİLİRSİNİZ.

    let date = moment(member.user.createdAt)
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);

    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;

    var string = "";
    string = `${years ? years+ " yıl" : ""} ${months ? months+ " ay" : ""} ${weeks ? weeks+ " hafta" : ""} ${days ? days+ " gün" : ""} ${hours ? hours+ " saat" : ""} ${mins ? mins+ " dakika" : ""}`
    string = string.trim();
    let gün = moment(new Date(date).toISOString()).format('DD')
    let ay = moment(new Date(date).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    let yıl = moment(new Date(date).toISOString()).format('YYYY')
    let saat = moment(new Date(date).toISOString()).format('HH:mm')
    let kuruluş = `${gün} ${ay} ${yıl} ${saat}`;

    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-999])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9999])/g, d => {
        return {
          '0': `<a:vlrn_0:833572470963306496>`,
          '1': `<a:vlrn_1:833572478684233778>`,
          '2': `<a:vlrn_2:833572488016822333>`,
          '3': `<a:vlrn_3:833572495855714314>`,
          '4': `<a:vlrn_4:833572502356754463>`,
          '5': `<a:vlrn_5:833572510296965120>`,
          '6': `<a:vlrn_6:833572515396714506>`,
          '7': `<a:vlrn_7:833572529188765736>`,
          '8': `<a:vlrn_8:833572535647862794>`,
          '9': `<a:vlrn_9:833572545147830282>`}[d];})}


    if (şüphe === "Güvenli!") {
        member.roles.set([ayar.kayıtsızRolü])
        member.setNickname(`✬ İsim | Yaş`)
        channel.send(`
<a:vlrn_hey:831092139189600316> **Sunucumuza Hoş Geldin** ${member}
    
    <a:vlrn_parilti:831092124061138974> **Hesabın** \`${moment(member.user.createdTimestamp).format("LLL")}\` **tarihinde** \`${string}\` **önce oluşturulmuş.**
    
    <a:vlrn_parilti:831092124061138974> **Sunucu kurallarımız** <#833327041553235998> **kanalında belirtilmiştir. Unutma sunucu içerisindeki cezai işlemlerin kuralları okuduğun varsayılarak gerçekleştirilecektir.**
    
    <a:vlrn_parilti:831092124061138974> **Seninle beraber** `+üyesayısı+` **kişi olduk!**  \`✬\` **tagımızı alarak bizlere destek olabilirsin.**

    <a:vlrn_parilti:831092124061138974> **Kayıt olmak için teyit odalarına girip ses teyit vermen yeterlidir** <@&833326916756701224> **seninle ilgilenecektir iyi eğlenceler.**`)

    } else {
        member.roles.set([ayar.şüpheliRol])
        member.setNickname(`✬ Yeni | Hesap`)

        channel.send(`

${member} **Adlı kullanıcı sunucuya katıldı, Hesabı** \`7\` **günden yeni olduğu için şüpheli hesap rolü verildi.**`)
    }
}, module.exports.configuration = {
    name: "guildMemberAdd"
}