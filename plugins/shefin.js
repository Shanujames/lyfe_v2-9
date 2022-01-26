const Shefin = require("../Utilis/events")
const { MessageType } = require("@adiwajshing/baileys")
const fs = require("fs")
const Language = require("../language")
const { getName } = require("../Utilis/download")
const { genButtons } = require("../Utilis/Misc")
const Lang = Language.getString("profile")
const { parseJid } = require("../Utilis/vote")


Shefin.addCommand(
  { pattern: "vv", fromMe: true, desc: "Anti viewOnce" },
  async (message, match) => {
    if (message.reply_message.image || message.reply_message.video) {
      return await message.sendMessage(
        await message.reply_message.downloadMediaMessage(),
        { quoted: message.quoted },
        message.reply_message.image ? MessageType.image : MessageType.video
      )
    }
  }
)

Shefin.addCommand(
  { pattern: "gqr ?(.*)", fromMe: true, desc: 'Text to qr' },
  async (message, match) => {
    match = match || message.reply_message.text
    if(!match) return await message.sendMessage('error')
    const { buffer } = await getBuffer(`https://early-pie-production.up.railway.app/genqr?text=${match}`)
    return await message.sendMessage(buffer,{},MessageType.image)
  })

Shefin.addCommand({ pattern: 'gpp ?(.*)', fromMe: true, desc: "Change Group Dp"},
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_PHOTO)
    await message.sendMessage(Lang.PPrING)
    let location = await message.reply_message.downloadAndSaveMediaMessage()
    await message.client.updateProfilePicture(
      message.jid,
      fs.readFileSync(location)
    )
  }
)

Shefin.addCommand({ pattern: 'scam ?(.*)', fromMe: true, desc: "Creates 5 minutes of fake actions", }, async (message, match) => {
  let [jid] = match.match(parseJid) || []
  jid = !jid ? message.jid : jid
  match = match.split(' ')[0]
  if (match === '') {
    return await message.sendMessage('*You Must Enter Fake Action!*\nExisting Types: ```typing & recording & online & stop```');
  } else if (match == 'recording') {
    await message.client.updatePresence(jid, Presence.recording)
    tostop = setInterval(async () => {
      try {
        await message.client.updatePresence(jid, Presence.recording)
      } catch (error) {
        console.log(error.message)
      }
    }, 20 * 1000);
  } else if (match == 'typing') {
    await message.client.updatePresence(jid, Presence.composing)
    tostop = setInterval(async () => {
      try {
        await message.client.updatePresence(jid, Presence.composing)
      } catch (error) {
        console.log(error.message)
      }
    }, 20 * 1000);
  } else if (match == "stop") clearInterval(tostop);

})
