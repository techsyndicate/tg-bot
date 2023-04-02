const {
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("verify_button")
    .setLabel("Verify Me!")
    .setStyle(ButtonStyle.Success)
);

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.content.startsWith("!verify-members")) {
      const unverified = message.guild.members.cache.filter(
        (member) => !member.roles.cache.has("1056208744977023086")
      );
      unverified.forEach(async (member) => {
        let verMsg = null;
        if (member.user.bot) {
          console.log("Found bot");
          return;
        }
        try {
          verMsg = await member.send({
            content:
              "Welcome to the Training Grounds Server! Please verify yourself by clicking the button below:",
            components: [row],
          });
        } catch (err) {
          message.guild.channels.cache
            .get("1056208680313421954")
            .send(
              `Unable to send verification message to <@${member.user.id}> Please enable your privacy settings.`
            );
          return;
        }

        const filter = (interaction) =>
          interaction.customId === "verify_button" &&
          interaction.user.id === member.id;
        const collector = verMsg.createMessageComponentCollector({
          filter,
          time: 1500000,
        });
        collector.on("collect", async (interaction) => {
          try {
            await member.roles.add("1056208744977023086");
            interaction.reply({
              content:
                "You have been verified! Please select your events in the #tg-events channel.",
              ephemeral: true,
            });
          } catch (err) {
            console.error(err);
          }
        });
      });
    }
  },
};
