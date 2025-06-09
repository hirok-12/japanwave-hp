"use client";

import { motion } from "framer-motion";

const newsItems = [
  {
    id: 1,
    date: "2024年10月10日",
    title: "新サービス「AIコンサルティング」の提供開始について",
    content: "企業のAI導入を支援する新サービスを開始いたします。経験豊富なコンサルタントが、お客様のビジネスに最適なAIソリューションをご提案いたします。"
  },
  {
    id: 2,
    date: "2024年5月15日",
    title: "システム開発事業の拡大について",
    content: "この度、システム開発事業を拡大し、より幅広いお客様のニーズにお応えできるよう体制を強化いたしました。Webアプリケーションからモバイルアプリまで、幅広く対応いたします。"
  },
  {
    id: 3,
    date: "2025年12月20日",
    title: "教育研修プログラムの新コース追加",
    content: "プログラミング教育研修に新たに「データサイエンス基礎コース」を追加いたします。実務に即したカリキュラムで、データ分析スキルの向上をサポートいたします。"
  }
];

export default function News() {
  return (
    <section id="news" className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">お知らせ</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                  <time className="text-blue-400 font-medium text-sm md:text-base flex-shrink-0">
                    {item.date}
                  </time>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {item.content}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}