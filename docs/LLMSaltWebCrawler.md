
# Documentation
- Class name: LLMSaltWebCrawler
- Category: SALT/Language Toolkit/Tools
- Output node: False

LLMSaltWebCrawler节点是为网络爬虫和数据抓取而设计的，能够在网页间导航以收集数据。它支持深度控制、域名排除、SSL验证和基于关键词的相关性过滤等功能，以高效地从指定URL收集和解析内容。

# Input types
## Required

## Optional
- url
    - 网络爬虫的起始URL。它对定义爬虫范围至关重要，并作为爬虫过程的入口点。
    - Comfy dtype: STRING
    - Python dtype: str
- urls
    - 要爬取的URL列表。这允许多个入口点，扩大了爬取的广度。
    - Comfy dtype: LIST
    - Python dtype: list
- max_depth
    - 定义爬虫应从起始URL导航的深度。它将爬取限制在指定的深度，以管理范围和资源。
    - Comfy dtype: INT
    - Python dtype: int
- max_links
    - 限制每页要跟随的链接数量，控制收集的数据量并管理资源使用。
    - Comfy dtype: INT
    - Python dtype: int
- trim_line_breaks
    - 一个标志，用于指示是否从爬取过程中提取的文本中删除换行符，有助于数据清洁。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- verify_ssl
    - 决定在发出请求时是否验证SSL证书，通过避免潜在的有害站点来增强安全性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- exclude_domains
    - 指定要从爬取中排除的域名，通过避免不相关或不需要的站点来允许更有针对性的数据收集。
    - Comfy dtype: STRING
    - Python dtype: str
- keywords
    - 用于基于相关性过滤内容的关键词列表，确保收集的数据与特定兴趣或主题相关。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - Comfy dtype: DOCUMENT
    - 输出是文档列表，每个文档包含从爬取的网页中获取的结构化数据，包括URL、标题、文本和找到的链接，组织得便于处理和分析。
    - Python dtype: list


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
