import { ISlides } from "@/type";

const SLIDES: ISlides[] = [
  {
    id: "1",
    title: "Welcome to App",
    description: "Discover amazing features and content made just for you",

    image: "https://picsum.photos/id/1/300/300",
  },
  {
    id: "2",
    title: "Features & Tools",
    description: "Explore powerful tools designed to boost your productivity",
    image: "https://picsum.photos/id/2/300/300",
  },
  {
    id: "3",
    title: "Get Started",
    description: "Youre all set! Start using the app and enjoy the experience",
    image: "https://picsum.photos/id/3/300/300",
  },
];
const CARD_WIDTH = (width: number) => width * 0.8;
const SPACING = 10;

export { CARD_WIDTH, SLIDES, SPACING };
