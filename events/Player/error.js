const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {
    const ErrorEmbed = new EmbedBuilder()
        .setAuthor({
            name: `도비가 고장났어요!`,
            iconURL: track.thumbnail,
        })
        .setColor('#EE4B2B');

    queue.metadata.send({ embeds: [ErrorEmbed] }).then((msg) => {
        setTimeout(() => msg.delete(), 10000);
    });

    console.log(`도비가 고장났어요! ${error.message}`);
};
