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
git clone https://github.com/yourusername/grammy-bot-setup.git
cd grammy-bot-setup
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

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.