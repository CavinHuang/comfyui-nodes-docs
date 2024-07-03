
# Documentation
- Class name: LLMEpubReader
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/some_repo/example

LLMEpubReader节点专门用于读取和转换Epub电子书文件为结构化的文档格式，从而便于对数字书籍内容进行处理和分析。

# Input types
## Required
- path
    - 指定要读取的Epub电子书文件在文件系统中的路径。这个路径对于定位和访问文件以进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 提供额外的可选信息，可用于影响读取过程或传递特定于正在处理的Epub文件的额外参数。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 以结构化文档的形式返回Epub电子书文件的内容，使其可用于进一步的处理和分析。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMEpubReader(EpubReader):
    """
    @NOTE: Reads Epub book files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/epub/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.EpubReader
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
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, extra_info:str, fs = None):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
