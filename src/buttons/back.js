module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying())
        return inter.editReply({ content: '❌ 노래가 재생중이지 않아요!', ephemeral: true });

    if (!queue.history.previousTrack)
        return inter.editReply({
            content: '❌ 이전에 재생한 노래가 없어요!',
            ephemeral: true,
        });

    await queue.history.back();

    inter.editReply({ content: '✅ 이전에 재생한 노래를 재생합니다!', ephemeral: true });
};
