# 🦙 라마봇 – 성격 있는 로컬 챗봇

라마봇은 [Ollama](https://ollama.com)를 기반으로 동작하는  
유쾌하고 귀여운 인공지능 캐릭터 챗봇입니다.  
라마, 교수, 개그맨, 코딩봇 등의 프리셋으로 성격을 설정할 수 있으며,  
모든 기능은 로컬에서 실행됩니다.

![screenshot](https://user-images.githubusercontent.com/your-id/llama-screenshot.png)

---

## 🚀 주요 기능

- 🧠 에이전트 프리셋 (라마봇, 교수, 개그, 코딩)
- 🗣️ System 메시지를 통한 성격 주입
- 🔁 대화 기록 저장 (localStorage)
- 🖼️ 이미지 URL 자동 미리보기
- 🌐 한글 / 영어 모두 자연스럽게 처리
- 🧪 로컬 LLM 모델 (mistral 등)로 동작

---

## ⚙️ 시작하기

```bash
git clone https://github.com/your-username/llama-bot.git
cd llama-bot
npm install
npm run dev
```

Ollama 설치 후 모델을 실행하세요:

```bash
ollama run mistral
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 열기

---

## 📦 기술 스택

- React + Vite
- Ollama (로컬 LLM)
- Custom CSS (디스코드 스타일 UI)
- localStorage (대화 기록 저장)

---

## 🧠 에이전트 프리셋

| 이름 | 설명 |
|------|------|
| 🦙 라마 | "음메~", "람람~" 스타일로 귀엽게 대화 |
| 🎓 교수 | 논리적이고 정중한 설명 |
| 🤡 개그 | 유쾌하고 장난스러운 반응 |
| 👨‍💻 코딩 | 실용적인 코딩 답변 제공 |

---

## 📄 라이선스

MIT License © 2025 [Shawn Yoon](https://github.com/Fluffy-SHIBAINU)
