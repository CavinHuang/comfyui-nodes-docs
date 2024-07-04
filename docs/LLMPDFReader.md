
# Documentation
- Class name: LLMPDFReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMPDFReader节点旨在读取PDF文件并将其转换为llama_index Document格式，不包括嵌入的图像。这一功能使得可以从PDF文档中提取和处理文本数据，以便进行进一步的分析或处理。

# Input types
## Required
- path
    - 指定要读取的PDF文件在文件系统中的路径。这对于定位和访问待处理的文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 以字符串格式提供额外的可选信息，可用于影响读取过程或处理特定需求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 将PDF文件的内容作为llama_index Document返回，便于进一步的数据处理或分析。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMPDFReader(PDFReader):
    """
    @NOTE: Reads PDF files into a llama_index Document, currently doesn't support embedded images
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/docs/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.PDFReader
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
