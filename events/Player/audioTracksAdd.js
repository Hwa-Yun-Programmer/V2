const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
    if (!client.config.app.ExtraMessages) return;

    const audioTracksAdd = new EmbedBuilder()
        .setAuthor({ name: '✅ 해당 목록을 전부 재생목록에 추가했어요!' })
        .setColor('#2f3136');

    queue.metadata.send({ embeds: [audioTracksAdd] });
};
