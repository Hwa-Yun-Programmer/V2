const { QueueRepeatMode, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    description: '반복재생을 설정할수 있어요!',
    voiceChannel: true,
    options: [
        {
            name: 'action',
            description: '원하는 반복재생 옵션을 선택해주세요!',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: '비활성화', value: 'disable_loop' },
                { name: '재생목록', value: 'enable_loop_queue' },
                { name: '해당노래', value: 'enable_loop_song' },
                { name: '자동재생', value: 'enable_autoplay' },
            ],
        },
    ],
    execute({ inter }) {
        const player = useMainPlayer();

        const queue = useQueue(inter.guild);
        let BaseEmbed = new EmbedBuilder().setColor('#2f3136');

        if (!queue || !queue.isPlaying())
            return inter
                .editReply({
                    content: '❌ 노래가 재생중이지 않아요!',
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });
        switch (inter.options._hoistedOptions.map((x) => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK)
                    return inter
                        .editReply({
                            content: '❌ 먼저 현재 음악 반복설정을 해제해야해요!',
                            ephemeral: true,
                        })
                        .then((msg) => {
                            setTimeout(() => msg.delete(), 10000);
                        });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);

                BaseEmbed.setAuthor({
                    name: success ? '❌ 먼가 잘못됬어요!' : '🔁 현재 재생목록이 계속 반복되요!',
                });

                return inter.editReply({ embeds: [BaseEmbed] });
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF)
                    return inter
                        .editReply({
                            content: '❌ 먼저 현재 음악 반복설정을 해제해야해요!',
                            ephemeral: true,
                        })
                        .then((msg) => {
                            setTimeout(() => msg.delete(), 10000);
                        });

                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                BaseEmbed.setAuthor({
                    name: success ? '❌ 먼가 잘못됬어요!' : '🔁 노래가 더이상 반복되지 않아요!',
                });

                return inter.editReply({ embeds: [BaseEmbed] });
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE)
                    return inter
                        .editReply({
                            content: '❌ 먼저 현재 음악 반복설정을 해제해야해요!',
                            ephemeral: true,
                        })
                        .then((msg) => {
                            setTimeout(() => msg.delete(), 10000);
                        });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                BaseEmbed.setAuthor({
                    name: success ? '❌ 먼가 잘못됬어요!' : '🔁 현재 재생중인 노래가 계속 반복되요!',
                });

                return inter.editReply({ embeds: [BaseEmbed] });
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY)
                    return inter
                        .editReply({
                            content: '❌ 먼저 현재 음악 반복설정을 해제해야해요!',
                            ephemeral: true,
                        })
                        .then((msg) => {
                            setTimeout(() => msg.delete(), 10000);
                        });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

                BaseEmbed.setAuthor({
                    name: success
                        ? '❌ 먼가 잘못됬어요!'
                        : '🔁현재 재생중인 노래와 비슷한 곡들로 자동으로 재생목록에 추가되요!',
                });

                return inter.editReply({ embeds: [BaseEmbed] });
            }
        }
    },
};
