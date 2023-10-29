const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'stop',
    description: '노래를 정지합니다!',
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

        queue.delete();

        const StopEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: '✅ 노래를 정지했어요! 도비는 이제 자유에요~' });

        return inter.editReply({ embeds: [StopEmbed] });
    },
};
