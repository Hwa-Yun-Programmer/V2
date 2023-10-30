const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'pause',
    description: '노래를 일시정지할수 있어요!',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);
        const player = useMainPlayer();

        if (!queue)
            return inter
                .editReply({
                    content: '❌ 노래가 재생중이지 않아요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        if (queue.node.isPaused())
            return inter
                .editReply({
                    content: '❌ 이미 노래가 일시 중지중이에요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        const success = queue.node.setPaused(true);

        const PauseEmbed = new EmbedBuilder()
            .setAuthor({
                name: success ? '✅ 노래가 일시중지 되었어요!' : '❌ 먼가 잘못됬어요!',
            })
            .setColor('#2f3136');

        return inter.editReply({ embeds: [PauseEmbed] });
    },
};
// embed update stoped here
