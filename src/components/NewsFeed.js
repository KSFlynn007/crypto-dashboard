import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = () => {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        var options = {
        method: 'GET',
        url: 'https://crypto-news-live.p.rapidapi.com/news',
        headers: {
            'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
            // 'x-rapidapi-key' : 'bffda05d02msh1d882321d286f4dp1b823cjsn27d7262d792b'
            'x-rapidapi-key': process.env.REACT_APP_API_KEY
        }
        };

        axios.request(options).then((response) => {
            // console.log(response.data);
            setArticles(response.data)
        }).catch((error) => {
            console.error(error);
        });
        // no dependencies, runs only once on mount
    }, [])

    // ? is short form notation for ternary operator = if ? true : false
    // checks if existing first before enacting slice
    const first7 = articles?.slice(0, 7)

    return (
        <div className="news-feed">
            <h2>Newsfeed</h2>
            {first7?.map((article, _index) => 
            <div>
                <p key={_index}>
                    <a 
                        href={article.url} 
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