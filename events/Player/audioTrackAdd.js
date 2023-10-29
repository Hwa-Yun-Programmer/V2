const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
    if (!client.config.app.ExtraMessages) return;

    const audioTrackAdd = new EmbedBuilder()
        .setAuthor({ name: `✅ 재생목록에 추가했어요! - ${track.title}  `, iconURL: track.thumbnail })
        .setColor('#2f3136');

    queue.metadata.send({ embeds: [audioTrackAdd] });
};
