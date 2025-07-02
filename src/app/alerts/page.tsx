"use client";

import { mockAlerts, mockWorks } from "@/lib/mockData";
import Link from "next/link";

export default function AlertsPage() {
  const getWorkTitle = (workId: string) => {
    const work = mockWorks.find((w) => w.id === workId);
    return work?.title || "不明な作品";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "spike":
        return "スパイク";
      case "trending":
        return "トレンド";
      case "ranking":
        return "ランキング";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">アラート一覧</h1>
          <div className="flex space-x-2">
            <span className="text-sm text-gray-600">
              未読: {mockAlerts.filter((alert) => !alert.isRead).length}件
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                alert.isRead ? "opacity-75" : ""
              } ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(
                      alert.severity
                    )}`}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {getTypeLabel(alert.type)}
                  </span>
                  {!alert.isRead && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                      未読
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {alert.createdAt.toLocaleDateString("ja-JP")}{" "}
                  {alert.createdAt.toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {alert.title}
              </h2>
              <p className="text-gray-600 mb-3">{alert.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">作品: </span>
                  <span className="text-sm font-medium text-gray-700">
                    {getWorkTitle(alert.workId)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">
                    プラットフォーム:{" "}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {alert.metrics.platform}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  メトリクス
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">現在値: </span>
                    <span className="font-medium">
                      {alert.metrics.value.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">前回値: </span>
                    <span className="font-medium">
                      {alert.metrics.previousValue.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">変化率: </span>
                    <span
                      className={`font-medium ${
                        alert.metrics.changeRate > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {alert.metrics.changeRate > 0 ? "+" : ""}
                      {(alert.metrics.changeRate * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  href={`/works/${alert.workId}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  作品詳細
                </Link>
                <Link
                  href={`/chat?workId=${alert.workId}&alertId=${alert.id}`}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm"
                >
                  AI相談
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
