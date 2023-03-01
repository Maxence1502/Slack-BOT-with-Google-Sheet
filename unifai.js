const { Botkit } = require('botkit')
const { SlackAdapter, SlackEventMiddleware } = require('botbuilder-adapter-slack')

const dotenv = require('dotenv');
dotenv.config();

async function unifaiInit () {
    const adapter = new SlackAdapter({
        clientSigningSecret: process.env.SIGNING_SECRET,
        botToken:  process.env.BOT_TOKEN
    })

    adapter.use(new SlackEventMiddleware())

    const controller = new Botkit({
        webhook_uri: '/api/messages',
        adapter: adapter
    })

    controller.ready(() => {
        controller.hears(['hello', 'hi'], ['message', 'direct_message'],
            async (bot, message) => {
                await bot.reply(message, 'Meow. :smile_cat:')
            })
    })
}

unifaiInit()
