import cors from "cors";
import express from "express";
import removeLeftZeros from "./utils.js";

const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "1/3/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" }
];

const app = express();
app.use(cors());
app.get("/holidays", (req, res) => {
  res.send(holidays);
});

app.get("/holidays/:idMonth", (req, res) => {
  const id = req.params.idMonth;

  let holidaysThisMonth = [];
  const today = new Date().toLocaleDateString().split("/");
  today[1] = removeLeftZeros(today[1]);

  holidaysThisMonth = holidays.filter((holiday) => {
    let { date } = holiday;
    date = date.split("/");
    if(date[0] === id){
      return holiday;
    }
  });
  
  res.send(holidaysThisMonth);
});

app.get("/is-today-holiday", (req, res) => {
  let todaysHoliday = "";
  const today = new Date().toLocaleDateString().split("/");
  today[0] = removeLeftZeros(today[0]);
  today[1] = removeLeftZeros(today[1]);
  
  holidays.forEach(({date, name}) => {
    date = date.split("/");
    if(date[0] === today[1] && date[1] === today[0] && date[2] === today[2]){
      todaysHoliday = name;
    }
  });
  
  if(todaysHoliday){
    res.send(`Sim, hoje é ${todaysHoliday}`);
  }
  else{
    res.send("Não, hoje não é feriado");
  }

});

app.listen(4000);