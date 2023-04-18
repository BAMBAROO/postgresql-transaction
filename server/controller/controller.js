const pool = require("../config/index");

const getUsersBank = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM user_bank;");
    if (!result) return res.status(404).json({ msg: "No User Found." });
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

const transferMoney = async (req, res) => {
  const client = await pool.connect();
  const { senderId, receiverId, amount } = req.body;
  if (!senderId || !receiverId)
    return res
      .status(404)
      .json({ msg: "senderId, amount and receiverId are required." });
  const sufficient = await client.query(
    "SELECT uang FROM user_bank WHERE id=$1",
    [senderId]
  );
  if (sufficient.rows.length === 0)
    return res
      .status(404)
      .json({ msg: "transfer failed, please check the sender's ID." });
  const money = parseInt(sufficient.rows[0].uang);
  if (money < amount)
    return res.status(400).json({ msg: "money is not enough to transfer." });
  try {
    await client.query("BEGIN");
    const senderQuery =
      "UPDATE user_bank SET uang=uang-$1 WHERE id=$2 RETURNING nama, uang, id;";
    const receiverQuery =
      "UPDATE user_bank SET uang=uang+$1 WHERE id=$2 RETURNING nama, uang, id;";
    const senderSuccess = await client.query(senderQuery, [amount, senderId]);
    const receiveSuccess = await client.query(receiverQuery, [
      amount,
      receiverId,
    ]);
    if (senderSuccess.rows.length === 0 || receiveSuccess.rows.length === 0)
      throw new Error("transfer failed, please check the receiver's ID");
    res.status(200).json({ msg: "transfer success." });
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  } finally {
    client.release();
  }
};

module.exports = { getUsersBank, transferMoney };
