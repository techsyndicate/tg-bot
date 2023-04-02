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
    /*if (message.content.startsWith("!verify-members")) {
      const members = message.guild.members;
      let unverified = [];
      members.forEach((member) => {
        if (!member.roles.cache.has("1056208744977023086")) {
          unverified.push(member);
        }
      });
      unverified.forEach(async (member) => {
        const verMsg = await member.send({
          content:
            "Welcome to the Training Grounds Server! Please verify yourself by clicking the button below:",
          components: [row],
        });

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
    */
    console.log("heheha");
  },
};
