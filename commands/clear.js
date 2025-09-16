const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete a specified number of messages.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    
    try {
      const messages = await interaction.channel.messages.fetch({ limit: amount });
      await interaction.channel.bulkDelete(messages);
      
      await interaction.reply({ 
        content: `✅ Successfully deleted ${amount} messages!`, 
        ephemeral: true 
      });
    } catch (error) {
      console.error('Error clearing messages:', error);
      await interaction.reply({ 
        content: '❌ There was an error trying to delete messages. Messages older than 14 days cannot be bulk deleted.', 
        ephemeral: true 
      });
    }
  },
};