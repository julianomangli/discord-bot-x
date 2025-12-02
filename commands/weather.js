const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Get current weather for a location.')
    .addStringOption(option =>
      option.setName('location')
        .setDescription('The city or location to get weather for')
        .setRequired(true)),
  async execute(interaction) {
    const location = interaction.options.getString('location');
    
    try {
      if (!process.env.OPENWEATHER_API_KEY) {
        return await interaction.reply({ content: '❌ OpenWeather API key not configured. Please contact the bot administrator.', ephemeral: true });
      }

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
      
      if (!response.ok) {
        return await interaction.reply({ content: '❌ Could not find weather data for that location. Try a different city name.', ephemeral: true });
      }
      
      const data = await response.json();
      
      const embed = new EmbedBuilder()
        .setTitle(`🌤️ Weather in ${data.name}, ${data.sys.country}`)
        .setDescription(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1))
        .addFields(
          { name: '🌡️ Temperature', value: `${Math.round(data.main.temp)}°C (${Math.round(data.main.temp * 9/5 + 32)}°F)`, inline: true },
          { name: '🤔 Feels Like', value: `${Math.round(data.main.feels_like)}°C (${Math.round(data.main.feels_like * 9/5 + 32)}°F)`, inline: true },
          { name: '💧 Humidity', value: `${data.main.humidity}%`, inline: true },
          { name: '💨 Wind Speed', value: `${data.wind.speed} m/s`, inline: true },
          { name: '👁️ Visibility', value: data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : 'N/A', inline: true },
          { name: '🌅 Pressure', value: `${data.main.pressure} hPa`, inline: true }
        )
        .setColor('#87CEEB')
        .setFooter({ text: `Requested by ${interaction.user.tag}` })
        .setTimestamp();
      
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Weather API error:', error);
      await interaction.reply({ 
        content: '❌ Weather service is currently unavailable. Please try again later.', 
        ephemeral: true 
      });
    }
  },
};