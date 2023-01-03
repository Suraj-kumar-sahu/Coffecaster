import { useState, useEffect } from "react";
import "./Memos.css" ;

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <>
    <div className="Memos">
      <h3 >Supporters</h3>
      {memos.map((memo) => {
        return (
          <div id="table-container">
            <table >
              <tbody id="table-body">
                <tr className="t-row">
                  <td className="t-data">
                    {memo.name}
                  </td>
                  <td className="t-data">
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>
                  <td className="t-data">
                    {memo.message}
                  </td>
                  <td className="t-data">
                    {memo.from}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}

  </div>  
    </>
  );
};
export default Memos;
