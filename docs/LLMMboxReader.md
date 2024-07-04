
# Documentation
- Class name: LLMMboxReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMMboxReader节点专门用于读取电子邮件文件并将其转换为结构化文档格式，利用了llama_index Document模型的功能。它旨在通过将mbox文件转换为更易于访问和分析的形式，来促进电子邮件数据的处理和分析。

# Input types
## Required
- path
    - 指定要读取的mbox文件在文件系统中的路径。该路径对于定位和访问文件进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- extra_info
    - 以字符串格式提供额外的可选信息，可用于影响读取过程或处理mbox文件的特定要求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 以结构化文档的形式返回从mbox文件处理得到的电子邮件数据，可供进一步分析或操作。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMMboxReader(MboxReader):
    """
    @NOTE: Reads Email files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/mbox/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.MboxReader
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
