const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Sends a dm to the user for verification."),
  async execute(interaction) {
    // const row = new ActionRowBuilder().addComponents(
    //   new ButtonBuilder()
    //     .setCustomId("verify_button")
    //     .setLabel("Verify Me!")
    //     .setStyle(ButtonStyle.Success)
    // );
    // console.log("Made the button");
    // const verMsg = await interaction.member.send({
    //   content:
    //     "Welcome to the Training Grounds Server! Please verify yourself by clicking the button below:",
    //   components: [row],
    // });
    await interaction.reply("pong");
  }
};
