const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'search',
    description: '노래를 검색할수 있어요!',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '찾고싶은 노래를 입력하세요!',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    async execute({ client, inter }) {
        const player = useMainPlayer();

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO,
        });

        if (!res || !res.tracks.length)
            return inter.editReply({ content: '❌ 도비가 노래를 못찾았어요!', ephemeral: true }).then((msg) => {
                setTimeout(() => msg.delete(), 10000);
            });

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({
                name: `**${song}** 에 대한 검색결과에요!`,
                iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
            })
            .setDescription(
                `${maxTracks
                    .map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`)
                    .join('\n')}\n\n**1** 에서 **${maxTracks.length}**까지 선택하거나 **취소** 를 입력해주세요!`,
            )
            .setTimestamp()
            .setFooter({
                text: 'Made by Dobby',
                iconURL: inter.member.avatarURL({ dynamic: true }),
            });

        inter.editReply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: (m) => m.author.id === inter.member.id,
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === '취소')
                return inter.followUp({ content: '✅ 검색이 취소되었어요!', ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length)
                return inter
                    .followUp({
                        content: `❌ 입력값이 올바르지 않아요! **1** 에서 **${maxTracks.length}**까지 선택하거나 **취소** 를 입력해주세요!`,
                        ephemeral: true,
                    })
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 10000);
                    });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                return inter
                    .followUp({
                        content: '❌ 도비가 보이스채널에 들어갈수 없어요!',
                        ephemeral: true,
                    })
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 10000);
                    });
            }

            await inter.followUp('✅ 재생목록에 추가되었어요!');

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.isPlaying()) await queue.node.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time')
                return inter
                    .followUp({
                        content: '❌ 입력가능한 시간이 지났어요!',
                        ephemeral: true,
                    })
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 10000);
                    });
        });
    },
};
