const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!قول')) return;

  const args = message.content.slice(5).trim().split(' ');
  const channel = message.mentions.channels.first();
  if (!channel) return message.reply('حدد القناة! مثال: !قول #قناة الرسالة');
  
  const text = args.slice(1).join(' ');
  if (!text) return message.reply('اكتب الرسالة!');
  
  await channel.send(text);
  await message.delete();
});

client.once('ready', () => console.log(`✅ ${client.user.tag} جاهز`));
client.login(process.env.TOKEN);
