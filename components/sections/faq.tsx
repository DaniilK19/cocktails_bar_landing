"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { seoContent } from "@/data/seo-content"
import { InternalLink } from "@/components/ui/internal-link"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section safe-top safe-bottom px-4 sm:px-6 lg:px-8 bg-aristocrat-void/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-title font-light serif mb-6">
            <span className="text-aristocrat-white">Questions</span>
            <br />
            <span className="text-aristocrat-cream font-extralight">Fréquentes</span>
          </h2>
          <hr className="w-12 lg:w-16 h-px bg-aristocrat-charcoal mx-auto mb-6 lg:mb-8 border-0" aria-hidden="true" />
          <p className="aristocrat-text max-w-2xl mx-auto text-body">
            Tout ce que vous devez savoir sur notre bar à cocktails parisien, 
            nos services et nos créations exclusives.
          </p>
        </motion.div>

        <div className="space-y-3 lg:space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {seoContent.structured_snippets.faq.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-aristocrat-charcoal/20 rounded-lg overflow-hidden touch-manipulation"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 lg:px-6 py-4 text-left flex items-center justify-between hover:bg-aristocrat-void/30 transition-colors duration-300 min-h-[60px] touch-manipulation"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 
                  className="text-subtitle font-light text-aristocrat-white pr-4 flex-1 min-w-0"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-aristocrat-cream" />
                  ) : (
                    <Plus className="w-5 h-5 text-aristocrat-cream" />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="px-4 lg:px-6 pb-4">
                      <p 
                        className="aristocrat-text text-aristocrat-cream/80 leading-relaxed text-body"
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 lg:mt-16"
        >
          <p className="aristocrat-text mb-6 lg:mb-8 text-body">
            D&apos;autres questions ? Notre équipe est à votre disposition pour vous renseigner.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <InternalLink
              href="#contact"
              variant="primary"
              title="Nous contacter pour toute question sur nos cocktails"
            >
              Nous Contacter
            </InternalLink>
            <InternalLink
              href="#cocktails"
              variant="secondary"
              showArrow
              title="Découvrir notre carte de cocktails artisanaux"
            >
              Voir Notre Carte
            </InternalLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}