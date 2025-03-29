"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,1)_0%,_rgba(0,30,60,1)_100%)]" />
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            あなたの夢をカタチにする、デジタルの力
          </h2>
          <p className="text-xl text-white/80">
            平素より格別のご愛顧を賜り、誠にありがとうございます。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed text-white/80"
        >
          <p>
            私たちの会社は、「あなたの夢をカタチにする、デジタルの力」をモットーに、EC開発、WEBアプリ開発、そしてAI開発を通じて、お客様のビジネスや日常をより良くするためのソリューションを提供しております。
          </p>
          <p>
            デジタル技術が日々進化する現代において、私たちは常に新しい技術とクリエイティブな発想で、お客様のニーズに応えることを目指しています。オンラインショップの構築からカスタムWEBアプリケーションの開発、そして高度なAIソリューションまで、幅広いサービスを展開し、ビジネスの成長や新しい価値の創造をサポートしています。
          </p>
          <p>
            私たちのチームは、お客様との信頼関係を大切にし、共に成長していくことを重視しています。お客様の夢やビジョンを理解し、それを実現するために最善の提案を行い、一歩一歩着実に進んでまいります。
          </p>
          <p>
            今後も「あなたの夢をカタチにする、デジタルの力」を胸に、より多くの皆様に喜んでいただけるサービスを提供してまいります。どうぞ変わらぬご支援を賜りますようお願い申し上げます。
          </p>
        </motion.div>
      </div>
    </section>
  );
}