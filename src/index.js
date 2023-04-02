//Discord Bot Code

const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
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
dotenv.config();

client.on("ready", (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Express APP Code

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const discordStrategy = require("./strategies/discord");
const Embed = require("./models/embeds");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const authRoute = require("./routes/auth");
const createRoute = require("./routes/create");

const mongoose = require("mongoose");
const dbURI = process.env.MONGO;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.use(
  session({
    secret: "random-secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", "./src/views/");
app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/create", createRoute);

app.get("/", (req, res) => {
  res.render("index.ejs");
});
//webdev role: 1056831120907444226
//channel: 1089097936216002591
app.post("/sendMsg", (req, res) => {
  const reactEmbed = new EmbedBuilder()
    .setColor("#16e16e")
    .setTitle(req.body.title)
    .setDescription(req.body.description);

  client.guilds.cache
    .get("1056120977785888838")
    .client.channels.cache.get(req.body.channel)
    .send({ embeds: [reactEmbed] })
    .then((msg) => {
      for (var i in req.body.emojis) {
        msg.react(req.body.emojis[i]);
      }
      embed_id = msg.id.toString();
      const embed = new Embed({
        title: req.body.title,
        description: req.body.description,
        embed_id: embed_id,
        channel_id: req.body.channel,
        roles: req.body.roles,
        emojis: req.body.emojis,
      });
      embed.save();
    });
});

client.login(process.env.TOKEN);
