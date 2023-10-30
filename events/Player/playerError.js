const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {
    const ErrorEmbed = new EmbedBuilder()
        .setAuthor({
            name: `도비가 고장났어요!`,
        })
        .setColor('#EE4B2B');

    queue.metadata.send({ embeds: [ErrorEmbed] });

    console.log(`도비가 고장났어요! ${error.message}`);
};
