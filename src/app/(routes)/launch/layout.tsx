import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rocket Launch Schedule | Space Googles",
  description:
    "Live countdown timers, mission details, and video links for every upcoming orbital rocket launch — updated in real time from the Launch Library.",
  alternates: { canonical: "https://space-googles.co.uk/launch" },
};

export default function LaunchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
