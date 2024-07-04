
# Documentation
- Class name: `LLMXMLReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

LLMXMLReader节点专门用于读取XML文件并将其转换为适合在llama_index生态系统中进行进一步处理或分析的格式。它利用XMLReader基类来解析XML文档，如果提供了可选的额外信息，还会对文档进行丰富。

# Input types
## Required
- **`path`**
    - 指定要读取的XML文件的文件系统路径。这是一个至关重要的输入，因为它决定了处理的源文档。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- **`extra_info`**
    - 允许包含用户自定义的额外信息，可在读取过程中使用，提供了一种传递额外上下文或指令的方式。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- **`documents`**
    - 输出经过处理的文档，格式与llama_index生态系统兼容，可以进行进一步分析或操作。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMXMLReader(XMLReader):
    """
    @NOTE: Reads XML files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/xml/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.XMLReader
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
