const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")

const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);



const { readdirSync } = require("fs")
const config = require("./config.json");
let Giris = config.TOKEN
readdirSync('./komutlar').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./komutlar/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`${props.name} Başarıyla yüklendi`)

});
readdirSync('./eventler').forEach(e => {

  const eve = require(`./eventler/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });
});

const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


client.login(Giris || process.env.token)

client.on("messageCreate", message => {
    const db = require("./db");

    const gecis = db.get(`etkinlik_${message.guild.id}`)
    const gecistwo = db.get(`etkinlikanal_${message.guild.id}`)
    const gecisthree = db.get(`etkinliksahib_${message.guild.id}`)

    if(!gecis) return;
    if(!gecistwo) return;
    if(!gecisthree) return;

    if(message.channel.id != gecistwo) return;

    if(message.content === `${gecis}`) {
        const basariembed = new EmbedBuilder()
        .setTitle(`Cevap bulundu.`)
        .setDescription(`<@${message.member.id}> cevabı **${gecis}** olarak buldu, tebrikler 🥳`)
        message.reply({embeds:[basariembed], content: `<@${gecisthree}>`})
        db.delete(`etkinlik_${message.guild.id}`)
        db.delete(`etkinlikanal_${message.guild.id}`)
        db.delete(`etkinliksahib_${message.guild.id}`)
    }

})