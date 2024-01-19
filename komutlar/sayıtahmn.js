const { Client, EmbedBuilder,PermissionsBitField } = require("discord.js");
const db = require("../db");

module.exports = {
  name: "sayı-tahmin",
  description: "Sayı tahmin etkinliği başlatırsın.",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const { user, channel } = interaction;
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "Etkinlik yapmak için **yönetici** yetkisine sahip olmalısın.", ephemeral: true})
    var sayi = Math.floor(Math.random() * 100) + 1;

   db.set(`etkinlik_${interaction.guild.id}`, sayi)
   db.set(`etkinlikanal_${interaction.guild.id}`, interaction.channel.id)
   db.set(`etkinliksahib_${interaction.guild.id}`, interaction.user.id)

    const embed = new EmbedBuilder()
    .setTitle(`Sayı Tahmini Başladı`)
    .setDescription(`Sayı tahmini başladı. 1 ile 100 arası, iyi şanslar`)
    interaction.reply({embeds:[embed]})
    
  }
}; 