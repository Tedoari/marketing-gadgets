export type Category = 'Popular' | 'Robotics' | 'Games';

export interface Product {
  id: number;
  title: string;
  images: string[];  
  categories: Category[];
  description: string;
}

export const products: Product[] = [
  { id: 1, title: 'Robot Dog', images: ['/images/robot_dog/wide_focus_shot.jpg', '/images/robot_dog/1712066699579.jpg'], categories: ['Robotics'], description: ''},
  { id: 2, title: 'Claw Machine', images: [], categories: ['Games', 'Robotics'], description: ''},
  { id: 3, title: 'Exter Game & Drill Game', images: ['/images/exter_game/Screenshot_59.png'], categories: ['Games'], description: ''},
  { id: 4, title: 'Rover', images: ['/images/rover/Arm middle.jpg'], categories: ['Robotics'], description: ''},
];
