import { ThemeProvider } from "@emotion/react";
import {
  LinearProgress,
  Stack,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { Container, createTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import "./CoinsTable.css";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const history = useNavigate();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <h1 style={{ margin: 18, fontSize: 40 }}>
            Cryptocurrency Price by Market Cap
          </h1>
          <input
            placeholder="Search For Crypto Currency.."
            style={{
              marginBottom: 20,
              width: "100%",
              height: 50,
              fontSize: 20,
              backgroundColor: "black",
              color: "white",
            }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer className="container">
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <table className="container">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <tr className="coin-row">
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <td
                          style={{
                            color: "black",
                            fontWeight: "700",
                            padding: 20,
                            width: 400,
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </td>
                      )
                    )}
                  </tr>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <tr
                          onClick={() => history(`/coins/${row.id}`)}
                          className="row"
                          key={row.name}
                        >
                          <td
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                              padding: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </td>
                          <td align="right">
                            {symbol} {row.current_price.toFixed(2)}
                          </td>
                          <td
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </td>
                          <td align="right">
                            {symbol} {row.market_cap.toString().slice(0, -6)}M
                          </td>
                        </tr>
                      );
                    })}
                </TableBody>
              </table>
            )}
          </TableContainer>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinsTable;
