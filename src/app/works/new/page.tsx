"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewWorkPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    twitterAccount: "",
    youtubeAccount: "",
    tiktokAccount: "",
    hashtags: "",
    broadcastStartDate: "",
    genre: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const hashtagsArray = formData.hashtags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const response = await fetch("/api/works", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          hashtags: hashtagsArray,
          broadcastStartDate: new Date(formData.broadcastStartDate),
        }),
      });

      if (response.ok) {
        router.push("/works");
      } else {
        alert("作品の登録に失敗しました");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("作品の登録に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            新規作品登録
          </h1>
          <Link
            href="/works"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            ← 作品管理に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                作品タイトル *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ジャンル *
              </label>
              <select
                id="genre"
                name="genre"
                required
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">選択してください</option>
                <option value="アクション・バトル">アクション・バトル</option>
                <option value="ファンタジー・冒険">ファンタジー・冒険</option>
                <option value="アクション・ホラー">アクション・ホラー</option>
                <option value="コメディ">コメディ</option>
                <option value="ドラマ">ドラマ</option>
                <option value="恋愛">恋愛</option>
                <option value="その他">その他</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="broadcastStartDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                放送開始日 *
              </label>
              <input
                type="date"
                id="broadcastStartDate"
                name="broadcastStartDate"
                required
                value={formData.broadcastStartDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                説明
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="twitterAccount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Twitter アカウント
                </label>
                <input
                  type="text"
                  id="twitterAccount"
                  name="twitterAccount"
                  placeholder="@example"
                  value={formData.twitterAccount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="youtubeAccount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  YouTube アカウント
                </label>
                <input
                  type="text"
                  id="youtubeAccount"
                  name="youtubeAccount"
                  placeholder="@example"
                  value={formData.youtubeAccount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="tiktokAccount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  TikTok アカウント
                </label>
                <input
                  type="text"
                  id="tiktokAccount"
                  name="tiktokAccount"
                  placeholder="@example"
                  value={formData.tiktokAccount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="hashtags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ハッシュタグ
              </label>
              <input
                type="text"
                id="hashtags"
                name="hashtags"
                placeholder="#tag1, #tag2, #tag3"
                value={formData.hashtags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                カンマ区切りで入力してください
              </p>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 rounded-md"
              >
                {isSubmitting ? "登録中..." : "作品を登録"}
              </button>
              <Link
                href="/works"
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-center"
              >
                キャンセル
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
