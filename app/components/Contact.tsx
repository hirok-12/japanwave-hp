"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  
  // お問い合わせ目的のチェックボックス状態
  const [isPitchService, setIsPitchService] = useState(false);
  const [isJobRequest, setIsJobRequest] = useState(false);
  
  // サービス提案用追加フィールド
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [priceExplanation, setPriceExplanation] = useState("");
  const [expectedEffect, setExpectedEffect] = useState("");
  const [effectReason, setEffectReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    const formData = {
      name,
      email,
      company,
      message,
      contactPurpose: {
        isPitchService,
        isJobRequest,
      },
      // サービス提案用の追加データ
      serviceInfo: isPitchService ? {
        serviceDescription,
        servicePrice,
        priceExplanation,
        expectedEffect,
        effectReason,
        additionalInfo,
      } : null,
    };
    
    console.log("FormData作成:", formData);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("ステータスコード:", response.status);
      const responseText = await response.text();
      console.log("レスポンステキスト:", responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("JSONパースエラー:", e);
        throw new Error("サーバーからの応答を解析できませんでした");
      }

      if (!response.ok) {
        throw new Error(result.error || `エラーが発生しました: ${response.status}`);
      }

      // 成功した場合
      setStatus("success");
      setFeedbackMessage(result.message || "お問い合わせありがとうございます。内容確認後に折り返し連絡します！");
      // フォームをリセット
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setIsPitchService(false);
      setIsJobRequest(false);
      setServiceDescription("");
      setServicePrice("");
      setPriceExplanation("");
      setExpectedEffect("");
      setEffectReason("");
      setAdditionalInfo("");
    } catch (error: any) {
      console.error("Form submission error:", error);
      setStatus("error");
      setFeedbackMessage(error.message || "メールの送信中にエラーが発生しました。");
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-lg text-muted-foreground">
            ご質問やご相談がございましたら、お気軽にお問い合わせください
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>お問い合わせフォーム</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">お名前 <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name" 
                    placeholder="山田 太郎" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">会社名</Label>
                  <Input 
                    id="company" 
                    placeholder="株式会社〇〇" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                
                {/* お問い合わせ目的のチェックボックス */}
                <div className="space-y-3">
                  <Label>お問い合わせ目的 <span className="text-red-500">*</span></Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pitch-service" 
                        checked={isPitchService}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIsPitchService(true);
                            setIsJobRequest(false);
                          } else {
                            setIsPitchService(false);
                          }
                        }}
                      />
                      <Label htmlFor="pitch-service" className="cursor-pointer">自社商品やサービスを提案したい</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="job-request" 
                        checked={isJobRequest}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIsJobRequest(true);
                            setIsPitchService(false);
                          } else {
                            setIsJobRequest(false);
                          }
                        }}
                      />
                      <Label htmlFor="job-request" className="cursor-pointer">仕事を依頼したい</Label>
                    </div>
                  </div>
                </div>
                
                {/* 自社商品やサービスを提案したい場合の追加フィールド */}
                {isPitchService && (
                  <div className="space-y-6 border border-gray-200 p-4 rounded-md bg-gray-50">
                    <div className="space-y-2">
                      <Label htmlFor="service-description">商品・サービス概要 <span className="text-red-500">*</span></Label>
                      <Input 
                        id="service-description" 
                        placeholder="例：営業代行します" 
                        required 
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="service-price">商品・サービス導入にかかる価格(1年) <span className="text-red-500">*</span></Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          id="service-price" 
                          placeholder="例：120000" 
                          required 
                          value={servicePrice}
                          onChange={(e) => setServicePrice(e.target.value)}
                          type="number"
                        />
                        <span>円</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        サブスクリプション型の料金形態の場合は年額を入力してください。プランが複数あるような場合やお見積りが必要な場合も、類似事例や見積に必要な前提を仮定した上で想定価格を入力し、次の項目にその説明を書いてください。
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price-explanation">費用の説明 <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="price-explanation"
                        placeholder="例：営業専任者が社内におらず、月にXX社へのアポイントの前提の価格で、月額1万円のため年額12万円となる。"
                        rows={3}
                        required
                        value={priceExplanation}
                        onChange={(e) => setPriceExplanation(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expected-effect">導入によって得られる効果(1年) <span className="text-red-500">*</span></Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          id="expected-effect" 
                          placeholder="例：300000" 
                          required 
                          value={expectedEffect}
                          onChange={(e) => setExpectedEffect(e.target.value)}
                          type="number"
                        />
                        <span>円</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        類似事例等から、導入によって1年で何円の効果（売上効果・費用削減効果・利益効果等）が見込めるかを入力してください。仮定を設定いただいてもかまいませんが、次の項目で説明してください。
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="effect-reason">効果の根拠 <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="effect-reason"
                        placeholder="例：同業他社の場合の受注率はX%であり、商品1件あたりX万円の売上と仮定すると、売上効果は30万円となる。 / 導入によりXX時間の業務時間削減となり、時給XXXX円と仮定すると1年で30万円の費用削減効果となる。"
                        rows={3}
                        required
                        value={effectReason}
                        onChange={(e) => setEffectReason(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="additional-info">その他商品・サービスの説明等</Label>
                      <Textarea
                        id="additional-info"
                        placeholder="追加情報があればここに記入してください"
                        rows={3}
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {/* 仕事を依頼したい場合のみ表示するお問い合わせ内容フィールド */}
                {isJobRequest && (
                  <div className="space-y-2">
                    <Label htmlFor="message">お問い合わせ内容 <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      placeholder="お問い合わせ内容をご記入ください"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={
                    status === "loading" || 
                    (!isPitchService && !isJobRequest) ||
                    (isPitchService && (
                      !serviceDescription || 
                      !servicePrice || 
                      !priceExplanation || 
                      !expectedEffect || 
                      !effectReason
                    ))
                  }
                >
                  {status === "loading" ? "送信中..." : "送信する"}
                </Button>
                
                {/* フィードバックメッセージ */}
                {feedbackMessage && (
                  <div
                    className={`p-4 rounded-md text-center ${
                      status === "success" ? "bg-green-100 text-green-800 border border-green-300" : ""
                    } ${
                      status === "error" ? "bg-red-100 text-red-800 border border-red-300" : ""
                    }`}
                  >
                    {feedbackMessage}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}