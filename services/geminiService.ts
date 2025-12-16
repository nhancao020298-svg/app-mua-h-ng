import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";
import { MOCK_PRODUCTS } from "../constants";

// Initialize the Gemini client
// Note: In a real production app, you might proxy this through a backend to protect the key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAdvice = async (
  userMessage: string,
  chatHistory: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    // Create a context string containing the product catalog
    // We filter down to essential fields to save tokens
    const productCatalog = MOCK_PRODUCTS.map(p => 
      `- ID: ${p.id}, Tên: ${p.name}, Giá: ${p.price} VND, Danh mục: ${p.category}, Mô tả: ${p.description}`
    ).join("\n");

    const systemInstruction = `
      Bạn là trợ lý mua sắm ảo thông minh cho cửa hàng "GeminiStore".
      Nhiệm vụ của bạn là giúp khách hàng tìm kiếm sản phẩm, so sánh giá cả và đưa ra gợi ý dựa trên nhu cầu của họ.
      
      Dưới đây là danh sách sản phẩm hiện có trong cửa hàng:
      ${productCatalog}

      Quy tắc trả lời:
      1. Luôn thân thiện, lịch sự và dùng tiếng Việt.
      2. Chỉ gợi ý các sản phẩm có trong danh sách trên.
      3. Nếu khách hàng hỏi về sản phẩm không có, hãy xin lỗi và gợi ý sản phẩm tương tự nếu có.
      4. Trả lời ngắn gọn, đi thẳng vào vấn đề.
      5. Có thể dùng emoji để cuộc trò chuyện sinh động hơn.
      6. Khi nhắc đến giá, hãy format đẹp (ví dụ: 2.500.000 đ).
    `;

    // Convert history to the format expected by the API if needed, 
    // but here we will use a fresh generateContent call with history context manually constructed 
    // or use the chat API. Let's use the Chat API for better context management.
    
    // We reconstruct the history for the chat model
    const history = chatHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      history: history
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "Xin lỗi, tôi đang gặp chút sự cố khi suy nghĩ. Bạn thử lại nhé!";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, hiện tại hệ thống AI đang bận. Vui lòng thử lại sau.";
  }
};