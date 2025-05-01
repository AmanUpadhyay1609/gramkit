# Grammy Bot Advanced Setup

A production-ready Telegram bot starter template built with Grammy.js, featuring Redis session management, MongoDB integration, TypeScript support, and a robust architecture.

## Features

- 🤖 Built with [Grammy](https://grammy.dev/) framework
- 📡 Supports both Webhook and Polling modes
- 💾 Redis-based session management
- 🗄️ MongoDB integration
- 🔒 Type-safe with TypeScript
- 🚀 Production-ready error handling
- 📝 Comprehensive logging system
- 🔄 Graceful shutdown support
- 🛠️ Express server included for webhooks
- 🎯 Middleware-based architecture

## Prerequisites

- Node.js (>=16.20.1)
- Redis server
- MongoDB instance
- Telegram Bot Token

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/AmanUpadhyay1609/gramkit
cd gramkit
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
BOT_TOKEN=your_bot_token
BOT_USERNAME=your_bot_username
REDIS_URL=your_redis_url
MONGO_URL=your_mongodb_url
```

5. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── bot/
│   ├── context/       # Custom context definitions
│   ├── features/      # Bot commands and features
│   ├── helper/        # Utility functions
│   ├── middlewares/   # Custom middlewares
│   ├── server/        # Express server setup
│   └── index.ts       # Bot initialization
├── config.ts          # Configuration management
├── logger.ts          # Logging setup
└── index.ts          # Application entry point
```

## Configuration

The bot can be configured using environment variables. See `.env.example` for all available options.

### Key Configuration Options:

- `BOT_MODE`: Choose between 'polling' or 'webhook'
- `NODE_ENV`: 'development' or 'production'
- `LOG_LEVEL`: Logging verbosity
- `BOT_WEBHOOK_URL`: Required for webhook mode
- `HTTP_SERVER_PORT`: Server port (default: 3000)

## Session Management

Sessions are stored in Redis for better scalability. The session structure can be modified in `src/bot/middlewares/session.ts`.

Example session data:
```typescript
{
  var1: string;
  var2: number;
}
```

## Adding New Features

1. Create a new feature file in `src/bot/features/`
2. Use the Composer pattern:
```typescript
const composer = new Composer<CustomContext>();
// Add your commands/handlers
export { composer as yourFeature };
```
3. Register your feature in `src/bot/index.ts`

## Database Operations

MongoDB connection is pre-configured. Example usage:

```typescript
import db from "../bot/helper/connectDB";
// Your database operations here
```

## Production Deployment

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

⚠️ **Important: Before Running Docker Compose**

If you have MongoDB or Redis installed locally, you might encounter port conflicts as the Docker containers use the default ports:
- MongoDB: Port 27017
- Redis: Port 6379

You might see errors like:
```bash
Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint grammy-mongo: failed to bind host port for 0.0.0.0:27017: address already in use
```

To resolve this, either:

1. Stop local services before running docker-compose:
```bash
# For MongoDB
sudo systemctl stop mongod.service

# For Redis
sudo systemctl stop redis-server
```

2. OR modify the ports in docker-compose.yml to use different port mappings:
```yaml
mongo:
  ports:
    - "27018:27017"  # Use 27018 instead of 27017

redis:
  ports:
    - "6380:6379"    # Use 6380 instead of 6379
```

### Starting the Services

Once you've handled any potential port conflicts:

1. Build and start all services:
```bash
docker-compose up -d
```

2. View logs:
```bash
docker-compose logs -f bot
```

3. Stop all services:
```bash
docker-compose down
```

### Using Docker

1. Build the image:
```bash
docker build -t grammy-bot .
```

2. Run the container:
```bash
docker run -d \
  --name grammy-bot \
  -p 3002:3002 \
  -e BOT_TOKEN=your_bot_token \
  -e BOT_USERNAME=your_bot_username \
  -e REDIS_URL=redis://your-redis-host:6379 \
  -e MONGO_URL=mongodb://your-mongo-host:27017/grammy-bot \
  grammy-bot
```

### Environment Variables in Docker

When using Docker, you can:
1. Create a `.env` file and use `--env-file .env` flag
2. Pass variables directly using `-e` flag
3. Use environment variables from your system

### Volumes

The following volumes are created:
- `redis-data`: Persists Redis data
- `mongo-data`: Persists MongoDB data
- `./logs`: Stores application logs

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Developer's Guide: Core Bot Interactions

When developing with this template, there are three main types of interactions you'll handle:

### 1. Commands (`src/bot/features/welcome.ts`)
Commands are messages that start with "/" (e.g., /start, /help). Handle these in `welcome.ts`:

```typescript
feature.command("start", logHandle("command-start"), async (ctx) => {
  ctx.api.sendMessage(ctx.chat.id, "Welcome message");
});

// Add more commands as needed:
feature.command("help", logHandle("command-help"), async (ctx) => {
  ctx.api.sendMessage(ctx.chat.id, "Help message");
});
```

Don't forget to register new commands in `src/bot/helper/createMenu.ts` if you want them visible in Telegram's command menu.

### 2. Button Clicks (`src/bot/features/unhandled.ts`)
When users click inline keyboard buttons, handle the callbacks in `unhandled.ts`:

```typescript
feature
  .filter((ctx) => ctx.callbackQuery?.data === "button_id")
  .on("callback_query", async (ctx) => {
    // Handle button click
    ctx.api.sendMessage(ctx.chat.id, "Button clicked!");
  });
```

### 3. Message Handling
Messages from users are handled in two ways:

#### a. Regular Messages (`src/bot/features/handleMessageWithoutReply.ts`)
For normal text messages:
```typescript
export const handleMessageWithoutReply = async (ctx: any) => {
  let text = ctx.message.text;
  // Add your logic here
  // Example: AI processing, command parsing, etc.
};
```

#### b. Reply Messages (`src/bot/features/handleMessageWithReply.ts`)
For messages sent in reply to bot's messages (force reply):
```typescript
export const handleMessageWithReply = async (ctx: any) => {
  let text = ctx.message.text;
  // Handle replies to specific bot questions
  // Example: Form filling, multi-step processes
};
```

### Development Flow
1. Identify the type of interaction you want to handle
2. Go to the corresponding file:
   - Commands → `welcome.ts`
   - Button clicks → `unhandled.ts`
   - Messages → `handleMessageWithReply.ts` or `handleMessageWithoutReply.ts`
3. Add your logic using the Grammy.js API
4. Test your changes

### Example Use Cases
- Multi-step registration process
- Interactive menus
- Form filling
- AI-powered conversations
- Data collection and processing
- Integration with external APIs
- Custom keyboard layouts
- Media handling

The architecture is designed to be extensible - you can build complex features while maintaining clean, organized code. The sky's the limit - from simple command responses to complex conversational flows, everything is possible with this structure.
