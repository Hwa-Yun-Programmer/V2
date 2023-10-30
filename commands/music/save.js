const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'save',
    description: '해당 노래의 정보를 DM으로 보내드립니다!',
    voiceChannel: true,

    async execute({ inter }) {
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

        inter.member
            .send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#2f3136')
                        .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                        .setURL(queue.currentTrack.url)
                        .addFields(
                            {
                                name: 'Duration:',
                                value: `\`${queue.currentTrack.duration}\``,
                                inline: true,
                            },
                            { name: 'Song by:', value: `\`${queue.currentTrack.author}\``, inline: true },
                            {
                                name: 'Views :eyes:',
                                value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``,
                                inline: true,
                            },
                            { name: 'Song URL:', value: `\`${queue.currentTrack.url}\`` },
                        )
                        .setThumbnail(queue.currentTrack.thumbnail)
                        .setFooter({
                            text: `from the server ${inter.member.guild.name}`,
                            iconURL: inter.member.guild.iconURL({ dynamic: false }),
                        }),
                ],
            })
            .then(() => {
                return inter
                    .editReply({
                        content: '✅ DM으로 노래정보를 보내드렸어요!',
                        ephemeral: true,
                    })
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 10000);
                    });
            })
            .catch((error) => {
                return inter
                    .editReply({
                        content: '❌ DM으로 노래정보를 보낼수 없어요!',
                        ephemeral: true,
                    })
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 10000);
                    });
            });
    },
};
