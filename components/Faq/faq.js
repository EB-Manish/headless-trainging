import React, { useState } from 'react';

export const Faq = ({ faq }) => {
  const faqItemsCount = faq.faq_items;
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq text-black">
      {faqItemsCount > 0 &&
        Array.from({ length: faqItemsCount }, (_, index) => {
          const question = faq[`faq_items_${index}_questions`];
          const answer = faq[`faq_items_${index}_answers`];
          const isOpen = index === openIndex;

          return (
            <div key={index} className={`faq-item border-b ${isOpen ? 'open' : ''}`}>
              <div
                className="flex justify-between items-center py-4 cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <div className="faq-question font-bold">{question}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}
                >
                  <path
                    d="M12.9487 5V19"
                    stroke="#3C434A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.9187 12H19.9787"
                    stroke="#3C434A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {isOpen && <div className="faq-answer px-4 pb-4">{answer}</div>}
            </div>
          );
        })}
    </div>
  );
};
