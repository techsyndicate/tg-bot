const {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const dotenv = require("dotenv");

let embed_id = null;

const reactEmbed = new EmbedBuilder()
  .setColor("#16e16e")
  .setTitle("Training Grounds Event Roles")
  .setDescription(
    `WebD - 🖥️
    AppD -  📱
    A/V Editing -  🎞️
    2D Design  - 🎨
    UI Design - 🟦
    Cryptic Hunt - 🔒
    Group Discussion (GD)  - 🎙️
    Programming - ⌨️
    Crossword - 🧩
    Gaming - 🎮
    3D - 3️⃣
    Quiz - 🧠
    Photography - 📷
    Capture the flag (CTF) - ⛳
    Cubing - 🧊`
  );

const roleIds = {
  "🖥️": "1056831120907444226",
  "📱": "1056831376718057472",
  "🔒": "1056831542846029875",
  "🎞️": "1056832520475398237",
  "🧩": "1056831738065735760",
  "🧠": "1056831798291746816",
  "📷": "1056831892307062825",
  "3️⃣": "1056831971818491964",
  "🎨": "1056832028919730256",
  "🎮": "1056832099702800444",
  "⌨️": "1056832552272412703",
  "🎙️": "1056832630663942244",
  "🧊": "1056832677765992489",
  "🟦": "1056832772544675900",
  "⛳": "1088880590461349908",
};

client.on("ready", (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (msg) => {
  console.log("got a message");
  console.log(msg.content);
  if (msg.content.startsWith("!rolemsg")) {
    channel = msg.content.split("!rolemsg")[1];
    c_id = channel.substring(3, channel.length - 1);
    client.guilds.cache
      .get("1056120977785888838")
      .client.channels.cache.get(c_id)
      .send({ embeds: [reactEmbed] })
      .then((msg) => {
        for (var i in roleIds) {
          msg.react(i);
        }
        embed_id = msg.id.toString();
      });
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
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
});

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

  if (message.id === embed_id) {
    if (emoji in roleIds) {
      await member.roles.remove(roleIds[emoji]);
    }
  }
});

client.on("guildMemberAdd", async (member) => {
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
});

client.login(process.env.TOKEN);
