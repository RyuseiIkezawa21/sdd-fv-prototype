// 作品関連の型定義
export interface Work {
  id: string;
  title: string;
  officialSnsAccounts: {
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  hashtags: string[];
  broadcastStartDate: Date;
  genre: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// アラート関連の型定義
export interface Alert {
  id: string;
  workId: string;
  type: "spike" | "trending" | "ranking";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  metrics: {
    platform: string;
    value: number;
    previousValue: number;
    changeRate: number;
  };
  createdAt: Date;
  isRead: boolean;
}

// チャット関連の型定義
export interface ChatMessage {
  id: string;
  workId?: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  workId?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// 施策関連の型定義
export interface Strategy {
  id: string;
  title: string;
  description: string;
  category: "sns_collaboration" | "streaming" | "advertising" | "event";
  expectedEffects: string[];
  requirements: string[];
  difficulty: "easy" | "medium" | "hard";
}
