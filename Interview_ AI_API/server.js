import express from "express";
import openai from "./open_ai.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000; // You can change this to any port you prefer

const chatHistory = [];

chatHistory.push({
  role: "assistant",
  content: `Act as an AI Interviewer and conduct a Technical Interview! To begin, please ask the user to introduce and share a bit about technical background and experiences.`,
});

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());


app.post("/api/chatbot", async (req, res) => {
  const userMessage = req.body.userMessage;
  console.log(userMessage);

  try {
    // Construct messages by iterating over the history
    const messages = chatHistory.map(({ role, content }) => ({
      role,
      content,
    }));

    // Add latest user input
    messages.push({ role: "user", content: userMessage });

    // Add system message for the initial introduction
    if (chatHistory.length === 0) {
      chatHistory.push({
        role: "system",
        content: "Welcome to the AI Technical Interview! To begin, please introduce yourself and share a bit about your technical background and experiences.",
      });
      res.json({ botMessage: chatHistory[0].content });
      return;
    }

    // Add system message for asking tailored questions
    // if (chatHistory.length === 1) {
    //   // Here, you can analyze the user's response to the introduction and extract key technologies mentioned
    //   // For now, let's assume the user mentioned a technology named "Technology X"
    //   const mentionedTechnology = "C++ and Java";

    //   // Push system message for tailored questions based on mentioned technology
    //   chatHistory.push({
    //     role: "system",
    //     content: "Based on your background, it seems you're familiar with "+mentionedTechnology+". Could you tell me more about your experience with it?",
    //   });
    //   res.json({ botMessage: chatHistory[1].content });
    //   return;
    // }

    if(chatHistory.length === 6){
      chatHistory.push({
            role: "system",
            content: "Tell me about your projects",
          });
          res.json({ botMessage: chatHistory[6].content });
          return;
    }

    else if(chatHistory.length === 12){
      chatHistory.push({
            role: "system",
            content: "Have you done any certifications ?",
          });
          res.json({ botMessage: chatHistory[12].content });
          return;
    }

    else if(chatHistory.length === 18){
      chatHistory.push({
            role: "system",
            content: "Tell me about your soft skills",
          });
          res.json({ botMessage: chatHistory[18].content });
          return;
    }

    else if(chatHistory.length === 24){
      chatHistory.push({
            role: "system",
            content: "Do you have any work experience ?",
          });
          res.json({ botMessage: chatHistory[24].content });
          return;
    }

    else if(chatHistory.length === 30){
      chatHistory.push({
            role: "system",
            content: "What are your hobbies ?",
          });
          res.json({ botMessage: chatHistory[30].content });
          return;
    }

    else if(chatHistory.length === 40){
      chatHistory.push({
            role: "system",
            content: "Thank you for trying our AI Interview. Hope you found it helpful.",
          });
          res.json({ botMessage: chatHistory[40].content });
          return;
    }



    // You can continue adding more tailored questions and responses here based on the conversation flow

    // If no specific condition is met, proceed with regular GPT-3.5 response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const botMessage = completion.choices[0].message.content;
    res.json({ botMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:${port}");
});