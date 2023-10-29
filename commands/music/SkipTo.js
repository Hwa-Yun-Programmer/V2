const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'skipto',
    description: '재생목록의 특정 노래로 건너뜁니다!',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '원하는 노래 제목으로 건너뛸수 있어요!',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: '원하는 노래 번호로 건너뛸수 있어요!',
            type: ApplicationCommandOptionType.Number,
            required: false,
        },
    ],

    async execute({ inter }) {
        const player = useMainPlayer();

        const track = inter.options.getString('song');
        const number = inter.options.getNumber('number');

        const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying())
            return inter.editReply({
                content: '❌ 노래가 재생중이지 않아요!',
                ephemeral: true,
            });
        if (!track && !number)
            inter.editReply({
                content: '❌ 원하는 노래로 건너뛸려면 옵션 중 하나를 사용해야해요!',
                ephemeral: true,
            });

        if (track) {
            const track_skipto = queue.tracks
                .toArray()
                .find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track);
            if (!track_skipto)
                return inter.editReply({
                    content: `❌ ${track}을 찾을수 없어요! 노래의 전체 제목이나 링크을 이용해보실래요?`,
                    ephemeral: true,
                });
            queue.node.skipTo(track_skipto).catch((err) => console.log(err));
            return inter.editReply({ content: `✅ **${track_skipto.title}** 노래로 건너뛰었어요!` });
        }
        if (number) {
            const index = number - 1;
            const trackname = queue.tracks.toArray()[index].title;
            if (!trackname)
                return inter.editReply({
                    content: '❌ 해당 번호의 노래가 존재하지 않아요!',
                    ephemeral: true,
                });
            queue.node.skipTo(index).catch((err) => console.log(err));

            const skipToEmbed = new EmbedBuilder()
                .setAuthor({ name: `✅ **${trackname}** 노래로 건너뛰었어요!` })
                .setColor('#2f3136');

            inter.editReply({ embeds: [skipToEmbed] });
        }
    },
};
