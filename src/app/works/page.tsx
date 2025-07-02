"use client";

import { mockWorks } from "@/lib/mockData";
import Link from "next/link";

export default function WorksPage() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWorks.map((work) => (
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
                  {work.broadcastStartDate.toLocaleDateString("ja-JP")}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">ハッシュタグ: </span>
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
