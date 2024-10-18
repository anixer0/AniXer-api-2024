import express from 'express';
import cors from 'cors';
import axios from 'axios';

import {
  scrapeGenre,
  scrapeTopAiringAnime,
  scrapeAnimeMovies,
  scrapePopularAnime,
  scrapeRecentPage,
  scrapeOngoingSeries,
  scrapeAnimeList,
  scrapeRecentlyAdded,
  scrapeAnimeAZ,
  scrapeAnimeAZPage,
  scrapeNewSeason,
  scrapeAnimeListPage,
  scrapeMoviePage,
  scrapeGenrePage,
  scrapeSubCategoryPage,
  scrapeRecentRelease,
  scrapeOngoingAnime,
  scrapeNewSeasonPage,
  scrapeSearch,
  scrapePopularPage,
  scrapeSearchPage,
  scrapeAnimeDetails,
  scrapeOngoingPage,
  scrapeCompletedPage,
  scrapeSeason,
  scrapeCompletedAnime,
  scrapeMP4,
  scrapeStreamSB,
  scrapeWatchAnime,
  scrapeFembed,
  scrapeThread,
  DownloadReferer,
} from './anime_parser.js';

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  credentails: true,
  optionSuccessStatus: 200,
  port: port,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json(''<!doctype html><html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>ANIXER API</title><style>body{font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;margin:0;padding:0;background-color:#f8f9fa;color:#495057;line-height:1.6}header{background-color:#343a40;color:#fff;text-align:center;padding:1.5em 0;margin-bottom:1em}h1{margin-bottom:.5em;font-size:2em;color:#17a2b8}p{color:#6c757d;margin-bottom:1.5em}code{background-color:#f3f4f7;padding:.2em .4em;border-radius:4px;font-family:"Courier New",Courier,monospace;color:#495057}.container{margin:1em;padding:1em;background-color:#fff;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1)}li,ul{list-style:none;padding:0;margin:0}li{margin-bottom:.5em}li code{background-color:#e5e7eb;color:#495057}a{color:#17a2b8;text-decoration:none}a:hover{text-decoration:underline}footer{background-color:#343a40;color:#fff;padding:1em 0;text-align:center}.sample-request{margin-top:1em}.toggle-response{cursor:pointer;color:#17a2b8;text-decoration:underline}.sample-response{display:none;margin-top:1em}pre{background-color:#f3f4f7;padding:1em;border-radius:4px;overflow-x:auto}</style><header><h1>ANIXER API</h1><p>The ANIXER-API provides access to a wide range of anime-related data.<p class=support>For support, contact me on <a href=https://www.facebook.com/profile.php?id=100069572806122 target=_blank> FACEBOOK me</a>.</header><div class=container><h2>ANIXER-API Description:</h2><p>The ANIXER API allows you to access various anime-related data, including search, anime details, episodes, downloads, recent releases, recommendations, popular anime, and upcoming releases. Data is scraped from gogoanime and anilist.</div><div class=container><h2>Routes:</h2><ul><li><code>/home</code> - Get trending anime from Anilist and popular anime from GogoAnime<li><code>/search/{query}</code> - Search for anime by name (query = anime name)<li><code>/anime/{id}</code> - Get details of a specific anime (id = gogoanime anime id)<li><code>/episode/{id}</code> - Get episode stream urls (id = gogoanime episode id)<li><code>/download/{id}</code> - Get episode download urls (id = gogoanime episode id)<li><code>/recent/{page}</code> - Get recent animes from gogoanime (page = 1,2,3...)<li><code>/recommendations/{query}</code> - Get recommendations of anime from anilist (id = anime name)<li><code>/gogoPopular/{page}</code> - Get popular animes from gogoanime (page = 1,2,3...)<li><code>/upcoming/{page}</code> - Get upcoming animes from anilist (page = 1,2,3...)</ul></div><div class=container><h2>Support and Contact:</h2><p>For support and questions, visit our <a href=https://www.facebook.com/profile.php?id=100069572806122 target=_blank>Contact  me </a>.</div><footer><p>© 2024 ANIXER STREAM API. All rights reserved.</footer>';');
});

app.get('/search', async (req, res) => {
  try {
    const keyw = req.query.keyw;
    const page = req.query.page;

    if (!keyw) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Missing query parameter: keyw',
      });
    }

    const data = await scrapeSearch({ keyw: keyw, page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error', 
      message: err,
    });
  }
});

app.get('/getRecentlyAdded', async (req, res) => {
  try {
    const page = req.query.page;
    const data = await scrapeRecentlyAdded({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/getOngoingSeries', async (req, res) => {
  try {
    const page = req.query.page;
    const data = await scrapeOngoingSeries({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});


app.get('/searchPage', async (req, res) => {
  try {
    const keyw = req.query.keyw;
    const page = req.query.page;

    if (!keyw) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Missing query parameter: keyw',
      });
    }

    const data = await scrapeSearchPage({ keyw: keyw, page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/genrePage', async (req, res) => {
  try {
    const genre = req.query.genre;
    const page = req.query.page;

    if (!genre) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Missing query parameter: genre. etc: Fantasy',
      });
    }

    const data = await scrapeGenrePage({ genre: genre, page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/anime-AZ-page', async (req, res) => {
  try {
    const aph = req.query.aph
    const page = req.query.page;

    if (!aph) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Missing query parameter: aph. etc: A',
      });
    }

    const data = await scrapeAnimeAZPage({ aph: aph, page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/anime-list-page', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeAnimeListPage({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/animeList', async (req, res) => { //Todo: Fix
  try {
    const page = req.query.page;

    const data = await scrapeAnimeList({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/animeListAZ', async (req, res) => {
  try {
    const aph = req.query.aph;
    const page = req.query.page;

    if (!aph) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Missing query parameter: aph. etc: A',
      });
    }

    const data = await scrapeAnimeAZ({ aph: aph, page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/popularPage', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapePopularPage({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/newSeasonPage', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeNewSeasonPage({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/completedPage', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeCompletedPage({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/ongoingPage', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeOngoingPage({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/moviePage', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeMoviePage({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/subCategoryPage', async (req, res) => { //ToDo: Fix
  try {
    const page = req.query.page;
    const subCategory = req.query.subCategory;

    const data = await scrapeSubCategoryPage({ page: page, subCategory: subCategory });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/recent-release-page', async (req, res) => {
  try {
    const page = req.query.page;
    const type = req.query.type;

    const data = await scrapeRecentPage({ page: page, type: type });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/recent-release', async (req, res) => {
  try {
    const page = req.query.page;
    const type = req.query.type;

    if (!page) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Missing query parameter: page',
      });
    }

    if (!type) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: 'Missing query parameter: type. 1 = SUB, 2 = DUB',
      });
    }

    const data = await scrapeRecentRelease({ page: page, type: type });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/new-season', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeNewSeason({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/ongoing-anime', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeOngoingAnime({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/completed-anime', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeCompletedAnime({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});


app.get('/popular', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapePopularAnime({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/anime-movies', async (req, res) => {
  try {
    const page = req.query.page;
    const alphabet = req.query.aph;

    const data = await scrapeAnimeMovies({ page: page, aph: alphabet });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/top-airing', async (req, res) => {
  try {
    const page = req.query.page;

    const data = await scrapeTopAiringAnime({ page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/season/:season', async (req, res) => {
  try {
    const page = req.query.page;
    const season = req.params.season;

    const data = await scrapeSeason({ page: page, season: season });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: 'Internal Error',
      message: err, php
    });
  }
});

app.get('/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const page = req.query.page;

    const data = await scrapeGenre({ genre: genre, page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/getAnime/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const data = await scrapeAnimeDetails({ id: id });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/fembed/watch/:id', async (req, res) => {
  try {
    const id = req.params.id;

    //const data = await scrapeFembed({ id: id });

    res.status(410).json({ message: 'Deprecated' });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});


app.get('/getEpisode/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const data = await scrapeWatchAnime({ id: id });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});




app.get('/vidcdn/watch/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const data = await scrapeMP4({ id: id });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});


app.get('/streamsb/watch/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const data = await scrapeStreamSB({ id: id });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/thread/:episodeId', async (req, res) => {
  try {
    const episodeId = req.params.episodeId;
    const page = req.query.page;

    const data = await scrapeThread({ episodeId: episodeId, page: page });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/download-links/:episodeId', async (req, res) => {
  try {
    const episodeId = req.params.episodeId;

    //const data = await scrapeDownloadLinks({ episodeId: episodeId });

    res.status(410).json({ message: 'Deprecated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.get('/download', async (req, res) => {
  try {
    const downloadLink = req.rawHeaders.find(
      (x) => x.includes('https://') && x.includes('.mp4')
    );

    if (!downloadLink) {
      return res.status(400).json({
        error: 'No downloadLink provided. Make sure to add the downloadLink in the headers.',
      });
    }

    await axios
      .get(downloadLink, {
        headers: { Referer: DownloadReferer },
        responseType: 'stream',
      })
      .then((stream) => {
        return new Promise((r, j) => {
          res.writeHead(200, {
            ...stream.headers,
          });
          stream.data.pipe(res);
        });
      });

    return res.status(200).json('Done Downloading.');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      error: 'Internal Error',
      message: err,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
  });
});




app.listen(port, () => {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
