import express, { Express, Request, Response} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.json());

interface Transaction {
  id: number;
  tipe: string;
  nama: string;
  detail: string;
  amount: number;
}

const listTransactions: Transaction[] = [
  { id: 1, tipe: "Cash In", nama: "Gaji", detail: "Gaji Bulan Juli", amount: 5000000 },
  { id: 2, tipe: "Cash Out", nama: "Tagihan Listrik", detail: "Tagihan listrik bulan Juli", amount: 400000 },
];


app.get("/transactions", (req, res) => {
    res.json({
        message: "success get datatransaction",
        listTransactions,
      });
});

app.get("/transactions/:id", (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.id, 10);
  
    if (!Number.isNaN(transactionId)) {
      let currentData = listTransactions.filter((item) => item.id === transactionId);
      if (currentData.length !== 0) {
        res.json({
          message: "success get data transaction",
          currentData,
        });
      } else {
        res.json({
          message: "cannot find data transaction",
        });
      }
    } else {
      res.json({
        message: "invalid transaction ID",
      });
    }
  });
  
  // POST TRANSACTION
  app.post("/transactions", (req, res) => {
    console.log(req.body);
  
    let insertData = {
      id: listTransactions[listTransactions.length - 1].id + 1,
      tipe: req.body.tipe,
      nama: req.body.nama,
      detail: req.body.detail,
      amount: req.body.amount,
    };
  
    listTransactions.push(insertData);
  
    res.json({
      message: "succcess adding one transaction",
      listTransactions,
    });
  });
  
  // Not Found
  app.get("*", (req, res) => {
    let body = `<h1>Maaf halaman tidak ditemukan</h1>`;
    res.send(body);
  });
  

app.listen(PORT, () => {
  console.log("running on port " + PORT);
});
