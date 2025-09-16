const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Remove timeout from a user.')
    .addUserOption(option => 
      option.setName('target')
        .setDescription('The user to unmute')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for removing the mute')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    
    try {
      const member = await interaction.guild.members.fetch(target.id);
      
      if (!member.isCommunicationDisabled()) {
        return await interaction.reply({ content: '❌ This user is not currently muted.', ephemeral: true });
      }
      
      await member.timeout(null, reason);
      await interaction.reply(`🔊 ${target.tag} has been unmuted. Reason: ${reason}`);
    } catch (error) {
      console.error('Error unmuting user:', error);
      await interaction.reply({ content: '❌ There was an error trying to unmute this user.', ephemeral: true });
    }
  },
};