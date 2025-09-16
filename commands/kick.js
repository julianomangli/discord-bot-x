const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption(option => 
      option.setName('target')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    
    try {
      const member = await interaction.guild.members.fetch(target.id);
      
      if (!member.kickable) {
        return await interaction.reply({ content: '❌ I cannot kick this user. They may have higher permissions than me.', ephemeral: true });
      }
      
      await member.kick(reason);
      await interaction.reply(`✅ ${target.tag} has been kicked. Reason: ${reason}`);
    } catch (error) {
      console.error('Error kicking user:', error);
      await interaction.reply({ content: '❌ There was an error trying to kick this user.', ephemeral: true });
    }
  },
};