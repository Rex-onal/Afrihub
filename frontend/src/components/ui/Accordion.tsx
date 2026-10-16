import React, { useState, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionItemData {
  id?: string;
  question: string;
  answer: string | React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
  itemClassName,
}) => {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // first item open by default
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const itemId = item.id || `${baseId}-item-${index}`;
        const triggerId = `${itemId}-trigger`;
        const contentId = `${itemId}-content`;

        return (
          <div
            key={itemId}
            className={cn(
              'border border-[#D7C3AE]/40 rounded-2xl bg-white overflow-hidden transition-colors shadow-sm',
              isOpen && 'border-[#835500]/40 bg-[#FCF9F8]',
              itemClassName
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => handleToggle(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-serif text-base sm:text-lg font-bold text-[#1C1B1B] hover:text-[#835500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#835500] focus-visible:ring-offset-2 transition-colors select-none"
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    'w-8 h-8 rounded-full bg-[#F0EDEC] flex items-center justify-center shrink-0 text-[#1C1B1B] transition-transform duration-300',
                    isOpen && 'rotate-180 bg-[#F5A623] text-[#1C1B1B]'
                  )}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, height: 'auto' }
                      : { opacity: 0, height: 0 }
                  }
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0, height: 'auto' }
                      : { opacity: 0, height: 0 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 font-sans text-sm sm:text-base text-[#524534] leading-relaxed border-t border-[#D7C3AE]/20">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
