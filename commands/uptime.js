const { SlashCommandBuilder, time } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('How long the bot has been online.'),
  async execute(interaction) {
    const ms = interaction.client.uptime || 0;
    const seconds = Math.floor(ms / 1000);
    const pretty = [
      Math.floor(seconds / 86400) + 'd',
      Math.floor((seconds % 86400) / 3600) + 'h',
      Math.floor((seconds % 3600) / 60) + 'm',
      (seconds % 60) + 's'
    ].join(' ');
    await interaction.reply(`⏱️ Uptime: **${pretty}**`);
  }
};