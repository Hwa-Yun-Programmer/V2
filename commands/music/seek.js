const ms = require('ms');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'seek',
    description: '노래 재생시간을 조절할수 있어요!',
    voiceChannel: true,
    options: [
        {
            name: 'time',
            description: 'time that you want to skip to',
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

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.currentTrack.durationMS)
            return inter
                .editReply({
                    content: '❌ 입력한 값이 현재 노래의 재생시간보다 큽니다!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        await queue.node.seek(timeToMS);

        const SeekEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `✅ 노래를 **${ms(timeToMS, { long: true })}** 로 설정했어요!` });

        inter.editReply({ embeds: [SeekEmbed] }).then((msg) => {
            setTimeout(() => msg.delete(), 10000);
        });
    },
};
