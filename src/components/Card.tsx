import React, { FC } from "react";

interface CardProps {
  judul?: string;
  parentSet?: string;
  rightSet?: string;
  children?: React.ReactNode;
  rightSide?: any;
  titleSet?: string;
  name?: string;
  img?: string;
  key?: string;
  onClick?: () => void;
}

export const WrappingCard: FC<CardProps> = ({
  titleSet,
  judul,
  parentSet,
  children,
  rightSide,
  rightSet,
}) => {
  return (
    <div className="my-10 mx-5 md:mx-12 xl:m-20">
      <div className="box-border w-full bg-white rounded-3xl border-sky border-2">
        <div className="flex mx-3 md:mx-5 xl:mx-10 mt-10 items-center justify-between">
          <div className="flex justify-start">
            <h1
              className={`capitalize text-xl md:text-2xl lg:text-2xl ${titleSet}`}
            >
              {judul}
            </h1>
          </div>
          <div className={`flex justify-end ${rightSet}`}>{rightSide}</div>
        </div>
        <hr className="mx-3 md:mx-5 xl:mx-10 my-3 border-[1.5px] border-sky" />
        <div className={`${parentSet} p-3 md:p-6 xl:p-10`}>{children}</div>
      </div>
    </div>
  );
};

export const MiniCard: FC<CardProps> = ({
  name,
  img,
  key,
  onClick,
}) => {
  return (
    <div
      className="card card-compact bg-white shadow-lg border-2 border-black m-2 hover:scale-95 transition"
      key={key}
    >
      <figure className="w-full h-full p-5 " onClick={onClick}>
        <img className="h-full" src={img} alt={name} width={150} height={150}/>
      </figure>
      <div className="card-body">
        <p
          className="text-center text-black text-xs md:text-md lg:text-lg uppercase font-bold "
          onClick={onClick}
        >
          {name}
        </p>
      </div>
    </div>
  );
};
