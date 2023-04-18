import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [amount, setAmount] = useState(0);
  const [receiverId, setReceiverId] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("http://localhost:8080/users", {
      method: "GET",
    })
      .then((res) => {
        if (res.ok === true) return res.json();
        return;
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const transferMoney = (e) => {
    e.preventDefault();
    const dataBody = { senderId, receiverId, amount };
    fetch("http://localhost:8080/transfer", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        alert(res.msg);
        getUsers();
      });
  };

  return (
    <div className="App">
      <h1>perkenalkan nama saya bryan HUAHAHAHAHAH</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>nama</th>
            <th>uang</th>
            <th>Transfer</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.nama}</td>
                <td>{data.uang}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      setSenderId(data.id);
                    }}
                  >
                    Transfer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <label>
          <h4>Sender Id: </h4>
        </label>
        <form onSubmit={transferMoney}>
          <input
            type="text"
            id="input1"
            value={senderId ? senderId : ''}
            placeholder={senderId ? senderId : "Sender Id"}
            onChange={(e) => {
              setSenderId(e.target.value)
            }}
          />
          <label>
            <h4>Amount: </h4>
          </label>
          <input
            type="text"
            id="input3"
            placeholder="amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <label>
            <h4>Transfer to </h4>
          </label>
          <input
            type="text"
            id="input2"
            placeholder="Receiver Id"
            onChange={(e) => {
              setReceiverId(e.target.value);
            }}
          />
          <br />
          <button type="submit" id="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
