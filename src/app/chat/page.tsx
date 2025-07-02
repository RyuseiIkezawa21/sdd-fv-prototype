"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { mockWorks, mockStrategies } from "@/lib/mockData";
import { ChatMessage } from "@/types";
import Link from "next/link";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const workId = searchParams.get("workId");
  const alertId = searchParams.get("alertId");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const work = workId ? mockWorks.find((w) => w.id === workId) : null;

  useEffect(() => {
    // 初期メッセージを設定
    const welcomeMessage: ChatMessage = {
      id: "1",
      workId: workId || undefined,
      role: "assistant",
      content: work
        ? `こんにちは！「${work.title}」についてのご相談ですね。どのような施策についてお聞かせください？`
        : "こんにちは！アニメ作品のマーケティング施策についてご相談いただけます。どのようなことでお困りでしょうか？",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [workId, work]);

  const getAIResponse = (userMessage: string): string => {
    // プロトタイプ用の固定レスポンス
    const responses = [
      `現在の状況に基づいて、以下の施策をお勧めします：

🎯 **${mockStrategies[0].title}**
${mockStrategies[0].description}

期待効果:
${mockStrategies[0].expectedEffects.map((effect) => `• ${effect}`).join("\n")}

必要な準備:
${mockStrategies[0].requirements.map((req) => `• ${req}`).join("\n")}

難易度: ${
        mockStrategies[0].difficulty === "easy"
          ? "低"
          : mockStrategies[0].difficulty === "medium"
          ? "中"
          : "高"
      }

他にも「ストリーミング施策」や「広告戦略」についてもご提案できます。詳しくお聞かせください。`,

      `追加の施策として、以下もご検討ください：

🚀 **${mockStrategies[1].title}**
${mockStrategies[1].description}

🎬 **${mockStrategies[2].title}**
${mockStrategies[2].description}

これらの施策を組み合わせることで、より効果的なマーケティング戦略を構築できます。
特定の施策について詳しく知りたい場合は、お気軽にお聞きください。`,

      `施策実行のタイミングについてもお答えできます。

📅 **タイミング戦略:**
• 放送日前後: 話題性を最大化
• 週末: SNSエンゲージメントが高い時間帯
• イベント連動: 関連イベントとの相乗効果

📊 **効果測定指標:**
• SNS mentions数の変化
• 動画再生数の増加
• ハッシュタグ使用頻度

具体的な実行計画についてもサポートいたします。`,
    ];

    // ユーザーメッセージの内容に基づいて適切なレスポンスを選択
    if (userMessage.includes("施策") || userMessage.includes("戦略")) {
      return responses[0];
    } else if (
      userMessage.includes("他") ||
      userMessage.includes("追加") ||
      userMessage.includes("詳しく")
    ) {
      return responses[1];
    } else {
      return responses[2];
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      workId: workId || undefined,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // AIレスポンスをシミュレート（1-2秒の遅延）
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        workId: workId || undefined,
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg h-[80vh] flex flex-col">
          {/* ヘッダー */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  AI相談チャット
                </h1>
                {work && (
                  <p className="text-sm text-gray-600">
                    対象作品: {work.title}
                  </p>
                )}
              </div>
              <Link
                href="/"
                className="text-blue-500 hover:text-blue-600 text-sm underline"
              >
                ← ホームに戻る
              </Link>
            </div>
          </div>

          {/* チャットメッセージ */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("ja-JP", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm ml-2">AI が考えています...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 入力フィールド */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力してください..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg"
              >
                送信
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Enter で送信、Shift + Enter で改行
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
