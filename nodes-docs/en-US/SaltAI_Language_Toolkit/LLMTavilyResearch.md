---
tags:
- LLM
---

# ∞ Tavily Research
## Documentation
- Class name: `LLMTavilyResearch`
- Category: `SALT/Language Toolkit/Tools`
- Output node: `False`

The LLMTavilyResearch node is designed to leverage advanced language models for conducting in-depth research and analysis. It aims to provide comprehensive insights and summaries by processing and interpreting large volumes of text data.
## Input types
### Required
- **`tavily_api_key`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`search_query`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
### Optional
- **`search_depth`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`max_results`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`include_answer`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`include_raw_content`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`include_domains`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`exclude_domains`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`keep_looking_limit`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The processed text data, structured and analyzed for insights.
    - Python dtype: `List[str]`
- **`urls`**
    - Comfy dtype: `LIST`
    - A collection of URLs that were referenced or extracted during the research process.
    - Python dtype: `List[str]`
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
