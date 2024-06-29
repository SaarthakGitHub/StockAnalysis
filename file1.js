import makeChart from "./file2.js";
let api1;
let api2;
let api3;
const stocks = [
  "AAPL",
  "AMZN",
  "DIS",
  "GOOGL",
  "JPM",
  "MSFT",
  "NFLX",
  "NVDA",
  "PYPL",
  "TSLA",
];
(async function fetchData() {
  try {
    let response = await fetch(
      "https://stocks3.onrender.com/api/stocks/getstocksprofiledata"
    );
    api1 = (await response.json()).stocksProfileData[0];
    response = await fetch(
      "https://stocks3.onrender.com/api/stocks/getstocksdata"
    );
    api2 = (await response.json()).stocksData[0];
    response = await fetch(
      "https://stocks3.onrender.com/api/stocks/getstockstatsdata"
    );
    api3 = (await response.json()).stocksStatsData[0];
    displayDefaultStock();
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
})().then(() => {
  console.log(api2);
  const list = document.getElementsByClassName("list")[0];
  const over = document.getElementById("stock-over");
  stocks.forEach((stock) => {
    const item = document.createElement("li");
    const p1 = document.createElement("span");
    p1.className = "bookValue";
    const p2 = document.createElement("span");
    const button = document.createElement("button");
    button.textContent = stock;
    p1.textContent = `$` + api3[stock].bookValue.toFixed(3);
    p2.textContent = api3[stock].profit.toFixed(3) + "%";
    if (api3[stock].profit <= 0) {
      p2.className = "neg-profit profit";
    } else {
      p2.className = "pos-profit profit";
    }
    item.appendChild(button);
    item.appendChild(p1);
    item.appendChild(p2);
    list.appendChild(item);
    button.addEventListener("click", (e) => {
      const x = api2[stock]["1y"].timeStamp.map((time) =>
        new Date(time * 1000).toLocaleDateString()
      );
      const y = api2[stock]["1y"].value;
      makeChart(x, y,stock);
      const summary = document.getElementsByClassName("summary")[0];
      const buttonspace = document.getElementById("button-space");
      buttonspace.innerHTML = "";
      const button1 = document.createElement("button");
      button1.textContent = "1 Month";
      button1.addEventListener("click", () => {
        // console.log(api2[stock])
        const x = api2[stock]["1mo"].timeStamp.map((time) =>
          new Date(time * 1000).toLocaleDateString()
        );
        const y = api2[stock]["1mo"].value;
        makeChart(x, y, stock);
      });
      const button2 = document.createElement("button");
      button2.textContent = "3 Month";
      button2.addEventListener("click", () => {
        // console.log(api2[stock])
        const x = api2[stock]["3mo"].timeStamp.map((time) =>
          new Date(time * 1000).toLocaleDateString()
        );
        const y = api2[stock]["3mo"].value;
        // console.log(x);
        // console.log(y);
        makeChart(x, y, stock);
      });
      const button3 = document.createElement("button");
      button3.textContent = "1 Year";
      button3.addEventListener("click", () => {
        const x = api2[stock]["1y"].timeStamp.map((time) =>
          new Date(time * 1000).toLocaleDateString()
        );
        const y = api2[stock]["1y"].value;
        makeChart(x, y, stock);
      });
      const button4 = document.createElement("button");
      button4.textContent = "5 Year";
      button4.addEventListener("click", () => {
        // console.log(api2[stock])
        const x = api2[stock]["5y"].timeStamp.map((time) =>
          new Date(time * 1000).toLocaleDateString()
        );
        const y = api2[stock]["5y"].value;
        // console.log(x);
        // console.log(y);
        makeChart(x, y, stock);
      });
      buttonspace.appendChild(button1);
      buttonspace.appendChild(button2);
      buttonspace.appendChild(button3);
      buttonspace.appendChild(button4);
      const sum = api1[stock].summary;
      summary.textContent = sum;
      const p3 = document.createElement("span");
      p3.textContent = stock;
      over.textContent = "";
      over.appendChild(p3);
      over.appendChild(p2.cloneNode(true));
      over.appendChild(p1.cloneNode(true));
    });
  });
});

function displayDefaultStock() {
  const stock = "AAPL";
  const summary = document.getElementsByClassName("summary")[0];
  const over = document.getElementById("stock-over");
  const p1 = document.createElement("span");
  const p2 = document.createElement("span");
  p1.textContent = `$` + api3[stock].bookValue.toFixed(3);
  p2.textContent = api3[stock].profit.toFixed(3) + "%";
  p2.className =
    api3[stock].profit <= 0 ? "neg-profit profit" : "pos-profit profit";

  const sum = api1[stock].summary;
  summary.textContent = sum;

  over.textContent = "";
  over.appendChild(document.createTextNode(stock));
  over.appendChild(p2.cloneNode(true));
  over.appendChild(p1.cloneNode(true));

  const buttonspace = document.getElementById("button-space");
  buttonspace.innerHTML = "";
  const button1 = document.createElement("button");
  button1.textContent = "1 Month";
  button1.addEventListener("click", () => {
    // console.log(api2[stock])
    const x = api2[stock]["1mo"].timeStamp.map((time) =>
      new Date(time * 1000).toLocaleDateString()
    );
    const y = api2[stock]["1mo"].value;
    makeChart(x, y, stock);
  });
  const button2 = document.createElement("button");
  button2.textContent = "3 Month";
  button2.addEventListener("click", () => {
    // console.log(api2[stock])
    const x = api2[stock]["3mo"].timeStamp.map((time) =>
      new Date(time * 1000).toLocaleDateString()
    );
    const y = api2[stock]["3mo"].value;
    // console.log(x);
    // console.log(y);
    makeChart(x, y, stock);
  });
  const button3 = document.createElement("button");
  button3.textContent = "1 Year";
  button3.addEventListener("click", () => {
    const x = api2[stock]["1y"].timeStamp.map((time) =>
      new Date(time * 1000).toLocaleDateString()
    );
    const y = api2[stock]["1y"].value;
    makeChart(x, y, stock);
  });
  const button4 = document.createElement("button");
  button4.textContent = "5 Year";
  button4.addEventListener("click", () => {
    // console.log(api2[stock])
    const x = api2[stock]["5y"].timeStamp.map((time) =>
      new Date(time * 1000).toLocaleDateString()
    );
    const y = api2[stock]["5y"].value;
    // console.log(x);
    // console.log(y);
    makeChart(x, y, stock);
  });
  buttonspace.appendChild(button1);
  buttonspace.appendChild(button2);
  buttonspace.appendChild(button3);
  buttonspace.appendChild(button4);
  const x = api2[stock]["1y"].timeStamp.map((time) =>
    new Date(time * 1000).toLocaleDateString()
  );
  const y = api2[stock]["1y"].value;
  makeChart(x, y,stock);
}
