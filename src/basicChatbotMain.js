// .env 파일에서 환경변수 가져오기 (Vite는 import.meta.env 사용)
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ENDPOINT = "https://api.openai.com/v1/chat/completions";

document.addEventListener("DOMContentLoaded", () => {
  const chatbox = document.getElementById("chatbox");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  sendBtn.addEventListener("click", async () => {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    addMessage("👤", userMessage);
    input.value = "";
    input.focus();

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content ?? "응답 실패";

      addMessage("🤖", botReply);
    } catch (err) {
      addMessage("❌", "오류가 발생했습니다.");
      console.error(err);
    }
  });

  // ✅ Enter 키로 전송, Shift+Enter는 줄바꿈
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendBtn.click();
    }
  });

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.textContent = `${sender} ${text}`;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight; // ⬇️ 스크롤 자동 하단 이동
  }
});
