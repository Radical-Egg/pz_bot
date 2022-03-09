require('dotenv').config(); //initialize dotenv
const { Client, Intents } = require('discord.js');
const { default: axios } = require('axios');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

function requestRestart() {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.PZ_SERVER}:9000/restart`)
        .then((response) => {
            if (response.data.status != 0) {
                reject(response.data)
            }
            resolve(response.data)
        })
        .catch((err) => {
            reject(err.data)
        })
    })
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('messageCreate', (message) => {
    switch (message.content.toLocaleLowerCase()) {
        case "!restartpz":
            message.channel.send("Restarting pz")
            requestRestart()
            .then((res) => {
                message.channel.send(res.message)
            })
            .catch((err) => {
                message.channel.send("Having some trouble restarting this service - check logs for details")
                console.log(err)
            })
            break;
    }
});
client.login(process.env.CLIENT_TOKEN); //login bot using token