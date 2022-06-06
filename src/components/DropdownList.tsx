import { motion } from "framer-motion";
import { ReactElement, useRef, useState } from "react";
import styled from "styled-components";

// Math.floor(Math.random() * 8) * 15 + 50

const listData = [
  {
    color: "#454545",
    title: "Light Black",
    height: Math.floor(Math.random() * 8) * 15 + 50,
  },
  {
    color: "#728FCE",
    title: "Light Purple Blue",
    height: Math.floor(Math.random() * 8) * 15 + 50,
  },
  {
    color: "#151B8D",
    title: "Denim Dark Blue",
    height: Math.floor(Math.random() * 8) * 15 + 50,
  },
  {
    color: "#00FFFF",
    title: "Aqua or Cyan (W3C)",
    height: Math.floor(Math.random() * 8) * 15 + 50,
  },
  {
    color: "#045F5F",
    title: "Medium Teal",
    height: Math.floor(Math.random() * 8) * 15 + 50,
  },
  {
    color: "#728C00",
    title: "Venom Green",
    height: Math.floor(Math.random() * 8) * 15 + 50,
  },
  {
    color: "#F5DEB3",
    title: "Wheat (W3C)",
    height: Math.floor(Math.random() * 8) * 15 + 50,
  },
  {
    color: "#E55451",
    title: "Valentine Red",
    height: Math.floor(Math.random() * 8) * 15 + 50,
  },
];

const S = {
  Item: styled(motion.div)<{
    height: number;
    color: string;
    $topMargin: number;
  }>`
    height: ${({ height }) => `${height}px`};
    background-color: ${({ color }) => color};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `,
};

export const DropDownList = (): ReactElement => {
  const [list, setList] = useState(listData);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>();
  const [draggingItemIndex, setDraggingItemIndex] = useState<number>();

  const itemAnimation = {
    pressed: { scale: 0.95 },
  };

  const handleDragStart = (position: number) => {
    setDraggingItemIndex(position);
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    position: number
  ) => {
    setDragOverItemIndex(position);
  };

  const handleDragEnd = () => {
    if (
      draggingItemIndex !== undefined &&
      dragOverItemIndex !== undefined
    ) {
      const listCopy = [...list];
      const draggingItemContent = listCopy[draggingItemIndex];
      listCopy.splice(draggingItemIndex, 1);
      listCopy.splice(dragOverItemIndex, 0, draggingItemContent);

      setDragOverItemIndex(undefined);
      setDraggingItemIndex(undefined);
      setList(listCopy);
    }
  };

  return (
    <>
      {list &&
        list.map((item, index) => (
          <S.Item
            height={item.height}
            color={item.color}
            key={index}
            onDragStart={(e) => {
              handleDragStart(index);
            }}
            onDragEnter={(e) => {
              handleDragEnter(e, index);
            }}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            draggable
            $topMargin={
              index === dragOverItemIndex &&
              draggingItemIndex !== dragOverItemIndex &&
              draggingItemIndex !== undefined
                ? list[draggingItemIndex].height + 20
                : 0
            }
            variants={itemAnimation}
            whileTap="pressed"
            animate={{ marginTop: index === dragOverItemIndex &&
              draggingItemIndex !== dragOverItemIndex &&
              draggingItemIndex !== undefined
                ? list[draggingItemIndex].height + 20
                : 0 }}
            transition={{ duration: 0.5 }}
          >
            {`${item.title} - ${index} item`}
          </S.Item>
        ))}
    </>
  );
};
