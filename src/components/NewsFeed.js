import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = ({currency1, currency2}) => {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        var options = {
        method: 'GET',
        url: 'https://mboum-finance.p.rapidapi.com/ne/news/',
        params: {symbol: `${currency1}, ${currency2}`},
        headers: {
            'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_API_KEY
        }
        };

        axios.request(options).then((response) => {
            let result = response.data.item;
            result = result?.slice(0,7);
            setArticles(result);
        }).catch((error) => {
            console.error(error);
        });
    }, [articles, currency1, currency2])

    return(
        <div className="news-feed">
            <h2>News Feed</h2>
            {articles?.map((article, _index) => 
                <div>
                    <p key={_index}>
                        <a 
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-link"
                            >
                            {article.title}
                        </a>
                    </p>
                </div>
            )}
        </div>
    )
}

export default NewsFeed;