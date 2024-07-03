
# Documentation
- Class name: CreateTavilySearchTool
- Category: SALT/Language Toolkit/Agents
- Output node: False

CreateTavilySearchTool节点通过Tavily API创建一个可自定义的搜索工具，支持在网络上进行详细搜索，并提供各种过滤选项，如搜索深度、域名包含/排除以及内容类型偏好等。该节点旨在帮助检索全面、准确且可信的搜索结果，并可根据特定查询进行定制。

# Input types
## Required
- api_key
    - 用于向Tavily API进行身份验证的API密钥，使得能够访问其搜索功能。
    - Comfy dtype: STRING
    - Python dtype: str
- function_name
    - 为创建的搜索工具指定的名称，用于在系统中识别该工具。
    - Comfy dtype: STRING
    - Python dtype: str
- search_depth
    - 指定搜索深度，影响搜索引擎探索网页内容的广度和深度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- max_results
    - 设定返回的最大搜索结果数量，控制搜索输出的范围。
    - Comfy dtype: INT
    - Python dtype: int
- include_answer
    - 决定是否在搜索结果中包含对查询的直接回答，以提高结果相关性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- include_raw_content
    - 控制是否包含搜索结果的原始内容，提供源材料的详细信息。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

## Optional
- include_domains
    - 指定要包含在搜索结果中的域名列表，将搜索聚焦于首选来源。
    - Comfy dtype: STRING
    - Python dtype: str
- exclude_domains
    - 指定要从搜索结果中排除的域名列表，过滤掉不需要的内容来源。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- tool
    - 返回一个配置好的、可直接使用的搜索工具对象，封装了指定的搜索参数和功能。
    - Comfy dtype: TOOL
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CreateTavilySearchTool:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "api_key": ("STRING", {"multiline": False, "dynamicPrompts": False, "placeholder": "Tavily API key"}),
                "function_name": ("STRING", {"multiline": False, "dynamicPrompts": False, "default": "tavily_search_tool"}),
                "search_depth": (["basic", "advanced"],),
                "max_results": ("INT", {"default": 5}),
                "include_answer": ("BOOLEAN", {"default": False},),
                "include_raw_content": ("BOOLEAN", {"default": False},),
            },
            "optional": {
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
            }
        }

    RETURN_TYPES = ("TOOL",)
    RETURN_NAMES = ("tool",)

    FUNCTION = "create_tool"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

    def create_tool(
        self,
        api_key,
        function_name,
        search_depth,
        max_results,
        include_answer,
        include_raw_content,
        include_domains=None,
        exclude_domains=None
    ):
        tavily = TavilyClient(api_key=api_key)

        def search(query: str):
            response = tavily.search(
                query=query,
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
            context = [obj["content"] for obj in response['results']]
            return "/n".join(context)

        tool = {
            "name": function_name,
            "description": "A search engine optimized for comprehensive, accurate, and trusted results. Useful for when you need to answer questions about current events. Input should be a search query.",
            "function": search,
        }
        return (tool,)

```
