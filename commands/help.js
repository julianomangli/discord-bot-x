const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('See all available commands.'),
  async execute(interaction, client) {
    const categories = {
      '🤖 AI & Chat': ['chat'],
      '🛡️ Moderation': ['ban', 'kick', 'mute', 'unmute', 'clear'],
      '🎲 Fun & Games': ['8ball', 'coinflip', 'joke', 'roll', 'poll'],
      '🛠️ Utility': ['avatar', 'help', 'ping', 'remind', 'say', 'serverinfo', 'uptime', 'userinfo', 'weather']
    };

    const embed = new EmbedBuilder()
      .setTitle('🤖 Discord Bot X — Commands')
      .setDescription('Here are the available commands for this bot.')
      .setColor('#5865F2')
      .setFooter({ text: 'Built with discord.js v14' })
      .setTimestamp();

    const commands = client.commands;
    const processedCommands = new Set();

    for (const [category, cmdNames] of Object.entries(categories)) {
      const categoryCommands = cmdNames
        .map(name => commands.get(name))
        .filter(cmd => cmd); // Filter out undefined if command file doesn't exist

      if (categoryCommands.length > 0) {
        const value = categoryCommands.map(c => `\`/${c.data.name}\` — ${c.data.description}`).join('\n');
        embed.addFields({ name: category, value: value });
        categoryCommands.forEach(c => processedCommands.add(c.data.name));
      }
    }

    // specific handling for "Other" commands
    const otherCommands = commands.filter(cmd => !processedCommands.has(cmd.data.name));
    if (otherCommands.size > 0) {
       const value = otherCommands.map(c => `\`/${c.data.name}\` — ${c.data.description}`).join('\n');
       embed.addFields({ name: '📂 Other', value: value });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
