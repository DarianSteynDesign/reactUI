import { useMessageFlow } from "../app/hooks/useMessageFlow";

export default function Home() {
  const introductionMessage = {
    text: "Hey there! I’m Proton, I’m here to show you around while Darian isn’t here.",
    delay: 5000,
    route: "",
    shouldTriggerIdle: true,
  };
  const ohYesMessage = {
    text: "You can always always click on me to navigate to a specific page.",
    delay: 5000,
    route: "",
  };
  const nextStepMessage = {
    text: "First, Let’s sign you up.",
    delay: 0,
    route: "/signup",
  };

  useMessageFlow([
    {
      text: introductionMessage.text,
      position: [2, 3],
      delayTime: introductionMessage.delay,
      route: introductionMessage.route,
    },
    {
      text: ohYesMessage.text,
      delayTime: ohYesMessage.delay,
      route: ohYesMessage.route,
    },
    {
      text: nextStepMessage.text,
      delayTime: nextStepMessage.delay,
      route: nextStepMessage.route,
      shouldTriggerIdle: introductionMessage.shouldTriggerIdle,
    },
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-700"></div>
  );
}
