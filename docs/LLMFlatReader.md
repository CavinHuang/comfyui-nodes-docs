
# Documentation
- Class name: LLMFlatReader
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMFlatReader节点旨在读取和处理"平面"文件，将其转换为适合llama_index文档系统进行索引和进一步分析的格式。它利用FlatReader类的基本功能，将简单的文本文件转换为结构化的文档表示。

# Input types
## Required
- path
    - 指定需要读取的"平面"文件的文件系统路径。这个路径对于定位和访问文件进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 以字符串格式提供额外的可选信息，可用于影响读取过程或传递特定用例可能需要的额外参数。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 来自"平面"文件的已处理数据，以适合索引和进一步分析的文档形式构建。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMFlatReader(FlatReader):
    """
    @NOTE: Reads 'flat' files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/flat/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.FlatReader
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
