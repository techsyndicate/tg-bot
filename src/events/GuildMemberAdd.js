const {
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    console.log("New member has joined");
    try {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("verify_button")
          .setLabel("Verify Me!")
          .setStyle(ButtonStyle.Success)
      );
      console.log("Made the button");
      const verMsg = await member.send({
        content:
          "Welcome to the Training Grounds Server! Please verify yourself by clicking the button below:",
        components: [row],
      });
      console.log("Sent the message");
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
    } catch (err) {
      console.error(err);
    }
  },
};
