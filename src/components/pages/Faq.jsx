"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What are the directions?",
      answer:
        "You can find directions to our branches on our locations page or contact our support team for assistance.",
    },
    {
      question: "How can I book a bus ticket?",
      answer:
        "Bus tickets can be booked online through our website or at any of our branch offices.",
    },
    {
      question: "How to pay?",
      answer:
        "We accept multiple payment methods including cash, credit cards, and online payment systems.",
    },
    {
      question: "Can I request rescheduling?",
      answer:
        "Yes, you can request rescheduling depending on availability. Please contact customer support for assistance.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" bg-mainbg max-w-4xl mx-auto px-4 py-28">
      <h2 className="text-3xl font-bold text-center text-primary mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-Textcolor mb-10">
        Can’t find the answer you’re looking for? Reach out to our customer
        support team.
      </p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b last:border-none pb-4 cursor-pointer"
          >
            <div
              className="flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg text-black">{faq.question}</h3>
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {activeIndex === index && (
              <p className="text-gray-600 mt-3">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
