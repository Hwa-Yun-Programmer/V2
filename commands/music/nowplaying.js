const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'nowplaying',
    description: '지금 재생중인 노래를 확인할수 있어요!',
    voiceChannel: true,

    execute({ inter }) {
        const queue = useQueue(inter.guild);
        const player = useMainPlayer();

        if (!queue)
            return inter
                .editReply({
                    content: `❌ 노래가 재생중이 아니에요!. `,
                    ephemeral: true,
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 10000);
                });

        const track = queue.currentTrack;

        const methods = ['비활성화', '현재노래', '재생목록'];

        const timestamp = track.duration;

        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const progress = queue.node.createProgressBar();

        const embed = new EmbedBuilder()
            .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setThumbnail(track.thumbnail)
            .setDescription(
                `볼륨 : **${queue.node.volume}**%\n재생시간 : **${trackDuration}**\nProgress ${progress}\n반복 설정 **${
                    methods[queue.repeatMode]
                }**\n신청자 ${track.requestedBy}`,
            )
            .setFooter({
                iconURL: inter.member.avatarURL({ dynamic: true }),
            })
            .setColor('#2f3136')
            .setTimestamp();

        const saveButton = new ButtonBuilder()
            .setLabel('💿')
            .setCustomId(JSON.stringify({ ffb: 'savetrack' }))
            .setStyle('Secondary');

        const volumeup = new ButtonBuilder()
            .setLabel('🔼')
            .setCustomId(JSON.stringify({ ffb: 'volumeup' }))
            .setStyle('Secondary');

        const volumedown = new ButtonBuilder()
            .setLabel('🔽')
            .setCustomId(JSON.stringify({ ffb: 'volumedown' }))
            .setStyle('Secondary');

        const loop = new ButtonBuilder()
            .setLabel('🔁')
            .setCustomId(JSON.stringify({ ffb: 'loop' }))
            .setStyle('Secondary');

        const resumepause = new ButtonBuilder()
            .setLabel('⏯')
            .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
            .setStyle('Secondary');

        const row = new ActionRowBuilder().addComponents(volumeup, volumedown, saveButton, resumepause, loop);

        inter.editReply({ embeds: [embed], components: [row] });
    },
};
