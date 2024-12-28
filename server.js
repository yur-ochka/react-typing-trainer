const express = require("express");
const cors = require("cors"); // Импортируем cors
const app = express();
const port = 3000;

// Включаем CORS для всех запросов
app.use(cors());
const texts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. It's a popular example used in typing tests. The aim is to test speed and accuracy while typing various characters.",
  "Artificial intelligence and machine learning are transforming industries. Data-driven decisions are becoming the norm in many sectors. Algorithms can analyze vast amounts of information. These technologies are reshaping the future.",
  "In the beginning, there was darkness. Then came the light. With it, the world emerged in its full glory. Nature, vibrant and alive, filled the land, and humans began their journey through history.",
  "Space exploration is the next frontier. Rockets are being developed for travel beyond our planet. One day, humans might live on other planets. For now, missions continue to explore the unknown depths of the cosmos.",
  "Music brings people together across cultures and borders. It transcends language and geography. The rhythm, melody, and harmony create a universal connection. Whether classical, rock, or jazz, music has a profound impact.",
  "The internet has revolutionized communication. People are connected globally in real-time. Information is accessible at the click of a button. With this vast knowledge comes the responsibility to use it wisely.",
  "Climate change is one of the biggest challenges facing humanity. Global temperatures are rising, affecting ecosystems and weather patterns. Efforts to combat this issue are critical for the planet's future.",
  "The ancient civilizations of Egypt and Greece have left lasting legacies. Their contributions to art, science, and philosophy continue to influence modern culture. Many of their monuments still stand today.",
  "Advancements in medical technology are saving lives. New treatments and innovations are improving patient outcomes. Healthcare systems around the world are benefiting from these breakthroughs in medicine.",
];

function getRandomText() {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

app.get("/data", (req, res) => {
  const data = {
    message: getRandomText(),
    timestamp: new Date(),
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
