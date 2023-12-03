const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("clients.db");
const {
  messages,
  overflowMessages,
  finalMessage,
} = require("./variables/chat-vars.ts");
let blocked = false;
// Create a new client instance with LocalAuth for session management
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  initializeDatabase();
});

client.on("message", async (msg) => {
  if (blocked) console.log("blocked");
  if (blocked) return;

  blocked = true;
  let phoneNumber = msg.from;
  handleMessageFlow(phoneNumber, msg);
});

client.initialize();

function initializeDatabase() {
  db.run(
    "CREATE TABLE IF NOT EXISTS clients (phone TEXT PRIMARY KEY, messages TEXT, message_count INTEGER)",
    (err) => {
      // Existing error handling...
    }
  );

  db.run(
    "ALTER TABLE clients ADD COLUMN last_message_time INTEGER",
    (alterErr) => {
      if (alterErr && !alterErr.message.includes("duplicate column name")) {
        console.error("Error altering database table: ", alterErr.message);
      }
    }
  );
}

function updateClientMessages(phoneNumber, messageText, callback) {
  const now = Date.now();
  const timeThreshold = 2000; // 60 seconds - modify as needed

  db.get(
    "SELECT messages, message_count, last_message_time FROM clients WHERE phone = ?",
    [phoneNumber],
    (err, row) => {
      if (err) {
        console.error("Database read error: ", err.message);
        return;
      }

      if (row) {
        let updatedMessages = row.messages + "\n" + messageText;
        let shouldUpdateCount =
          !row.last_message_time || now - row.last_message_time > timeThreshold;
        let updatedCount = shouldUpdateCount
          ? row.message_count + 1
          : row.message_count;

        db.run(
          "UPDATE clients SET messages = ?, message_count = ?, last_message_time = ? WHERE phone = ?",
          [updatedMessages, updatedCount, now, phoneNumber],
          (updateErr) => {
            if (updateErr) {
              console.error("Database update error: ", updateErr.message);
            } else {
              callback(updatedCount);
            }
          }
        );
      } else {
        db.run(
          "INSERT INTO clients (phone, messages, message_count, last_message_time) VALUES (?, ?, ?, ?)",
          [phoneNumber, messageText, 1, now],
          (insertErr) => {
            if (insertErr) {
              console.error("Database insert error: ", insertErr.message);
            } else {
              callback(1);
            }
          }
        );
      }
    }
  );
}

const myPhoneNumber = "5511997658395@c.us"; // Replace with your phone number
async function handleMessageFlow(phoneNumber, msg) {
  updateClientMessages(phoneNumber, msg.body, async (messageCount) => {
    let selectedMessage;
    if (phoneNumber === myPhoneNumber) {
      // For your number, include the final message in the loop
      let totalMessages = messages.length + overflowMessages.length + 1;
      let index = (messageCount - 1) % totalMessages;
      if (index < messages.length) {
        selectedMessage = messages[index];
      } else if (index - messages.length < overflowMessages.length) {
        selectedMessage = overflowMessages[index - messages.length];
      } else {
        selectedMessage = finalMessage;
      }
    } else {
      // For other users, end after the final message
      if (messageCount <= messages.length) {
        selectedMessage = messages[messageCount - 1];
      } else if (messageCount - messages.length <= overflowMessages.length) {
        selectedMessage = overflowMessages[messageCount - messages.length - 1];
      } else {
        selectedMessage = finalMessage;
      }
    }

    const chat = await msg.getChat();
    await chat.sendStateTyping();
    setTimeout(() => {
      blocked = false;
      chat.clearState();
      msg.reply(selectedMessage);
    }, (selectedMessage.length * 100) / 4);
  });
}
