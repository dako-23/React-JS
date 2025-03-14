export default function GroupChatSendMessage({
    newMessage,
    sendMessage,
    setNewMessage
}) {
    return (
        <div className="flex space-x-3 mt-4">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Write a message..."
                className="flex-grow p-3 border rounded-lg bg-page-pattern"
            />
            <button onClick={sendMessage} className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-lime-700 transition">
                Send
            </button>
        </div>
    );
}