const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'clear',
    description: '재생목록을 초기화할수있어요!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        const player = useMainPlayer();

        if (!queue || !queue.isPlaying())
            return inter
                .editReply({
                    content: '❌ 노래가 재생중이지 않아요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        if (!queue.tracks.toArray()[1])
            return inter
                .editReply({
                    content: '❌ 재생목록에 다음노래가 없어요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        await queue.tracks.clear().catch((err) => console.log(err));

        const ClearEmbed = new EmbedBuilder().setAuthor({ name: '🗑️ 재생목록을 모두 지웠어요!' }).setColor('#2f3136');

        inter.editReply({ embeds: [ClearEmbed] });
    },
};
