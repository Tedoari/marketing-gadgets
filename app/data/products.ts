export type Category = "Popular" | "Robotics" | "Games";

export interface Product {
  id: number;
  title: string;
  images: string[];
  categories: Category[];
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Robot Dog",
    images: [
      "/images/robot_dog/wide_focus_shot.jpg",
      "/images/robot_dog/Robot_dog_1.jpg",
      "/images/robot_dog/Robot_dog_2.jpg",
      "/images/robot_dog/Robot_dog_3.jpg",
      "/images/robot_dog/Robot_dog_video.mp4",
    ],
    categories: ["Robotics"],
    description: "",
  },
  {
    id: 2,
    title: "Claw Machine",
    images: [],
    categories: ["Games", "Robotics"],
    description: "",
  },
  {
    id: 3,
    title: "Rover",
    images: ["/images/rover/Arm middle.jpg"],
    categories: ["Robotics"],
    description: "",
  },
  {
    id: 4,
    title: "Exter Game & Drill Game",
    images: ["/images/exter_game/Screenshot_59.png"],
    categories: ["Games"],
    description: "",
  },
];
