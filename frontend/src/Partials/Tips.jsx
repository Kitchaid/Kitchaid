import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

function Tips({ containerSelection }) {
  const kantin_img = [
    {
      imgName: "1/2 låg bleck",
      src: "/kantin/halv_lag_bleck.webp",
      description:
        "Rostfri kantin 265x325x65mm. Ca 3 liter med fullt last",
    },
    {
      imgName: "1/1 låg bleck",
      src: "/kantin/lag_bleck.webp",
      description:
        "Rostfri kantin 265x325x150mm. Ca 6 liter (Kilo) med fullt last",
    },
    {
      imgName: "1/1 djupa bleck",
      src: "/kantin/djupa_bleck.webp",
      description:
        "Rostfri kantin 325x530x100mm. Ca 10 liter (Kilo) med fullt last",
    },
    {
      imgName: "1/2 djupa bleck",
      src: "/kantin/halv_djupa.webp",
      description:
        "Rostfri kantin 265x325x100mm. Ca 4 liter med fullt last",
    },
    {
      imgName: "Medium kantin",
      src: "/kantin/6liter.webp",
      description:
        "Rostfri kantin 265x325x150mm. Ca 7 liter med fullt last",
    },
    {
      imgName: "Full storlek kantin",
      src: "/kantin/10liter.webp",
      description:
        "Rostfri kantin 265x325x200mm. Ca 10 liter med fullt last",
    },
  ];
  const [cardToggles, setCardToggles] = useState(Array(kantin_img.length).fill(false));

  const handleCardClick = (index) => {
    const newToggles = Array(kantin_img.length).fill(false);
    newToggles[index] = !cardToggles[index];
    setCardToggles(newToggles);
  };
  return (
    <>
      {kantin_img.map((img, index) => {
        return <>
          <Card
            key={index}
            className={cardToggles[index] ? 'card-toggled mt-2 cursor' : 'card-untoggled mt-2 cursor'}
            onClick={() => { containerSelection({ src: img.src, name: img.imgName });  handleCardClick(index)}}>
            <Card.Img variant="top" src={img.src} />
            <Card.Body>
              <Card.Title>{img.imgName}</Card.Title>
              <Card.Text>
                {img.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      })}
    </>
  );
}

export default Tips;