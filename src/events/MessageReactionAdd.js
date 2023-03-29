const { Events } = require("discord.js");
const Embed = require("../models/embeds");

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    let res = await Embed.findOne({ embed_id: reaction.message.id });
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        return;
      }
    }
    const emoji = reaction.emoji.name;
    const member = reaction.message.guild.members.cache.get(user.id);

    if (res != null) {
      roleAr = res.roles;
      emojiAr = res.emojis;
      for (var i in emojiAr) {
        if (emojiAr[i] == emoji) {
          member.roles.add(roleAr[i]);
        }
      }
    }
  },
};
