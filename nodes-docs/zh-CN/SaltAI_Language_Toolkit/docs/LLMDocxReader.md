
# Documentation
- Class name: LLMDocxReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMDocxReader节点专门用于读取Microsoft Word (.docx) 文件，并将其转换为适合在llama_index生态系统中进行进一步处理或分析的格式。它利用DocxReader类的功能来解析和提取文档内容，促进了Word文档与数据管道的集成。

# Input types
## Required
- path
    - 指定要读取的.docx文件在文件系统中的路径。这个路径对于定位和访问文件以提取内容至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 以字符串格式提供额外的可选信息，可用于影响读取过程或向生成的文档附加额外元数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 输出是一个文档对象，它封装了所读取的.docx文件的内容和结构，可以在llama_index生态系统中进行进一步处理。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMDocxReader(DocxReader):
    """
    @NOTE: Reads MS Word files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/docs/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.DocxReader
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
