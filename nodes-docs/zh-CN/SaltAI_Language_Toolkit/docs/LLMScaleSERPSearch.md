
# Documentation
- Class name: LLMScaleSERPSearch
- Category: SALT/Language Toolkit/Tools
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMScaleSERPSearch节点旨在利用ScaleSERP API对各类网络内容进行搜索，并将结果解析为结构化文档。该节点简化了与ScaleSERP API交互的复杂性，提供了一个简洁的接口，用于高效检索和组织搜索数据。

# Input types
## Required
- api_key
    - 用于向ScaleSERP API进行身份验证的API密钥，使用户能够访问其搜索功能。
    - Comfy dtype: STRING
    - Python dtype: str
- query
    - 用户输入的搜索查询，用于从ScaleSERP API检索相关的搜索结果。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- search_type
    - 指定要执行的搜索类型，如网页、图片或新闻，以获得更有针对性的搜索结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- location
    - 可选参数，用于指定搜索的地理位置，影响搜索结果的相关性。
    - Comfy dtype: STRING
    - Python dtype: str
- device
    - 可选参数，用于指定搜索的设备类型，如桌面或移动设备，以模拟不同设备的搜索。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- mobile_type
    - 当在移动平台上进行搜索时，用于指定移动设备类型的可选参数。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- tablet_type
    - 当在平板电脑平台上进行搜索时，用于指定平板电脑类型的可选参数。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- documents
    - 从搜索结果解析而来的结构化文档，提供组织良好的信息，便于访问和分析。
    - Comfy dtype: DOCUMENT
    - Python dtype: list
- results_dict
    - 包含解析后搜索结果的字典，提供从ScaleSERP API检索到的数据的结构化概览。
    - Comfy dtype: DICT
    - Python dtype: dict
- links_list
    - 从搜索结果中提取的链接列表，提供直接访问信息源的途径。
    - Comfy dtype: LIST
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMScaleSERPSearch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "api_key": ("STRING", {}),
                "query": ("STRING", {}),
            },
            "optional": {
                "search_type": (["none", "news", "videos", "scholar", "places", "shopping"],),
                "location": ("STRING", {}),
                "device": (["desktop", "tablet", "mobile"],),
                "mobile_type": (["iphone", "android"],),
                "tablet_type": (["ipad", "android"],),
            }
        }

    RETURN_TYPES = ("DOCUMENT", "DICT", "LIST")
    RETURN_NAMES = ("documents", "results_dict", "links_list")

    FUNCTION = "search"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools"

    def search(self, api_key, query, **kwargs):

        if kwargs.__contains__("search_type"):
            if kwargs["search_type"] == "none":
                kwargs.pop("search_type")

        if kwargs.__contains__("device"):
            if kwargs["device"] == "desktop" and kwargs.__contains__("mobile_type") and kwargs.__contains__("tablet_type"):
                kwargs.pop("mobile_type")
                kwargs.pop("tablet_type")
            if kwargs["device"] == "mobile":
                if kwargs.__contains__("tablet_type"):
                    kwargs.pop("tablet_type")
            if kwargs["device"] == "tablet":
                if kwargs.__contains__("mobile_type"):
                    kwargs.pop("mobile_type")

        client = ScaleSERP(api_key=api_key)
        results = client.search(query, hide_base64_images=True, **kwargs)

        documents = client.results_to_documents()
        for doc in documents:
            print(doc.text, doc.extra_info)
            print("\n==================\n")
        links = client.results_to_link_dict()

        return (documents, results, list(links.values()))

```
