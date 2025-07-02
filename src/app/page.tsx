import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SDD-FV Prototype
          </h1>
          <p className="text-xl text-gray-600">
            アニメ作品のバズ検知・AI相談システム
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              作品管理
            </h2>
            <p className="text-gray-600 mb-4">
              作品の登録・編集・削除（CRUD）機能
            </p>
            <Link
              href="/works"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-block"
            >
              作品一覧を見る
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              バズ検知
            </h2>
            <p className="text-gray-600 mb-4">SNSやランキングのスパイク検知</p>
            <Link
              href="/alerts"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded inline-block"
            >
              アラートを確認
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">AI相談</h2>
            <p className="text-gray-600 mb-4">施策提案とナレッジ検索</p>
            <Link
              href="/chat"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded inline-block"
            >
              チャットを開始
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
