export type Category = 'Popular' | 'Robotics' | 'Games';

export interface Product {
  id: number;
  title: string;
  image: string;
  categories: Category[];
  description: string;
}

export const products: Product[] = [
  { id: 1, title: 'Robot Dog', image: '/images/robot_dog/wide_focus_shot.jpg', categories: ['Robotics'], description: ''},
  { id: 2, title: 'Claw Machine', image: '', categories: ['Games', 'Robotics'], description: ''},
  { id: 3, title: 'Exter Game & Drill Game', image: '/images/exter_game/Screenshot_59.png', categories: ['Games'], description: ''},
  { id: 4, title: 'Rover', image: '/images/rover/Arm middle.jpg', categories: ['Robotics'], description: ''},
];