# Discord Bot X

## Overview
A comprehensive Discord.js v14 bot with moderation, fun commands, utilities, and server management features. The bot is fully functional and includes robust error handling, logging, and command deployment.

## Current Features

### Moderation Commands
- `/ban` - Ban users with reason and message deletion options
- `/kick` - Kick users with reason
- `/mute` - Timeout users for specified duration
- `/unmute` - Remove timeout from users  
- `/clear` - Bulk delete messages (1-100)

### Fun Commands
- `/8ball` - Magic 8-ball responses to questions
- `/joke` - Random jokes with API fallback
- `/roll` - Dice rolling with customizable sides and count
- `/coinflip` - Heads or tails coin flip
- `/poll` - Create polls with up to 5 options

### Utility Commands
- `/ping` - Bot latency check
- `/uptime` - Bot uptime display
- `/help` - Command list with descriptions
- `/remind` - Set reminders with minute precision
- `/weather` - Weather information (requires API key for full functionality)

### Information Commands
- `/userinfo` - Detailed user information and server join date
- `/serverinfo` - Server statistics and information
- `/avatar` - Display user avatars
- `/say` - Make the bot repeat messages

### AI Commands
- `/chat` - Chat with ChatGPT AI assistant (powered by GPT-5)

## Architecture
- **Framework**: Discord.js v14 with slash commands
- **Error Handling**: Comprehensive logging system with timestamped logs
- **Intents**: Full guild access including messages, members, and moderation
- **Command System**: Modular command loading from `/commands` directory
- **Event System**: Event handlers in `/events` directory

## Recent Changes (September 16, 2025)
- Enhanced bot intents for full functionality
- Added comprehensive command suite (20 total commands)
- Implemented robust error handling and logging system
- Successfully deployed and tested all commands
- Added ChatGPT integration with GPT-5 model
- Bot is running and fully operational with AI capabilities

## Environment Setup
- Uses Replit Secrets for secure credential management
- Required secrets: DISCORD_TOKEN, CLIENT_ID, GUILD_ID, OPENAI_API_KEY
- Automatic command deployment via `deploy-commands.js`
- OpenAI integration with GPT-5 model for AI chat functionality

## User Preferences
- User requested a fully functional Discord bot with comprehensive features
- Focus on practical moderation and utility commands
- Clean, professional command responses with proper error handling