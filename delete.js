const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = 'MTA5NDgxNDMyNDg2Mzc5NTI5MA.GBFyro.Czf_s4qDz9kOQ89Y9QS-hrCmyezYXrss6-d4Mc';
const clientId = '1094814324863795290';
const guildId = '1010141140789514280';

const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId)).then((data) => {
    const promises = [];
    for (const command of data) {
        rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
    }
    console.log('삭제완료');
    return Promise.all(promises);
});
