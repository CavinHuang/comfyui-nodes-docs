
# Documentation
- Class name: LLMRTFReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMRTFReader节点专门用于读取RTF（富文本格式）文件，并将其转换为适合在llama_index生态系统中进行进一步处理或分析的格式。它利用RTFReader的功能来解析和提取RTF文件中的数据，从而方便将富文本内容集成到数据处理流程中。

# Input types
## Required
- path
    - 指定要读取的RTF文档的文件路径。它对于定位和访问要处理的文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 以字符串格式提供额外的信息或参数，可用于自定义RTF文件的读取过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 输出是一个文档对象，表示已解析的RTF文件内容，可供进一步处理或分析。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMRTFReader(RTFReader):
    """
    @NOTE: Reads RTF rich text files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/rtf/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.RTFReader
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

    def execute(self, path:str, extra_info:str):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
