const { EmbedBuilder, InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = async (client, inter) => {
    await inter.deferReply();
    if (inter.type === InteractionType.ApplicationCommand) {
        const command = client.commands.get(inter.commandName);

        if (command.permissions && !inter.member.permissions.has(command.permissions))
            return inter.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#ff0000')
                        .setDescription(`❌ | 해당 명령어를 사용할 권한을 가지고 있지 않아요!`),
                ],
                ephemeral: true,
            });
        if (command.voiceChannel) {
            if (!inter.member.voice.channel)
                return inter.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#ff0000')
                            .setDescription(`❌ | 이 명령어를 사용할려면 음성채널에 먼저 들어와야해요!`),
                    ],
                    ephemeral: true,
                });
            if (
                inter.guild.members.me.voice.channel &&
                inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id
            )
                return inter.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#ff0000')
                            .setDescription(`❌ | You are not in the same Voice Channel`),
                    ],
                    ephemeral: true,
                });
        }
        command.execute({ inter, client });
    }
    if (inter.type === InteractionType.MessageComponent) {
        const customId = JSON.parse(inter.customId);
        const file_of_button = customId.ffb;
        const queue = useQueue(inter.guild);
        if (file_of_button) {
            delete require.cache[require.resolve(`../../src/buttons/${file_of_button}.js`)];
            const button = require(`../../src/buttons/${file_of_button}.js`);
            if (button) return button({ client, inter, customId, queue });
        }
    }
};
