const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'queue',
    description: '현재 재생목록을 확인할수 있어요!',
    voiceChannel: true,

    execute({ client, inter }) {
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

        if (!queue.tracks.toArray()[0])
            return inter
                .editReply({
                    content: '❌ 재생목록에 다음노래가 없어요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.size;

        const nextSongs =
            songs > 5
                ? `재생목록에 **${songs - 5}** 곡의 노래가 대기중이에요!`
                : `재생목록에 **${songs}** 곡의 노래가 대기중이에요!`;

        const tracks = queue.tracks.map(
            (track, i) => `**${i + 1}** - ${track.title} | ${track.author} (신청자 : ${track.requestedBy.username})`,
        );

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
            .setAuthor({
                name: `재생목록 - ${inter.guild.name} ${methods[queue.repeatMode]}`,
                iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
            })
            .setDescription(
                `현재 재생중인 노래에요! - ** ${queue.currentTrack.title} **\n\n${tracks
                    .slice(0, 5)
                    .join('\n')}\n\n${nextSongs}`,
            )
            .setTimestamp()
            .setFooter({ text: 'Made By Dobby.', iconURL: inter.member.avatarURL({ dynamic: true }) });

        inter.editReply({ embeds: [embed] });
    },
};
