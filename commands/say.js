const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something.')
    .addStringOption(o => o.setName('text').setDescription('What should I say?').setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString('text', true);
    await interaction.reply({ content: text });
  }
};