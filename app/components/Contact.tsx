"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    const formData = {
      name,
      email,
      company,
      message,
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
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={status === "loading"}
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