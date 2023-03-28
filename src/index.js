//Discord Bot Code

const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
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
client.login(process.env.TOKEN);

// Express APP Code

const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const passport = require("passport");
const discordStrategy = require("./strategies/discord");
const Embed = require("./models/embeds");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const authRoute = require("./routes/auth");
const dashRoute = require("./routes/dashboard");

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

app.use("/auth", authRoute);
app.use("/dashboard", dashRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/embed", (req, res) => {
  console.log(req.body.user);
});
