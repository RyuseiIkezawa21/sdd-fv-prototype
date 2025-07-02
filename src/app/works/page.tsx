"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Work {
  id: string;
  title: string;
  twitterAccount?: string;
  youtubeAccount?: string;
  tiktokAccount?: string;
  hashtags: string[];
  broadcastStartDate: string;
  genre: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/works");
      if (!response.ok) {
        throw new Error("Failed to fetch works");
      }
      const data = await response.json();
      setWorks(data);
    } catch (err) {
      setError("作品データの取得に失敗しました");
      console.error("Error fetching works:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">作品管理</h1>
          <Link
            href="/works/new"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            新規作品登録
          </Link>
        </div>

        {works.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              まだ作品が登録されていません
            </p>
            <Link
              href="/works/new"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              初めての作品を登録する
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((work) => (
              <div key={work.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {work.title}
                </h2>
                <p className="text-gray-600 mb-3">{work.description}</p>
                <div className="mb-3">
                  <span className="text-sm text-gray-500">ジャンル: </span>
                  <span className="text-sm text-gray-700">{work.genre}</span>
                </div>
                <div className="mb-3">
                  <span className="text-sm text-gray-500">放送開始: </span>
                  <span className="text-sm text-gray-700">
                    {new Date(work.broadcastStartDate).toLocaleDateString(
                      "ja-JP"
                    )}
                  </span>
                </div>
                {work.hashtags.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">
                      ハッシュタグ:{" "}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {work.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Link
                    href={`/works/${work.id}`}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded text-center text-sm"
                  >
                    詳細
                  </Link>
                  <Link
                    href={`/works/${work.id}/edit`}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded text-center text-sm"
                  >
                    編集
                  </Link>
                  <Link
                    href={`/chat?workId=${work.id}`}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded text-center text-sm"
                  >
                    相談
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
