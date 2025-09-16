const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .addUserOption(option => 
      option.setName('target')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false))
    .addIntegerOption(option =>
      option.setName('delete_days')
        .setDescription('Delete messages from the past X days (0-7)')
        .setMinValue(0)
        .setMaxValue(7)
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const deleteDays = interaction.options.getInteger('delete_days') || 0;
    
    try {
      const member = await interaction.guild.members.fetch(target.id).catch(() => null);
      
      if (member && !member.bannable) {
        return await interaction.reply({ content: '❌ I cannot ban this user. They may have higher permissions than me.', ephemeral: true });
      }
      
      await interaction.guild.members.ban(target.id, { 
        reason: reason,
        deleteMessageSeconds: deleteDays * 24 * 60 * 60
      });
      
      await interaction.reply(`✅ ${target.tag} has been banned. Reason: ${reason}`);
    } catch (error) {
      console.error('Error banning user:', error);
      await interaction.reply({ content: '❌ There was an error trying to ban this user.', ephemeral: true });
    }
  },
};