const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'resume',
    description: '노래를 재생할수있어요!',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer();

        const queue = useQueue(inter.guild);

        if (!queue)
            return inter
                .editReply({
                    content: '❌ 노래가 재생중이지 않아요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        if (queue.node.isPlaying())
            return inter
                .editReply({
                    content: '❌ 노래가 이미 재생중이에요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        const success = queue.node.resume().catch((err) => console.log(err));

        const ResumeEmbed = new EmbedBuilder()
            .setAuthor({
                name: success ? `✅ **${queue.currentTrack.title}** 노래를 다시 재생했어요!` : '❌ 먼가 잘못됬어요!',
            })
            .setColor('#2f3136');

        return inter.editReply({ embeds: [ResumeEmbed] });
    },
};
