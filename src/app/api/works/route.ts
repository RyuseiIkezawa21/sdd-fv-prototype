import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/works - 作品一覧取得
export async function GET() {
  try {
    const works = await prisma.work.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(works);
  } catch (error) {
    console.error("Failed to fetch works:", error);
    return NextResponse.json(
      { error: "Failed to fetch works" },
      { status: 500 }
    );
  }
}

// POST /api/works - 新規作品作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      twitterAccount,
      youtubeAccount,
      tiktokAccount,
      hashtags,
      broadcastStartDate,
      genre,
      description,
    } = body;

    // 必須フィールドのバリデーション
    if (!title || !genre || !broadcastStartDate) {
      return NextResponse.json(
        { error: "Title, genre, and broadcastStartDate are required" },
        { status: 400 }
      );
    }

    const work = await prisma.work.create({
      data: {
        title,
        twitterAccount: twitterAccount || null,
        youtubeAccount: youtubeAccount || null,
        tiktokAccount: tiktokAccount || null,
        hashtags: hashtags || [],
        broadcastStartDate: new Date(broadcastStartDate),
        genre,
        description: description || null,
      },
    });

    return NextResponse.json(work, { status: 201 });
  } catch (error) {
    console.error("Failed to create work:", error);
    return NextResponse.json(
      { error: "Failed to create work" },
      { status: 500 }
    );
  }
}
