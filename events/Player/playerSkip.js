const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
    const playerSkip = new EmbedBuilder()
        .setAuthor({ name: `오류로 인해 **${track.title}** 를 스킵해요! ❌`, iconURL: track.thumbnail })
        .setColor('#EE4B2B');

    queue.metadata.send({ embeds: [playerSkip] });
};
