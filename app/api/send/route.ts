import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
// import ContactFormEmail from '@/emails/contact-form-email'; // ステップ5で作成する場合

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}
const resend = new Resend(process.env.RESEND_API_KEY);

// Content-Typeヘッダーを明示的に処理するための設定
export const config = {
  api: {
    bodyParser: true,
  },
};

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY が設定されていません');
    }
    
    // リクエストボディを安全にパースする
    let body;
    try {
      body = await req.json();
      console.log('リクエストボディ:', body);
    } catch (error: any) {
      console.error('JSONパースエラー:', error);
      return Response.json(
        { error: `リクエストボディのパースに失敗しました: ${error.message}` },
        { status: 400 }
      );
    }
    
    const { name, email, message, company } = body;
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'お問い合わせフォーム <onboarding@resend.dev>',
      to: ['hiroki12malu@gmail.com'], // 実際の送信先メールアドレスを設定
      subject: `${name}さんからのお問い合わせ`,
      text: `
名前: ${name}
メール: ${email}
会社: ${company || 'なし'}
メッセージ: ${message}
      `,
    });
    
    console.log('Resendレスポンス:', data, error);
    
    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    
    return Response.json({ success: true });
  } catch (error: any) {
    console.error('送信エラー:', error);
    return Response.json(
      { error: `内部サーバーエラーが発生しました: ${error.message}` },
      { status: 500 }
    );
  }
} 