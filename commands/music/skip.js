const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'skip',
    description: '노래를 건너뛸수있어요!',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer();

        const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying())
            return inter
                .editReply({
                    content: '❌ 노래가 재생중이지 않아요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        const success = queue.node.skip().catch((err) => console.log(err));

        const SkipEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({
                name: success ? `✅ ** ${queue.currentTrack.title} ** 노래를 건너뛰었어요!` : '❌ 먼가 잘못됬어요!',
            })
            .then((msg) => {
                setTimeout(() => msg.delete(), 10000);
            });

        return inter.editReply({ embeds: [SkipEmbed] });
    },
};
