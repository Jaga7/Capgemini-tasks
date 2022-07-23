export type TodoObject = {
  title: string;
  body: string;
  id: number | string;
  isComplete: boolean;
};

export type TodoCardProps = {
  todo: TodoObject;
};
