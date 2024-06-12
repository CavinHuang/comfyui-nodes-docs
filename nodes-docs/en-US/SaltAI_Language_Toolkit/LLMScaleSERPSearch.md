# ∞ Scale SERP Search
## Documentation
- Class name: `LLMScaleSERPSearch`
- Category: `SALT/Language Toolkit/Tools`
- Output node: `False`

This node is designed to leverage the ScaleSERP API for conducting searches across various types of web content, parsing the results into structured documents. It abstracts the complexities of interacting with the ScaleSERP API, offering a simplified interface for retrieving and organizing search data effectively.
## Input types
### Required
- **`api_key`**
    - The API key required for authenticating requests to the ScaleSERP API, enabling access to its search functionalities.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`query`**
    - The search query input by the user, which is used to retrieve relevant search results from the ScaleSERP API.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`search_type`**
    - Specifies the type of search to perform, such as web, images, or news, allowing for more targeted search results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`location`**
    - Optional parameter to specify the geographical location for the search, influencing the relevance of search results.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`device`**
    - Optional parameter to specify the device type for the search, such as desktop or mobile, to simulate searches from different devices.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`mobile_type`**
    - Optional parameter for specifying the type of mobile device when the search is conducted on a mobile platform.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tablet_type`**
    - Optional parameter for specifying the type of tablet device when the search is conducted on a tablet platform.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - Structured documents parsed from the search results, providing organized information for easy access and analysis.
    - Python dtype: `list`
- **`results_dict`**
    - Comfy dtype: `DICT`
    - A dictionary containing the parsed search results, offering a structured overview of the data retrieved from the ScaleSERP API.
    - Python dtype: `dict`
- **`links_list`**
    - Comfy dtype: `LIST`
    - A list of links extracted from the search results, providing direct access to the sources of information.
    - Python dtype: `list`
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
