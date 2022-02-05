module.exports = {
    name : "messageCreate",
    execute(message) {
        
        if (message.content === "good bot") {
            message.react("❤");
        }
    }
}