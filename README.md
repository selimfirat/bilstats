# BilStats
BilStats is a web based tool for analyzing past courses and instructors on Bilkent University. This tool is intended to be used on course registration.

* Bilstats is inspired by StarStat and created when StarStat was not working.


# Start for development
* `yarn start`

# Build
* `yarn build`

## Scrape & Process Data
* Retrieve `PHPSESSID` cookie after you enter a captcha. You can use Chrome to retrieve this: https://developers.google.com/web/tools/chrome-devtools/manage-data/cookies
* `pip install -r requirements.txt`
* `cd scraper`
* `scrapy crawl course_history`
* `cd ../data_processing`
* `python3 main.py`
* `cp -r data web/public/data


## Publish to gh-pages (Static Deployment)
* `cd web`
* `yarn`
* `yarn build
* `yarn global add gh-pages` or `npm install -g gh-pages`
* `gh-pages -d dist`