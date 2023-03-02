const { Botkit } = require('botkit')
const { SlackAdapter, SlackEventMiddleware } = require('botbuilder-adapter-slack')
var CronJob = require('cron').CronJob

const dotenv = require('dotenv');
dotenv.config();

const adapter = new SlackAdapter({
    clientSigningSecret: process.env.SIGNING_SECRET,
    botToken: process.env.BOT_TOKEN
})

adapter.use(new SlackEventMiddleware())

const controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter: adapter
})

controller.ready(() => {
    controller.hears(['test (.*)'], ['message', 'direct_message'],
        async (bot, message) => {
            await bot.reply(message,':smile_cat:')
        })
})

console.log("Debug list users")

/*var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.BOT_TOKEN
}).startRTM()*/

controller.on('rtm_open', (bot) => {
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

/*
    const userId = 'USER_ID';
    const message = 'Hello!';

    bot.api.im.open({ user: userId }, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        const dmChannel = res.channel.id;
        bot.say({ text: message, channel: dmChannel });
    });
*/

new CronJob('00 * * * * 1-5' , function() { // 00 00 09 * * 1-5
    console.log(`Daily check ${new Date()}`)
}, {}, true, timeZone = 'Europe/Paris')
