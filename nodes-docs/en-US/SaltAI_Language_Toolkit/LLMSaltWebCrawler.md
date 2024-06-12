# ∞ Web Crawler
## Documentation
- Class name: `LLMSaltWebCrawler`
- Category: `SALT/Language Toolkit/Tools`
- Output node: `False`

The LLMSaltWebCrawler node is designed for web crawling and scraping, capable of navigating through web pages to collect data. It supports features like depth control, domain exclusion, SSL verification, and keyword-based relevancy filtering to efficiently gather and parse content from specified URLs.
## Input types
### Required
### Optional
- **`url`**
    - The starting point URL for the web crawl. It's crucial for defining the scope of the crawl and serves as the entry point for the crawling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`urls`**
    - A list of URLs to be crawled. This allows for multiple entry points, expanding the breadth of the crawl.
    - Comfy dtype: `LIST`
    - Python dtype: `list`
- **`max_depth`**
    - Defines how deep the crawler should navigate from the starting URL. It limits the crawl to a specified depth to manage the scope and resources.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_links`**
    - Limits the number of links to follow per page, controlling the volume of data collected and managing resource usage.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`trim_line_breaks`**
    - A flag to indicate whether to remove line breaks from the text extracted during the crawl, aiding in data cleanliness.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`verify_ssl`**
    - Determines whether to verify SSL certificates when making requests, enhancing security by avoiding potentially harmful sites.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`exclude_domains`**
    - Specifies domains to exclude from the crawl, allowing for more targeted data collection by avoiding irrelevant or unwanted sites.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`keywords`**
    - A list of keywords used to filter content based on relevancy, ensuring the data collected is pertinent to specific interests or topics.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The output is a list of documents, each containing structured data from the crawled web pages, including URLs, titles, texts, and links found, organized for easy processing and analysis.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMSaltWebCrawler:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "url": ("STRING", {}),
                "urls": ("LIST", {}),
                "max_depth": ("INT", {"min": 1, "max": 4, "default": 2}),
                "max_links": ("INT", {"min": 1, "max": 6, "default": 2}),
                "trim_line_breaks": ("BOOLEAN", {"default": True}),
                "verify_ssl": ("BOOLEAN", {"default": True}),
                "exclude_domains": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Optional exclude domains, eg: example.com, example2.com"}),
                "keywords": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Optional relevancy keywords, eg: artificial intelligence, ai"})
            }
        }
    

    RETURN_TYPES = ("DOCUMENT",)
    RETURN_NAMES = ("documents",)

    FUNCTION = "crawl"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools"

    def crawl(self, url:str="google.com", urls:list=None, max_depth:int=2, max_links:int=2, trim_line_breaks:bool=True, verify_ssl:bool=True, exclude_domains:str="", keywords:str="") -> list:

        search_urls = []
        if not url.strip() and not urls:
            raise Exception("Please provide at lease one URL")
        
        url = url.strip()
        if url != "" and valid_url(url):
            search_urls.append(url)
        if urls:
            search_urls.extend([url for url in urls if valid_url(url)])

        logger.info("Valid URLs:")
        logger.info(search_urls)

        crawler = WebCrawler(search_urls, exclude_domains=exclude_domains, relevancy_keywords=keywords, max_links=max_links)

        results = crawler.parse_sites(crawl=True, max_depth=max_depth, trim_line_breaks=trim_line_breaks, verify_ssl=verify_ssl)

        return (results.to_documents(), )

```
