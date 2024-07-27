export type props = {
  name: string;
};

export const Box1 = ({ name }: props) => {
  return <div className="color">{name}</div>;
};
