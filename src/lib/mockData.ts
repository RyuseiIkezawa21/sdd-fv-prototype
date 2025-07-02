import { Work, Alert, Strategy } from "@/types";

// モック作品データ
export const mockWorks: Work[] = [
  {
    id: "1",
    title: "呪術廻戦",
    officialSnsAccounts: {
      twitter: "@jujutsu_PR",
      youtube: "@jujutsukaisen-official",
    },
    hashtags: ["#呪術廻戦", "#JujutsuKaisen"],
    broadcastStartDate: new Date("2024-01-01"),
    genre: "アクション・バトル",
    description: "呪いと呪術師の戦いを描いたダークファンタジー",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "フリーレン",
    officialSnsAccounts: {
      twitter: "@frieren_pr",
      youtube: "@frieren-official",
    },
    hashtags: ["#フリーレン", "#葬送のフリーレン"],
    broadcastStartDate: new Date("2023-09-29"),
    genre: "ファンタジー・冒険",
    description: "魔法使いフリーレンの長い旅路を描く物語",
    createdAt: new Date("2023-09-01"),
    updatedAt: new Date("2023-09-01"),
  },
  {
    id: "3",
    title: "チェンソーマン",
    officialSnsAccounts: {
      twitter: "@chainsawman_PR",
      youtube: "@chainsawman-official",
    },
    hashtags: ["#チェンソーマン", "#ChainsawMan"],
    broadcastStartDate: new Date("2022-10-11"),
    genre: "アクション・ホラー",
    description: "デビルハンターの青年デンジの物語",
    createdAt: new Date("2022-10-01"),
    updatedAt: new Date("2022-10-01"),
  },
];

// モックアラートデータ
export const mockAlerts: Alert[] = [
  {
    id: "1",
    workId: "1",
    type: "spike",
    title: "Twitter mentions 急上昇",
    description: "「呪術廻戦」のTwitter mentions が前日比300%増加しています",
    severity: "high",
    metrics: {
      platform: "Twitter",
      value: 15000,
      previousValue: 5000,
      changeRate: 3.0,
    },
    createdAt: new Date("2024-01-20T10:30:00"),
    isRead: false,
  },
  {
    id: "2",
    workId: "2",
    type: "trending",
    title: "YouTube 再生数 トレンド入り",
    description: "フリーレンの最新エピソードがYouTubeトレンド10位にランクイン",
    severity: "medium",
    metrics: {
      platform: "YouTube",
      value: 850000,
      previousValue: 520000,
      changeRate: 1.63,
    },
    createdAt: new Date("2024-01-20T08:15:00"),
    isRead: false,
  },
  {
    id: "3",
    workId: "3",
    type: "ranking",
    title: "MyAnimeList ランキング 上昇",
    description: "チェンソーマンがMyAnimeListで週間ランキング5位に上昇",
    severity: "low",
    metrics: {
      platform: "MyAnimeList",
      value: 5,
      previousValue: 12,
      changeRate: -0.58,
    },
    createdAt: new Date("2024-01-19T22:00:00"),
    isRead: true,
  },
];

// モック施策データ
export const mockStrategies: Strategy[] = [
  {
    id: "1",
    title: "声優SNSコラボレーション",
    description: "主要声優のSNSアカウントでの連携投稿を実施",
    category: "sns_collaboration",
    expectedEffects: [
      "ファンエンゲージメント向上",
      "SNSリーチ拡大",
      "話題性向上",
    ],
    requirements: [
      "声優事務所との調整",
      "コンテンツ制作",
      "投稿スケジュール策定",
    ],
    difficulty: "medium",
  },
  {
    id: "2",
    title: "ストリーミング限定コンテンツ",
    description: "配信プラットフォーム限定の特別映像を制作・配信",
    category: "streaming",
    expectedEffects: [
      "配信プラットフォームでの視聴数増加",
      "サブスクリプション促進",
      "ファンロイヤルティ向上",
    ],
    requirements: [
      "限定コンテンツ制作",
      "プラットフォームとの交渉",
      "プロモーション戦略",
    ],
    difficulty: "hard",
  },
  {
    id: "3",
    title: "トレンド連動キャラクター動画広告",
    description: "現在のトレンドとキャラクターを組み合わせた動画広告を制作",
    category: "advertising",
    expectedEffects: [
      "トレンドに乗った拡散",
      "新規ファン獲得",
      "ブランド認知度向上",
    ],
    requirements: ["トレンド分析", "動画制作", "広告配信設定"],
    difficulty: "easy",
  },
];
