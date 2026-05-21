"use client";

import { useEffect } from "react";

interface AdUnitProps {
  /**
   * The ad slot ID generated from your Google AdSense dashboard
   */
  slotId: string;
  /**
   * The visual format of the ad
   */
  format?: "horizontal" | "rectangle" | "vertical" | "auto" | "fluid";
  /**
   * Layout type (used for native in-article ads)
   */
  layout?: "in-article";
  /**
   * Layout key (used for native in-feed ads)
   */
  layoutKey?: string;
  /**
   * Whether the ad should dynamically resize to fill the container width
   */
  responsive?: boolean;
}

export const AdUnit = ({
  slotId,
  format = "auto",
  layout,
  layoutKey,
  responsive = true,
}: AdUnitProps) => {
  useEffect(() => {
    try {
      // Trigger the AdSense script to populate this specific ad slot
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense script error:", err);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-6 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: layout === "in-article" ? "center" : undefined }}
        data-ad-client="ca-pub-7386584956005563"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};
