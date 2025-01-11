const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const prefix = '!';

bot.once('ready', () => {
  console.log('\x1b[32mBot is online!');
});

bot.on('ready', () => {
  setInterval(() => {
    bot.user.setActivity('your status here');
  }, 3000);
});

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commandName === 'setup') {
    const command = bot.commands.get('setup');
    if (command) {
      command.execute(message, args, Discord, bot);
    } else {
      message.reply('The setup command is not available.');
    }
  }
});

bot.login('your-bot-token');
