const { QueryType, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    description: '노래를 재생해요!',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: '재생하고 싶은 노래를 입력해주세요!',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    async execute({ inter, client }) {
        const player = useMainPlayer();

        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO,
        });
        const NoResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: '❌ 도비가 노래를 못찾았어요!' })
            .setColor('#2f3136');

        if (!res || !res.tracks.length) {
            return inter.editReply({ embeds: [NoResultsEmbed] }).then((msg) => {
                setTimeout(() => msg.delete(), 10000);
            });
        }

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.volume,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);

            const NoVoiceEmbed = new EmbedBuilder()
                .setAuthor({ name: '❌ 도비가 보이스채널에 들어갈수 없어요!' })
                .setColor('#2f3136');

            return inter.editReply({ embeds: [NoVoiceEmbed] }).then((msg) => {
                setTimeout(() => msg.delete(), 10000);
            });
        }

        const playEmbed = new EmbedBuilder().setAuthor({ name: '✅ 재생목록에 추가되었어요!' }).setColor('#2f3136');

        await inter.editReply({ embeds: [playEmbed] });

        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.isPlaying()) await queue.node.play();
    },
};
