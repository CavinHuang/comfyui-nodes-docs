
# Documentation
- Class name: LLMHTMLTagReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMHTMLTagReader节点旨在从指定文件中读取并解析HTML标签，将其转化为结构化的文档格式。它利用BeautifulSoup来解析HTML内容，重点关注特定的标签和属性以提取相关信息，同时通过可选参数允许自定义处理过程。

# Input types
## Required
- path
    - 指定要读取的HTML文件的文件路径。这是一个关键参数，因为它决定了要处理的HTML内容的来源。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- tag
    - 定义在解析过程中要重点关注的特定HTML标签。这允许从HTML文件中有针对性地提取信息。
    - Comfy dtype: STRING
    - Python dtype: str
- ignore_no_id
    - 一个布尔标志，设置后会指示阅读器忽略没有ID属性的HTML元素。这对于过滤掉不必要的元素很有用。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- extra_info
    - 允许以字符串形式包含额外的自定义信息，可用于进一步自定义解析行为。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 结构化文档格式的输出，代表了经过解析和解释的HTML内容。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMHTMLTagReader(HTMLTagReader):
    """
    @NOTE: Reads HTML tags into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/html/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.HTMLTagReader
    @Imports: from bs4 import BeautifulSoup
    """
    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
            },
            "optional": {
                "tag": ("STRING", {"default":"section"}),
                "ignore_no_id": ([False, True],),
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, tag:str="section", ignore_no_id:bool=False, extra_info:str="{}"):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        self._tag = tag
        self._ignore_no_id = ignore_no_id
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
