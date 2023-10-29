const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {
    const emptyQueue = new EmbedBuilder()
        .setAuthor({ name: '❌ 재생목록이 더이상 없어요! 도비는 이제 자유의 몸이에요.' })
        .setColor('#2f3136');

    queue.metadata.send({ embeds: [emptyQueue] }).then((msg) => {
        setTimeout(() => msg.delete(), 10000);
    });
};
