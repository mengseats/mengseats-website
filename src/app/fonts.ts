import localFont from "next/font/local";

export const didotDisplay = localFont({
  src: [
    {
      path: "./fonts/Didot.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Didot-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const didotWordmark = localFont({
  src: [
    {
      path: "./fonts/Didot-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});
