
# Documentation
- Class name: LLMPptxReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMPptxReader节点旨在读取Microsoft PowerPoint (PPTX)文件，并将其转换为可被llama_index处理的格式，可能包括对文档中图像的解释。

# Input types
## Required
- path
    - 指定要读取的PowerPoint (PPTX)文件的文件路径。这对于定位和访问文件进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 以字符串格式提供额外的信息或指令，可用于影响文档的读取或处理方式。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 以与llama_index兼容的格式输出PowerPoint文件的内容作为文档。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMPptxReader(PptxReader):
    """
    @NOTE: Reads MS Powerpoint files into a llama_index Document, not sure if images are interpreted
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/slides/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.PptxReader
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
