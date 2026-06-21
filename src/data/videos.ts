export const backgroundVideos = {
  hero: {
    src: "/videos/hero-office.mp4",
    poster: "/videos/posters/hero-office.jpg",
    opacity: 0.5,
    credit: "Mixkit — Business people at work meeting",
  },
  ambient: {
    src: "/videos/ambient-coding.mp4",
    poster: "/videos/posters/ambient-coding.jpg",
    opacity: 0.42,
    credit: "Mixkit — Programming and coding",
  },
  grid: {
    src: "/videos/cta-meeting.mp4",
    poster: "/videos/posters/cta-meeting.jpg",
    opacity: 0.38,
    credit: "Mixkit — Brainstorming over the meeting table",
  },
} as const;

export type BackgroundVideoKey = keyof typeof backgroundVideos;
