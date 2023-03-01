const { Botkit } = require('botkit')
const { SlackAdapter, SlackEventMiddleware } = require('botbuilder-adapter-slack')

const dotenv = require('dotenv');
dotenv.config();

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
    controller.hears(['test'], ['direct_message'],
        async (bot, message) => {
            await bot.reply(message, message + ':smile_cat:')
        })
})

console.log("Debug list users")

controller.on('bot_ready', (bot) => {
    console.log(`Le bot ${bot.identity.name} est en ligne !`);

    bot.api.users.list({}, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        const users = res.members.filter((user) => !user.is_bot && !user.deleted);
        users.forEach((user) => console.log(user.name, user.id));
    });
});
