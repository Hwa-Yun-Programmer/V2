const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => {
    if (!queue || !queue.isPlaying())
        return inter.editReply({ content: '❌ 노래가 재생중이지 않아요!', ephemeral: true });

    queue.delete();

    const StopEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `Music stopped into this server, see you next time ✅` });

    return inter.editReply({ embeds: [StopEmbed], ephemeral: true });
};
