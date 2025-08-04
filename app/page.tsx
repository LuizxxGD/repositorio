"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Shield, Users, Zap, Gift } from "lucide-react"
import { useEffect, useState } from "react"

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600]/5 to-[#6633CC]/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6600]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6633CC]/10 rounded-full blur-3xl"></div>
        </div>
        <div
          className={`relative max-w-5xl mx-auto text-center transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <Badge className="mb-8 bg-gradient-to-r from-[#6633CC] to-[#8B5CF6] text-white px-8 py-3 text-sm font-medium rounded-full shadow-lg backdrop-blur-sm border border-white/10">
            CURSO AVANÇADO
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-8 text-white leading-[1.1] tracking-tight">
            Curso de Desbloqueio de{" "}
            <span className="font-semibold bg-gradient-to-r from-[#FF6600] to-[#FF8533] bg-clip-text text-transparent">
              iPhones
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
            Aprenda a desbloquear todos os modelos de iPhone com nosso curso completo do zero ao avançado
          </p>

          {/* Promotional Offer */}
          <div className="bg-gradient-to-r from-[#FF6600] to-[#FF8533] text-white p-8 sm:p-10 rounded-3xl mb-12 shadow-2xl mx-auto max-w-2xl backdrop-blur-sm border border-white/10">
            <p className="text-base sm:text-lg font-medium mb-4 opacity-90">
              Oferta especial válida apenas hoje – 04/08/2025
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-xl sm:text-2xl line-through opacity-60 font-light">R$ 147,00</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">R$ 19,90</span>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-[#FF6600] to-[#FF8533] hover:from-[#E55A00] hover:to-[#E5751A] text-white text-lg sm:text-xl px-12 sm:px-16 py-6 sm:py-8 rounded-2xl font-medium shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto border border-white/10 backdrop-blur-sm">
            Começar Agora
          </Button>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white tracking-tight">
              Módulos do Curso
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light">
              Conteúdo estruturado para levar você do iniciante ao profissional
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {[
              {
                number: "01",
                title: "Apresentação do Curso",
                description:
                  "Apresentação do curso e do conteúdo. Conceitos sobre desbloqueios e vai aprender na prática a como dominar a ferramenta UnlockTool.",
              },
              {
                number: "02",
                title: "Método Lucrativo",
                description:
                  "Passo a passo para você desbloquear o iPhone muito rápido e lucrar até R$ 700,00 por aparelho. Compartilho meu método e os melhores servidores.",
              },
              {
                number: "03",
                title: "Ferramentas e Softwares",
                description:
                  "Apresentação de ferramentas, softwares e servidores que vamos utilizar para realizar os desbloqueios com eficiência.",
              },
              {
                number: "04",
                title: "Aulas Práticas",
                description:
                  "Aulas práticas de desbloqueios usando ferramentas e servidores apresentados no curso, com todo o suporte necessário.",
              },
            ].map((module, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 hover:border-[#FF6600]/30 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm rounded-3xl overflow-hidden group`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="bg-gradient-to-r from-[#FF6600] to-[#FF8533] text-white rounded-2xl w-16 h-16 flex items-center justify-center font-light text-2xl flex-shrink-0 shadow-lg group-hover:shadow-[#FF6600]/25 transition-all duration-300">
                      {module.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-medium text-white mb-4 tracking-tight">
                        Módulo {module.number}: {module.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-base sm:text-lg font-light">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Bonuses */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white tracking-tight">
              Bônus Exclusivos
            </h2>
            <p className="text-lg sm:text-xl text-[#FF6600] font-medium">Para quem adquirir o plano premium</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Bypass iOS 17.5",
                description: "Técnicas avançadas para contornar as últimas proteções do iOS",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Suporte Individual",
                description: "Atendimento personalizado via AnyDesk com especialistas",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Servidores Premium",
                description: "Acesso exclusivo aos melhores servidores do mercado",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Kit de Ferramentas",
                description: "Conjunto completo de ferramentas profissionais",
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: "Atualizações Vitalícias",
                description: "Receba todas as atualizações sem custo adicional",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Certificado Oficial",
                description: "Comprove sua expertise com certificado de conclusão",
              },
            ].map((bonus, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/30 to-black/30 border border-gray-800/30 hover:border-[#6633CC]/40 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm rounded-3xl overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-[#6633CC] mb-6 flex justify-center group-hover:scale-110 transition-all duration-300">
                    {bonus.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-4 tracking-tight">{bonus.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">{bonus.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What is the Course */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-10 text-white tracking-tight">
            O que é o Curso de Desbloqueio?
          </h2>
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 p-10 sm:p-12 rounded-3xl backdrop-blur-sm border border-gray-800/30 mb-12">
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-200 font-light">
              É o treinamento mais completo e atualizado do Brasil sobre{" "}
              <span className="font-medium text-[#FF6600]">desbloqueio de iPhones</span>. Mesmo que você{" "}
              <span className="font-medium text-[#FF6600]">nunca tenha feito isso antes</span>, você vai aprender{" "}
              <span className="font-medium text-[#FF6600]">passo a passo</span> tudo o que precisa para começar{" "}
              <span className="font-medium text-[#FF6600]">do zero até o nível profissional</span>.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-[#FF6600] to-[#FF8533] hover:from-[#E55A00] hover:to-[#E5751A] text-white text-lg sm:text-xl px-12 sm:px-16 py-6 sm:py-8 rounded-2xl font-medium shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto border border-white/10 backdrop-blur-sm">
            Começar Agora
          </Button>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="bg-gradient-to-r from-[#6633CC]/20 to-[#8B5CF6]/20 backdrop-blur-sm border border-[#6633CC]/20 p-10 sm:p-12 rounded-3xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl sm:text-3xl font-medium mb-6 text-white tracking-tight">Comunidade de Suporte</h3>
            <p className="text-lg sm:text-xl text-gray-300 font-light">
              Faça parte do nosso grupo exclusivo com milhares de membros prontos para ajudar
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#FF6600]/20 to-[#FF8533]/20 backdrop-blur-sm border border-[#FF6600]/20 p-10 sm:p-12 rounded-3xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl sm:text-3xl font-medium mb-6 text-white tracking-tight">Garantia Total</h3>
            <p className="text-lg sm:text-xl text-gray-300 font-light">
              7 dias de garantia incondicional - satisfeito ou seu dinheiro de volta
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-black to-gray-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-300 mb-6 text-base sm:text-lg font-light">
              Copyright 2025 -{" "}
              <span className="font-medium bg-gradient-to-r from-[#FF6600] to-[#FF8533] bg-clip-text text-transparent">
                Expert Unlocker ®
              </span>{" "}
              Todos os direitos reservados.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              <a
                href="#"
                className="text-[#FF6600] hover:text-[#FF8533] transition-all duration-300 font-medium hover:underline"
              >
                Termos de Uso
              </a>
              <a
                href="#"
                className="text-[#FF6600] hover:text-[#FF8533] transition-all duration-300 font-medium hover:underline"
              >
                Políticas de Privacidade
              </a>
            </div>
          </div>

          <div className="text-sm text-gray-500 leading-relaxed space-y-6 max-w-4xl mx-auto font-light">
            <p>
              <span className="font-medium text-gray-400">Aviso sobre Plágio:</span> Todo o conteúdo deste curso é
              protegido por direitos autorais. A reprodução não autorizada é crime previsto em lei.
            </p>
            <p>
              <span className="font-medium text-gray-400">Isenção de Responsabilidade:</span> Os resultados podem variar
              de pessoa para pessoa. Este curso é apenas para fins educacionais. O uso das técnicas ensinadas deve
              respeitar as leis locais.
            </p>
            <p>
              <span className="font-medium text-gray-400">Importante:</span> Este curso destina-se apenas ao desbloqueio
              de aparelhos próprios ou com autorização expressa do proprietário. O uso indevido das técnicas é de
              responsabilidade exclusiva do usuário.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
