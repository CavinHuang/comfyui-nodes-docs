
# Documentation
- Class name: LoadJsonFromUrl
- Category: Art Venture/Utils
- Output node: False

LoadJsonFromUrl节点旨在从指定的URL获取JSON数据，为将外部数据集成到节点工作流中提供了一种简便的方法。

# Input types
## Required
- url
    - 用于获取JSON数据的URL。它是节点检索数据的主要来源。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- print_to_console
    - 一个控制标志，用于决定是否将获取的JSON内容打印到控制台，有助于调试或验证。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- json
    - 从指定URL检索到的JSON数据，可以在节点工作流中进行进一步处理或使用。
    - Comfy dtype: JSON
    - Python dtype: Dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilLoadJsonFromUrl:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"default": ""}),
            },
            "optional": {
                "print_to_console": ("BOOLEAN", {"default": False}),
            },
        }

    RETURN_TYPES = ("JSON",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "load_json"

    def load_json(self, url: str, print_to_console=False):
        response = requests.get(url, timeout=5)
        if response.status_code != 200:
            raise Exception(response.text)

        res = response.json()
        if print_to_console:
            print("JSON content:", json.dumps(res))

        return (res,)

```
