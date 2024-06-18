import { Table, Card } from "react-bootstrap";
import centerDiv from "../../styles/centerDiv";
import { useNavigate } from "react-router";

type Props = {
  items: any;
};

const TableItems = ({ items }: Props) => {
  const navigate = useNavigate();
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>
            {" "}
            <div style={centerDiv}>#</div>
          </th>
          <th>
            <div style={centerDiv}>Image</div>
          </th>
          <th>
            <div style={centerDiv}>Name</div>
          </th>
          <th>
            <div style={centerDiv}>Price</div>
          </th>
          <th>
            <div style={centerDiv}>Quantity</div>
          </th>
          <th>
            <div style={centerDiv}>Total</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item: any, index: any) => (
          <tr key={item.id}>
            <td>
              {" "}
              <div style={centerDiv}>{index + 1}</div>
            </td>
            <td>
              <div style={centerDiv}>
                {" "}
                <Card.Img
                  width={40}
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  src={
                    item.category === "CD"
                      ? "/cd.jpg"
                      : item.category === "Book"
                      ? "/book.jpg"
                      : "/dvd.jpg"
                  }
                  onClick={() => navigate(`/product/${item.id}`)}
                />
              </div>
            </td>
            <td>{item.name}</td>
            <td>
              <div style={centerDiv}>${item.price.toFixed(2)}</div>
            </td>
            <td>
              <div style={centerDiv}>
                <span
                  style={{
                    marginLeft: "12px",
                    marginRight: "12px",
                    cursor: "pointer",
                  }}
                >
                  {item.quantity}
                </span>
              </div>
            </td>
            <td>
              {" "}
              <div style={centerDiv}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableItems;
