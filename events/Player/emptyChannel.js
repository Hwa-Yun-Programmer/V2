const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {
    const emptyChannel = new EmbedBuilder()
        .setAuthor({ name: '❌ 아무도 없어서 보이스 채널을 떠났어요! 도비는 이제 자유의 몸이에요.' })
        .setColor('#2f3136');

    queue.metadata.send({ embeds: [emptyChannel] }).then((msg) => {
        setTimeout(() => msg.delete(), 10000);
    });
};
