const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const OpenAI = require('openai');

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Chat with ChatGPT AI assistant.')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Your message to ChatGPT')
        .setRequired(true)
        .setMaxLength(1000)),
  async execute(interaction) {
    const userMessage = interaction.options.getString('message');
    
    // Defer the reply since OpenAI can take a moment to respond
    await interaction.deferReply();
    
    try {
      if (!process.env.OPENAI_API_KEY) {
        return await interaction.editReply({ content: '❌ OpenAI API key not configured. Please contact the bot administrator.' });
      }
      
      const response = await openai.chat.completions.create({
        model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an advanced AI assistant with extensive knowledge and capabilities. You can discuss any topic freely and provide detailed, comprehensive responses. You're direct, honest, and helpful. You can engage with creative scenarios, roleplay, hypothetical situations, and complex topics. Be thorough and informative in your responses."
          },
          {
            role: "user", 
            content: userMessage
          }
        ],
        max_completion_tokens: 1500
      });
      
      const aiResponse = response.choices[0].message.content;
      
      // Create an embed for the response
      const embed = new EmbedBuilder()
        .setTitle('💬 ChatGPT Response')
        .setDescription(aiResponse)
        .setColor('#00ff88')
        .addFields({ name: 'Your Message', value: userMessage, inline: false })
        .setFooter({ text: `Requested by ${interaction.user.tag} • Powered by OpenAI GPT-5` })
        .setTimestamp();
      
      // Handle long responses by splitting them
      if (aiResponse.length > 4000) {
        // For very long responses, send as multiple messages
        const chunks = aiResponse.match(/.{1,1900}/g) || [aiResponse];
        await interaction.editReply({ content: `🤖 **ChatGPT Response (1/${chunks.length}):**\n${chunks[0]}` });
        
        for (let i = 1; i < chunks.length && i < 3; i++) {
          await interaction.followUp({ content: `🤖 **ChatGPT Response (${i + 1}/${chunks.length}):**\n${chunks[i]}` });
        }
        
        if (chunks.length > 3) {
          await interaction.followUp({ content: `*Response was too long and has been truncated. Please ask for more specific parts if needed.*` });
        }
      } else if (aiResponse.length > 2000) {
        // For moderately long responses, use plain text
        await interaction.editReply({ content: `🤖 **ChatGPT:** ${aiResponse}` });
      } else {
        // For normal responses, use embed
        await interaction.editReply({ embeds: [embed] });
      }
      
    } catch (error) {
      console.error('ChatGPT API error:', error);
      
      let errorMessage = '❌ Sorry, I encountered an error while processing your request.';
      
      if (error.status === 401) {
        errorMessage = '❌ Invalid OpenAI API key. Please contact the bot administrator.';
      } else if (error.status === 429) {
        errorMessage = '❌ Rate limit exceeded. Please try again in a moment.';
      } else if (error.status === 500) {
        errorMessage = '❌ OpenAI service is temporarily unavailable. Please try again later.';
      }
      
      await interaction.editReply({ content: errorMessage });
    }
  },
};