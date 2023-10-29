const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: '다음곡으로 재생하고 싶은 노래를 추가해주세요!',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '다음곡으로 재생하고 싶은 노래를 추가해주세요!',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

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

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO,
        });

        if (!res || !res.tracks.length)
            return inter.editReply({ content: '❌ 도비가 노래를 못찾았어요!', ephemeral: true }).then((msg) => {
                setTimeout(() => msg.delete(), 10000);
            });

        if (res.playlist)
            return inter
                .editReply({
                    content: '❌ 이미 재생목록으로 추가되어있어 추가할수 없어요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        queue.insertTrack(res.tracks[0], 0).catch((err) => console.log(err));

        const PlayNextEmbed = new EmbedBuilder()
            .setAuthor({ name: '🎧 재생목록에 해당 노래가 추가되었어요!' })
            .setColor('#2f3136');

        await inter.editReply({ embeds: [PlayNextEmbed] });
    },
};
