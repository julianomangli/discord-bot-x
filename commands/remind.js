const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder.')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('What to remind you about')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('minutes')
        .setDescription('Minutes from now to remind you')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(10080)), // Max 7 days
  async execute(interaction) {
    const message = interaction.options.getString('message');
    const minutes = interaction.options.getInteger('minutes');
    
    await interaction.reply(`⏰ I'll remind you about "${message}" in ${minutes} minute(s)!`);
    
    setTimeout(async () => {
      try {
        await interaction.followUp(`🔔 **Reminder:** ${message}`);
      } catch (error) {
        console.error('Error sending reminder:', error);
      }
    }, minutes * 60 * 1000);
  },
};