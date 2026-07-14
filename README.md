# Discord Bot X 🤖

A comprehensive, feature-rich Discord bot built with Discord.js v14, featuring moderation tools, fun commands, utilities, server management, and **ChatGPT AI integration** powered by OpenAI's latest GPT-5 model.

![Discord Bot](https://img.shields.io/badge/Discord-Bot-7289da?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--5-412991?style=for-the-badge&logo=openai&logoColor=white)

## 🌟 Features

### 🛡️ Moderation Commands
- **Ban Management** - Ban users with customizable message deletion and reason tracking
- **Kick Users** - Remove disruptive members with reason logging
- **Timeout System** - Mute users for specified durations (1 minute to 7 days)
- **Unmute Function** - Remove timeouts from users
- **Message Cleanup** - Bulk delete messages (1-100 at once) with smart error handling

### 🎮 Fun & Entertainment
- **Magic 8-Ball** - Get mystical answers to your burning questions
- **Random Jokes** - Fetch jokes from API with offline fallback jokes
- **Dice Rolling** - Roll custom dice with configurable sides and quantities
- **Coin Flip** - Classic heads or tails decision maker
- **Interactive Polls** - Create polls with up to 5 voting options and emoji reactions

### 🔧 Utility Commands
- **Latency Check** - Monitor bot response times
- **Uptime Display** - See how long the bot has been running
- **Help System** - Comprehensive command documentation
- **Reminder Service** - Set personal reminders with minute precision
- **Weather Information** - Get current weather for any location worldwide

### 📊 Information & Social
- **User Profiles** - Detailed user information with join dates and roles
- **Server Statistics** - Complete server information including member counts and boost status
- **Avatar Display** - Show user profile pictures in high quality
- **Message Repeater** - Make the bot say custom messages

### 🤖 AI Integration
- **ChatGPT Conversations** - Full ChatGPT integration using OpenAI's latest GPT-5 model
- **Comprehensive Responses** - Support for detailed, long-form AI responses
- **Multi-message Handling** - Automatically splits long responses across multiple messages
- **Flexible AI Personality** - Configured for open, detailed, and helpful conversations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Discord Application & Bot Token
- OpenAI API Key (for ChatGPT functionality)
- Discord Server with appropriate permissions

### 1. Discord Bot Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to the "Bot" section
4. Create a bot and copy the token
5. Enable necessary bot permissions:
   - Send Messages
   - Use Slash Commands
   - Manage Messages
   - Kick Members
   - Ban Members
   - Moderate Members
   - Add Reactions
   - Read Message History

### 2. OpenAI API Setup
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the key (starts with `sk-`)

### 3. Environment Configuration
Set up the following environment variables in Replit Secrets:

```
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_discord_application_client_id
GUILD_ID=your_discord_server_id
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Installation & Deployment
```bash
# Install dependencies
npm install

# Deploy commands to Discord
npm run register

# Start the bot
npm start
```

## 📋 Command Reference

### Moderation Commands

| Command | Description | Usage | Permissions Required |
|---------|-------------|-------|---------------------|
| `/ban` | Ban a user from the server | `/ban @user [reason] [delete_days]` | Ban Members |
| `/kick` | Kick a user from the server | `/kick @user [reason]` | Kick Members |
| `/mute` | Timeout a user | `/mute @user <duration_minutes> [reason]` | Moderate Members |
| `/unmute` | Remove timeout from user | `/unmute @user [reason]` | Moderate Members |
| `/clear` | Bulk delete messages | `/clear <amount>` | Manage Messages |

### Fun Commands

| Command | Description | Usage | Example |
|---------|-------------|-------|---------|
| `/8ball` | Ask the magic 8-ball | `/8ball <question>` | `/8ball Will it rain today?` |
| `/joke` | Get a random joke | `/joke` | - |
| `/roll` | Roll dice | `/roll [sides] [count]` | `/roll 20 2` |
| `/coinflip` | Flip a coin | `/coinflip` | - |
| `/poll` | Create a poll | `/poll <question> <option1> <option2> [option3-5]` | `/poll Favorite color? Red Blue Green` |

### Utility Commands

| Command | Description | Usage | Notes |
|---------|-------------|-------|-------|
| `/ping` | Check bot latency | `/ping` | Shows response time |
| `/uptime` | Bot uptime | `/uptime` | Days, hours, minutes, seconds |
| `/help` | Command list | `/help` | Shows all available commands |
| `/remind` | Set a reminder | `/remind <message> <minutes>` | Max 7 days (10,080 minutes) |
| `/weather` | Get weather info | `/weather <location>` | Requires API for full functionality |

### Information Commands

| Command | Description | Usage | Features |
|---------|-------------|-------|----------|
| `/userinfo` | User information | `/userinfo [@user]` | Join date, roles, account creation |
| `/serverinfo` | Server statistics | `/serverinfo` | Member count, channels, boost info |
| `/avatar` | Display avatar | `/avatar [@user]` | High-quality profile pictures |
| `/say` | Repeat message | `/say <text>` | Bot repeats your message |

### AI Commands

| Command | Description | Usage | Capabilities |
|---------|-------------|-------|--------------|
| `/chat` | ChatGPT conversation | `/chat <message>` | Full GPT-5 powered conversations |

## 🛠️ Technical Architecture

### Project Structure
```
discord-bot-x/
├── commands/           # Slash command modules
│   ├── moderation/    # Ban, kick, mute, etc.
│   ├── fun/           # Games and entertainment
│   ├── utility/       # Helpful tools
│   └── ai/            # ChatGPT integration
├── events/            # Discord.js event handlers
│   ├── ready.js       # Bot startup
│   └── interactionCreate.js  # Command handling
├── index.js           # Main bot file
├── deploy-commands.js # Command registration
└── package.json       # Dependencies
```

### Core Technologies
- **Discord.js v14** - Modern Discord API wrapper
- **OpenAI Node.js SDK** - GPT-5 integration
- **Node.js 18+** - Runtime environment
- **REST API** - Command deployment

### Advanced Features

#### Enhanced Error Handling
- Comprehensive logging system with timestamps
- Graceful error recovery
- User-friendly error messages
- Automatic retry mechanisms

#### Security Measures
- Environment variable protection
- Permission validation
- Rate limiting awareness
- Input sanitization

#### Performance Optimizations
- Efficient command loading
- Memory management
- Response time optimization
- Smart message chunking for long responses

## 🔧 Configuration Options

### Bot Intents
```javascript
intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.MessageContent
]
```

### OpenAI Configuration
- **Model**: GPT-5 (latest available)
- **Max Tokens**: 1,500 completion tokens
- **Response Handling**: Automatic chunking for long responses
- **Fallback**: Graceful error handling with informative messages

## 📊 Usage Examples

### Moderation Workflow
```
/ban @SpamUser Repeated spam violations 7
/kick @TrollUser Inappropriate behavior
/mute @DisruptiveUser 60 Timeout for 1 hour
/clear 50
```

### Fun Interactions
```
/8ball Should I order pizza?
/roll 20 3
/poll What should we play? Minecraft Valorant Among Us
/joke
```

### AI Conversations
```
/chat Explain quantum physics in simple terms
/chat Write a short story about a robot
/chat Help me debug this JavaScript code: [code]
/chat What are the best practices for Discord bot development?
```

## 🔍 Troubleshooting

### Common Issues

#### Bot Not Responding
1. Check if bot is online in Discord
2. Verify bot permissions in server
3. Ensure commands are deployed: `npm run register`
4. Check console logs for errors

#### ChatGPT Not Working
1. Verify OpenAI API key is valid
2. Check API quota and billing
3. Ensure internet connectivity
4. Review error logs for specific issues

#### Permission Errors
1. Verify bot role hierarchy
2. Check channel-specific permissions
3. Ensure bot has required permissions for commands

### Debug Commands
```bash
# Check bot status
npm start

# Redeploy commands
npm run register

# View detailed logs
# Check the console output for detailed error information
```

### Log Analysis
The bot provides comprehensive logging:
- **INFO**: Command loading, startup events
- **WARN**: Non-critical issues, missing permissions
- **ERROR**: Critical errors with full stack traces

## 🔒 Security Best Practices

### Token Security
- Never commit tokens to version control
- Use environment variables or secure secret management
- Regularly rotate API keys
- Monitor for unauthorized access

### Permission Management
- Follow principle of least privilege
- Regularly audit bot permissions
- Use role-based access control
- Monitor command usage

### Data Protection
- No storage of user messages
- Minimal data collection
- Respect user privacy
- Comply with Discord ToS

## 📈 Performance Monitoring

### Key Metrics
- **Response Time**: Command execution speed
- **Uptime**: Bot availability percentage
- **Error Rate**: Failed command ratio
- **API Usage**: OpenAI token consumption

### Optimization Tips
- Monitor memory usage
- Implement caching where appropriate
- Use efficient data structures
- Regular performance profiling

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Submit pull request

### Code Standards
- Follow ESLint configuration
- Write descriptive commit messages
- Include error handling
- Add command documentation

## 📄 License & Credits

### Dependencies
- [Discord.js](https://discord.js.org/) - Discord API wrapper
- [OpenAI Node.js SDK](https://github.com/openai/openai-node) - AI integration
- [dotenv](https://github.com/motdotla/dotenv) - Environment management

### API Credits
- **OpenAI GPT-5** - Advanced AI capabilities
- **Discord API** - Real-time messaging platform
- **Weather API** - Global weather data

## 🆘 Support

### Getting Help
1. Check this README for common solutions
2. Review console logs for error details
3. Verify all environment variables are set
4. Ensure Discord and OpenAI services are operational

### Error Reporting
When reporting issues, include:
- Full error message from console
- Steps to reproduce
- Bot configuration details
- Discord.js and Node.js versions

## Live showcase

[Open the interactive Vercel case study](https://mangli-commerce-studio.vercel.app/projects/discord-bot-x).

The showcase explains this project's purpose, technical signal, and interaction model. This repository remains the source of truth for the implementation.
