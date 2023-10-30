const { QueueRepeatMode } = require('discord-player');
module.exports = async ({ inter, queue }) => {
    const methods = ['disabled', 'track', 'queue'];

    if (!queue || !queue.isPlaying())
        return inter.editReply({ content: '❌ 노래가 재생중이지 않아요!', ephemeral: true });

    const repeatMode = queue.repeatMode;

    if (repeatMode === 0) queue.setRepeatMode(QueueRepeatMode.TRACK);

    if (repeatMode === 1) queue.setRepeatMode(QueueRepeatMode.QUEUE);

    if (repeatMode === 2) queue.setRepeatMode(QueueRepeatMode.OFF);

    return inter.editReply({ content: `✅ 노래 반복설정을 **${methods[queue.repeatMode]}**모드로 설정했어요!` });
};
