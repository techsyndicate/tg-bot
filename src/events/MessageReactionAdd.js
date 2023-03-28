const { Events } = require("discord.js");
const { roleIds, embed_id } = require("./variables.js");

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        return;
      }
    }
    const message = reaction.message;
    const emoji = reaction.emoji.name;
    const member = message.guild.members.cache.get(user.id);

    if (message.id === embed_id) {
      if (emoji in roleIds) {
        await member.roles.add(roleIds[emoji]);
      }
    }
  },
};
