import React, { useState } from "react";
import QuizAnswers from "../../../../components/Molecul/List/QuizAnswers";

export default {
  component: QuizAnswers,
  title: "Design System/Molecul/List",
};

const Template = (props) => {
  const { answers } = props;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  return (
    <QuizAnswers
      styles={{ fullWidth: true, background: true }}
      value={selectedAnswer}
      onChange={(e) => setSelectedAnswer(e.target.value)}
      options={answers.map((item) => {
        return { label: item, value: item };
      })}
    />
  );
};

export const QuizAnswers_ = Template.bind({});

QuizAnswers_.args = {
  answers: ["Figma", "Sketch"],
};
