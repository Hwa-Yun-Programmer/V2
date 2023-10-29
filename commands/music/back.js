const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');
module.exports = {
    name: 'back',
    description: '이전 노래로 돌아가요!',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer();

        const queue = useQueue(inter.guild);

        if (!queue || !queue.node.isPlaying())
            return inter
                .editReply({
                    content: '❌ 노래가 재생중이지 않아요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        if (!queue.history.previousTrack)
            return inter
                .editReply({
                    content: '❌ 이전에 재생한 노래가 없어요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        await queue.history.back();

        const BackEmbed = new EmbedBuilder()
            .setAuthor({ name: '✅ 이전 노래로 돌아갔어요!', ephemeral: true })
            .setColor('#2f3136')
            .then((msg) => {
                setTimeout(() => msg.delete(), 10000);
            });

        inter.editReply({ embeds: [BackEmbed] });
    },
};
