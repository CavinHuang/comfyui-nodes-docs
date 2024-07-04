
# Documentation
- Class name: LLMTavilyResearch
- Category: SALT/Language Toolkit/Tools
- Output node: False

LLMTavilyResearch节点旨在利用先进的语言模型进行深入的研究和分析。它通过处理和解释大量文本数据，提供全面的见解和摘要。

# Input types
## Required
- tavily_api_key
    - Tavily API的密钥，用于访问和使用Tavily的研究服务。
    - Comfy dtype: STRING
    - Python dtype: str
- search_query
    - 要进行研究的搜索查询或主题。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- search_depth
    - 定义搜索的深度或广度，可能影响结果的详细程度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- max_results
    - 限制返回的最大结果数量。
    - Comfy dtype: INT
    - Python dtype: int
- include_answer
    - 决定是否在结果中包含直接答案。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- include_raw_content
    - 决定是否在结果中包含原始内容。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- include_domains
    - 指定要包含在搜索中的域名列表。
    - Comfy dtype: STRING
    - Python dtype: str
- exclude_domains
    - 指定要从搜索中排除的域名列表。
    - Comfy dtype: STRING
    - Python dtype: str
- keep_looking_limit
    - 设置继续搜索的限制，可能影响搜索的持续时间或深度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- documents
    - 经过处理和分析的文本数据，结构化并提供洞察。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[str]
- urls
    - 在研究过程中被引用或提取的URL集合。
    - Comfy dtype: LIST
    - Python dtype: List[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMTavilyResearch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "tavily_api_key": ("STRING", {"default": "tvly-*******************************"}),
                "search_query": ("STRING", {"multiline": True, "dynamicPrompts": False}),
            },
            "optional": {
                "search_depth": (["basic", "advanced"],),
                "max_results": ("INT", {"min": 1, "max": 20, "default": 1}),
                "include_answer": ("BOOLEAN", {"default": False},),
                "include_raw_content": ("BOOLEAN", {"default": False},),
                "include_domains": ("STRING", {
                    "multiline": True,
                    "dynamicPrompts": False,
                    "placeholder": "A list of domains to specifically include in the search results. Default is None, which includes all domains. e.g. \"google.com, twitter.com\"",
                }),
                "exclude_domains": ("STRING", {
                    "multiline": True,
                    "dynamicPrompts": False,
                    "placeholder": "A list of domains to specifically exclude from the search results. Default is None, which doesn't exclude any domains. e.g. \"google.com, twitter.com\"",
                }),
                "keep_looking_limit": ("INT", {"min": 1, "max": 20, "default": 10})
            }
        }
    
    RETURN_TYPES = ("DOCUMENT", "LIST")
    RETURN_NAMES = ("documents", "urls")

    FUNCTION = "search"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools"

    def search(self, tavily_api_key, search_query, search_depth="basic", max_results=1, include_answer=False, include_raw_content=False, include_domains="google.com", exclude_domains=None, keep_looking_limit=10):
        
        tavily = TavilyClient(api_key=tavily_api_key)

        def tavily_search():
            return tavily.search(
                query=search_query,
                search_depth=search_depth,
                max_results=max_results,
                include_images=False,
                include_answer=include_answer,
                include_raw_content=include_raw_content,
                include_domains=include_domains.split(
                    ", ") if include_domains is not None and include_domains != "" else None,
                exclude_domains=exclude_domains.split(
                    ", ") if include_domains is not None and exclude_domains != "" else None,
            )
        
        print("Tavily Search Query:", search_query)

        # Increment the search results because when using `include_raw_content` 
        # results are found in order of accessibility, so first X results may not 
        # be traversible, and end up in there being no result to return. But maybe 
        # the next search result does have traversible content.
        adjusted_max_results = max_results + keep_looking_limit
        current_retry = 0
        response = {}
        while "results" not in response or not response["results"] and max_results < adjusted_max_results:
                max_results += 1
                if current_retry > 0:
                    print(f"Unable find any results. Continuing Search...\nRetry {current_retry} of {keep_looking_limit}")
                response = tavily_search()
                current_retry += 1

        pprint(response, indent=4)

        results = response.get("results", None)
        urls = []
        documents = []
        if results:
            for result in results:
                content = result.pop("content", "null")
                raw_content = result.pop("raw_content", None)
                document = Document(
                    text=(raw_content if raw_content else content),
                    extra_info=result
                )
                documents.append(document)
                if result.__contains__("url"):
                    urls.append(result["url"])
        else:
            documents.append(Document(text="No document data available", extra_info={"error": "No document data available"}))
            urls.append(None)

        return (documents, urls)

```
