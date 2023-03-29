const { Events } = require("discord.js");
const Embed = require("../models/embeds");

module.exports = {
  name: Events.MessageReactionRemove,
  async execute(reaction, user) {
    let res = null;
    console.log(reaction.message.id);
    Embed.findOne({ embed_id: reaction.message.id }).then((result) => {
      res = result;
    });
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
    console.log(res);
    if (res != null) {
      roleAr = res.roles;
      emojiAr = res.emojis;
      for (var i in emojiAr) {
        if (emojiAr[i] == emoji) {
          console.log("removing role");
          member.roles.remove(roleAr[i]).then(() => {
            console.log("removed role");
          });
        }
      }
    }
  },
};
