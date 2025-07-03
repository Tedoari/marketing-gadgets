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
    images: [
      "/images/claw_machine/Clawmachine-1.jpg",
      "/images/claw_machine/Clawmachine-2.jpg",
      "/images/claw_machine/Clawmachine-3.jpg",
      "/images/claw_machine/Clawmachine-4.jpg",
      "/images/claw_machine/Clawmachine-video.mp4",
      "/images/claw_machine/Clawmachine-video-2.mp4",
    ],
    
    categories: ["Games", "Robotics"],
    description: "",
  },
  {
    id: 3,
    title: "Rover",
    images: [
      "/images/rover/Rover_1.jpg",
      "/images/rover/Rover_2.jpg",
      "/images/rover/Rover_3.jpg",
      "/images/rover/Rover_4.jpg",
      "/images/rover/Rover_video.mp4",
    ],
    categories: ["Robotics"],
    description: "",
  },
  {
    id: 4,
    title: "Exter Game & Drill Game",
    images: [
      "/images/exter_game/Exster_game_1.jpg",
      "/images/exter_game/Exster_game_2.jpg",
      "/images/exter_game/Exster_game_3.jpg",
      "/images/exter_game/Exster_game_4.jpg",
      "/images/exter_game/Exster_game_5.jpg",
      "/images/exter_game/Screenshot_59.png",
      "/images/exter_game/Screenshot_60.png",
      "/images/exter_game/Screenshot_61.png",
    ],
    categories: ["Games"],
    description: "",
  },
];
