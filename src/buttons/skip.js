module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying())
        return inter.editReply({ content: '❌ 노래가 재생중이지 않아요!', ephemeral: true });

    const success = queue.node.skip();

    return inter.editReply({
        content: success
            ? `Current music ${queue.currentTrack.title} skipped ✅`
            : `Something went wrong ${inter.member}... try again ? ❌`,
        ephemeral: true,
    });
};
