"use client";

import { motion } from "framer-motion";
import { Brain, Code, LineChart } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI顧問制度",
    description: "最新のAI技術を活用し、ビジネスの効率化と革新をサポートします。",
    image: "/education.png",
  },
  {
    icon: Code,
    title: "WEB/AI開発",
    description: "高品質なウェブアプリケーションとAIソリューションを提供します。",
    image: "/engineer.png",
  },
  {
    icon: LineChart,
    title: "業務改善コンサルティング",
    description: "デジタル技術を活用した業務効率化のコンサルティングを行います。",
    image: "/consulting.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-black relative overflow-hidden">
      {/* Background Pattern */}
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
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">サービス紹介</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            お客様のニーズに合わせた最適なソリューションを提供します
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-gray-900/50 rounded-lg overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content Container - Below Image */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Spacer to push the line to the bottom */}
                <div className="flex-grow"></div>
                
                {/* Hover Effect Line */}
                <div className="h-1 w-full mt-6">
                  <div className="h-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent border-2 border-white rounded-full overflow-hidden transition-all duration-300 hover:bg-white hover:text-black"
          >
            <span className="relative z-10">お問い合わせはこちら</span>
            <div className="absolute inset-0 -z-10 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}