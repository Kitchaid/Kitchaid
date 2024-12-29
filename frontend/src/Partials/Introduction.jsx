import React from "react";
import { Modal, Figure} from "react-bootstrap";
function Intro() {
  return (<>
            <Modal.Header closeButton>
              <Modal.Title>
                Introduktion
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src="./imgsAndVideos/matsvinn.jpeg"
                />
                <Figure.Caption>Minska matsvinnet</Figure.Caption>
              </Figure>
              <p>
                Välkommen till vår nya app som hjälper till att minska
                matsvinnet genom att ge restaurangchefer och personal en bättre
                kontroll över matbeställningar och hur mycket mat som faktiskt
                äts upp. Med ökande klimatförändringar och begränsade resurser
                på vår planet är det viktigt att minska matavfallet så mycket
                som möjligt. {<br></br>}Vår app gör det möjligt för restaurangpersonal att
                registrera och hantera matbeställningar på ett mer effektivt
                sätt. Genom att ge en överblick över hur mycket mat som beställs
                och hur mycket som faktiskt äts upp kan restauranger bättre
                anpassa sin matproduktion och minska överflödigt matsvinn. {<br></br>}Appen
                är enkel att använda och gör det möjligt för restaurangpersonal
                att lägga till och hålla koll på hur mycket mat
                som konsumeras vid olika maträtt. På så sätt kan de snabbt anpassa sin
                matproduktion och minska matsvinnet. {<br></br>}Vi tror att vår app kan
                göra en stor skillnad när det gäller att minska matsvinnet och
                bidra till en mer hållbar framtid. Vi hoppas att restauranger
                runt om i världen kommer att upptäcka fördelarna med att använda
                vår app för att minska matsvinnet och göra en positiv inverkan
                på vår planet.
              </p>
              <a href="https://www.livsmedelsverket.se/matvanor-halsa--miljo/matsvinn">
                För mer om matsvinn
              </a>
            </Modal.Body>
            <Modal.Footer>
              <p className="small">
              Copyright © 2022 - 2023 kitchaid.se All rights reserved
              </p>
            </Modal.Footer>
            </>
  );
}

export default Intro;
