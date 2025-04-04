import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
// import ContactFormEmail from '@/emails/contact-form-email'; // ステップ5で作成する場合

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}
const resend = new Resend(process.env.RESEND_API_KEY);


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
    
    const { name, email, message, company, contactPurpose, serviceInfo } = body;
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // 選択されたお問い合わせ目的に応じて内容を変更
    let emailText = `
名前: ${name}
メール: ${email}
会社: ${company || 'なし'}
`;

    // お問い合わせ目的の追加
    emailText += `お問い合わせ目的: ${contactPurpose.isPitchService ? '自社商品やサービスを提案したい' : '仕事を依頼したい'}
`;

    // 自社商品やサービスを提案したい場合
    if (contactPurpose.isPitchService && serviceInfo) {
      emailText += `
---- 商品・サービス情報 ----
商品・サービス概要: ${serviceInfo.serviceDescription}
導入価格(1年): ${serviceInfo.servicePrice}円
費用の説明: ${serviceInfo.priceExplanation}
導入効果(1年): ${serviceInfo.expectedEffect}円
効果の根拠: ${serviceInfo.effectReason}
`;

      if (serviceInfo.additionalInfo) {
        emailText += `追加情報: ${serviceInfo.additionalInfo}
`;
      }
    }

    // 仕事を依頼したい場合
    if (contactPurpose.isJobRequest) {
      emailText += `
お問い合わせ内容: ${message}
`;
    }
    
    const { data, error } = await resend.emails.send({
      from: 'お問い合わせフォーム <onboarding@resend.dev>',
      to: ['hiroki12malu@gmail.com'], // 実際の送信先メールアドレスを設定
      subject: `${name}さんからのお問い合わせ`,
      text: emailText,
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