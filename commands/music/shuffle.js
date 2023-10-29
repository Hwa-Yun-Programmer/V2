const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'shuffle',
    description: '재생목록을 섞을수 있어요!',
    voiceChannel: true,

    async execute({ inter }) {
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

        if (!queue.tracks.toArray()[0])
            return inter
                .editReply({
                    content: '❌ 재생목록에 다음노래가 없어요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        await queue.tracks.shuffle().catch((err) => console.log(err));

        const ShuffleEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `✅ ${queue.tracks.size} 개의 노래가 섞였어요!` });

        return inter.editReply({ embeds: [ShuffleEmbed] }).then((msg) => {
            setTimeout(() => msg.delete(), 10000);
        });
    },
};
