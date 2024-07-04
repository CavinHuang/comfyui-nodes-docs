
# Documentation
- Class name: LLMHWPReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMHWPReader节点旨在读取和处理HWP（韩国文字处理器）文件，这是一种在韩国广受欢迎的文字处理文件格式。该节点将HWP文件转换为适合在llama_index生态系统中进行进一步分析或处理的格式。

# Input types
## Required
- path
    - 指定要读取的HWP文档的文件路径。这个路径对于定位和访问文件以进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- extra_info
    - 以JSON字符串格式提供额外的信息或参数，可能会影响HWP文件的处理方式，允许对文件进行自定义处理。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 将处理后的HWP文件内容作为文档对象返回，可直接集成到llama_index生态系统中进行进一步分析或处理。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMHWPReader(HWPReader):
    """
    @NOTE: Reads HWP (Korean) files into a llama_index Document
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.HWPReader
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

    def execute(self, path:str,  extra_info:str, fs = None):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
