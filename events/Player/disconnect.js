const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {
    const Disconnect = new EmbedBuilder().setAuthor({ name: '❌ 보이스 채널을 떠났어요!' }).setColor('#2f3136');

    queue.metadata.send({ embeds: [Disconnect] }).then((msg) => {
        setTimeout(() => msg.delete(), 10000);
    });
};
