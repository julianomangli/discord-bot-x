const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Timeout a user (mute them for a specified duration).')
    .addUserOption(option => 
      option.setName('target')
        .setDescription('The user to mute')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration in minutes (1-10080, max 7 days)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(10080))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the mute')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    
    try {
      const member = await interaction.guild.members.fetch(target.id);
      
      if (!member.moderatable) {
        return await interaction.reply({ content: '❌ I cannot mute this user. They may have higher permissions than me.', ephemeral: true });
      }
      
      const timeoutDuration = duration * 60 * 1000; // Convert minutes to milliseconds
      await member.timeout(timeoutDuration, reason);
      
      const timeString = duration < 60 ? `${duration} minutes` : 
                        duration === 60 ? '1 hour' :
                        duration < 1440 ? `${Math.floor(duration / 60)} hours ${duration % 60} minutes` :
                        `${Math.floor(duration / 1440)} days`;
      
      await interaction.reply(`🔇 ${target.tag} has been muted for ${timeString}. Reason: ${reason}`);
    } catch (error) {
      console.error('Error muting user:', error);
      await interaction.reply({ content: '❌ There was an error trying to mute this user.', ephemeral: true });
    }
  },
};