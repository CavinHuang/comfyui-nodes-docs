
# Documentation
- Class name: LLMIPYNBReader
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMIPYNBReader节点专门用于读取和解释IPYNB（Jupyter Notebook）文件，将其转换为适合在llama_index生态系统中进行进一步处理或分析的格式。它利用IPYNB文件的结构和内容来提取文档或数据，从而便于与llama_index的文档管理功能集成。

# Input types
## Required
- path
    - 指定要读取的IPYNB文件在文件系统中的路径。这个路径对于定位和访问文件进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 以字符串格式提供额外的可选信息，可用于影响读取过程或处理IPYNB文件的特定要求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 从IPYNB文件处理得到的数据，格式化为适合在llama_index生态系统中使用的文档。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMIPYNBReader(IPYNBReader):
    """
    @NOTE: Reads IPYNB documentation files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/ipynb/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.IPYNBReader
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
