import QuizClient from "@/components/QuizClient";

const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/sip-switch";

export default function QuizPage() {
  return <QuizClient appStoreUrl={APP_STORE_URL} />;
}
