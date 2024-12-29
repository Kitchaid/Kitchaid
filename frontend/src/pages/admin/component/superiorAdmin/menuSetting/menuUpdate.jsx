import React, { useState } from "react";
import "react-router-dom";
import { useQuery } from "react-query";
import MenuTable from "./menuTable";
import { RestoreOneDish } from "../../../../../hooks/admin/superiorAdmin"
import { getDeleteMenu } from "../../../../../hooks/menu/menu";
import { Modal, Row, Col } from "react-bootstrap";

function MenuUpdate(menuData) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState('')
  const { data: deletedMenu } = useQuery('getDeletedMenu', getDeleteMenu,
    {
      onSuccess: () => { setId(deletedMenu?.data[0]?._id) },
    });
  const { mutate: restoreMenu } = RestoreOneDish();
  const handleRestore = (dishId) => {
    const isDeleted = false;
    restoreMenu({ id, dishId, isDeleted })
  }
  // search bar
  const searchArray = menuData?.menuData?.filter((dish) => {
    return dish?.dishName?.toLowerCase().includes(searchTerm)
  });
  function CreateRecord(menu) {
    const props = {
      key: menu._id,
      _id: menu._id,
      menuId: menuData.menuId,
      dishName: menu.dishName.toLowerCase(),
      mainIngredient: menu.mainIngredient,
      sideIngredient: menu.sideIngredient,
      mainIngredientPerGuest: menu.mainIngredientPerGuest,
      sideIngredientPerGuest: menu.sideIngredientPerGuest,
      mainIngredientUnit: menu.mainIngredientUnit,
      sideIngredientUnit: menu.sideIngredientUnit,
      sauseSoupPerGuest: menu.sauseSoupPerGuest,
      contentType: menu.contentType,
      data: menu.data,
      path: menu.path,
      makeOwnMainDish: menu.makeOwnMainDish,
      makeOwnSide: menu.makeOwnSide,
      makeOwnSauce: menu.makeOwnSauce,
      allergic:menu.allergic,
    };
    return (
      <MenuTable
        {...props}
      />
    )
  }

  return (
    <>
      <Row>
        <Col>
          <div onClick={handleShow}>
            <i className="fa-solid fa-dumpster fa-fade glow"></i>
            <span className="glow text-danger"> Skräp</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="input-group-sm">
            <input
              type="search"
              className="form-control m-auto mb-4 mt-4 searchWindow"
              placeholder="Sök maträtten"
              aria-label="Sök..."
              aria-describedby="button-addon2"
              onChange={(e) => {
                e.preventDefault();
                setSearchTerm(e.target.value.toLocaleLowerCase());
              }}
              value={searchTerm.toLowerCase()}
            />
          </div>
          <div className="searchResult">
            <div >
              <ul>
                <li>{searchArray?.map(CreateRecord)}</li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            <span></span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Rättens namn</th>
                <th scope="col">Återställa</th>
              </tr>
            </thead>
            {deletedMenu?.data[0]?.menu?.map((dish, index) => {
              return <>
                <tbody>
                  <tr key={index}>
                    <th scope="row"></th>
                    <td>{dish?.dishName}</td>
                    <td><i
                      className="fa-solid fa-arrow-rotate-right fa-spin glow"
                      onClick={() => { handleRestore(dish._id) }}
                    >
                    </i>
                    </td>
                  </tr>
                </tbody>
              </>
            })}
          </table>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MenuUpdate;
