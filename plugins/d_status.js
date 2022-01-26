const Shefin = require("../Utilis/events")
const { forwardOrBroadCast } = require("../Utilis/groupmute")

Shefin.addCommand(
  { pattern: "status ?(.*)", fromMe: true, desc: 'forward replied msg' },
  async (message, match) => {
    if (!message.reply_message) return await message.sendMessage('Reply to a status');
    forwardOrBroadCast(message.client.user.jid, message);
  }
);
