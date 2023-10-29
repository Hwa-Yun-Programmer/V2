const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'volume',
    description: '볼륨을 조절 할수있어요!',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: '볼륨',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol,
        },
    ],

    execute({ inter }) {
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
        const vol = inter.options.getNumber('volume');

        if (queue.node.volume === vol)
            return inter
                .editReply({
                    content: '❌ 변경할려는 볼륨값이 이미 설정되어있어요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        const success = queue.node.setVolume(vol).catch((err) => console.log(err));

        return inter
            .editReply({
                content: success ? `🔊 볼륨이 ${vol}/${maxVol}% 으로 변경됬어요!` : '❌ 먼가 잘못됬어요!',
            })
            .then((msg) => {
                setTimeout(() => msg.delete(), 10000);
            });
    },
};
