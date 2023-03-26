client.on("messageReactionRemove", async (reaction, user) => {
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

  if (message.id === "1089155017719685121") {
    switch (emoji) {
      case "🖥️":
        await member.roles.remove(roleIds.webd);
        break;
      case "📱":
        await member.roles.remove(roleIds.appd);
        break;
      case "🔒":
        await member.roles.remove(roleIds.cryptic);
        break;
      default:
        break;
    }
  }
});
