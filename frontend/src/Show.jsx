import { useEffect } from "react";
import showStore from "./stores/showStore";
import { useParams } from "react-router-dom";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Header from "./components/Header";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export default function Show() {
    const store = showStore();
    const params = useParams();
    useEffect(() => {
        store.fetchData(params.id);
    }, []);
    const CustomizedDot = () => null;
    if (!store.data) {
        return <></>;
    }
    return (
        <div>
            <Header back />
            <header className="show-header">
                <img src={store.data.image.large} />
                <h2>
                    {store.data.name} ({store.data.symbol})
                </h2>
            </header>
            <div>
                <Tabs>
                    <TabList display="flex" align-items="center" justifyContent="center">
                        <Tab>Area Chart</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="width">
                                <div className="show-graph">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={store.graphData}
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area
                                                type="monotone"
                                                dataKey="Price"
                                                stroke="#8884d8"
                                                fill="#8884d8"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
            <div className="show-details">
                <div className="width">
                    <h2>Details</h2>
                    <div className="show-details-row">
                        <h4>Market Cap Rank</h4>
                        <span>{store.data.market_cap_rank}</span>
                    </div>
                    <div className="show-details-row">
                        <h4>24th High</h4>
                        <span>${store.data.market_data.high_24h.usd}</span>
                    </div>
                    <div className="show-details-row">
                        <h4>24th Low</h4>
                        <span>${store.data.market_data.low_24h.usd}</span>
                    </div>
                    <div className="show-details-row">
                        <h4>Current Price</h4>
                        <span>${store.data.market_data.current_price.usd}</span>
                    </div>
                    <div className="show-details-row">
                        <h4>1y Change</h4>
                        <span>
                            {store.data.market_data.price_change_percentage_1y.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}