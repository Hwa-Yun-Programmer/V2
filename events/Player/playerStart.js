const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
module.exports = (queue, track) => {
    if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
        .setAuthor({ name: `🎧 ${track.title} 를 재생중이에요!`, iconURL: track.thumbnail })
        .setColor('#2f3136');

    const back = new ButtonBuilder()
        .setLabel('⏮')
        .setCustomId(JSON.stringify({ ffb: 'back' }))
        .setStyle('Secondary');

    const skip = new ButtonBuilder()
        .setLabel('⏭')
        .setCustomId(JSON.stringify({ ffb: 'skip' }))
        .setStyle('Secondary');

    const resumepause = new ButtonBuilder()
        .setLabel('⏯')
        .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
        .setStyle('Secondary');

    const loop = new ButtonBuilder()
        .setLabel('🔁')
        .setCustomId(JSON.stringify({ ffb: 'loop' }))
        .setStyle('Secondary');

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, skip);
    queue.metadata.send({ embeds: [embed], components: [row1] });
};
