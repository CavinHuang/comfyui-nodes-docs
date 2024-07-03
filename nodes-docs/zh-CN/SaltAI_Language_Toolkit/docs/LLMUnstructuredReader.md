
# Documentation
- Class name: LLMUnstructuredReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMUnstructuredReader节点旨在读取和处理非结构化文件，将其转换为适合llama_index系统进行索引和进一步分析的格式。它支持多种文件类型，是将原始数据转换为结构化文档格式的多功能工具。

# Input types
## Required
- path
    - 指定需要读取的非结构化文件的文件路径。这对于定位和访问要处理的文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- split_documents
    - 一个布尔标志，指示是否应根据特定标准将输入文件拆分为多个文档。这会影响数据的分段和结构化方式。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
## Optional
- extra_info
    - 一个可选的字符串，包含JSON格式的附加信息或参数，可用于自定义读取过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 来自非结构化文件的已处理数据，以文档或文档列表的形式构造，可用于索引和分析。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMUnstructuredReader(UnstructuredReader):
    """
    @NOTE: Reads unstructured (most kinds of) files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/unstructured/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.UnstructuredReader
    """

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
                "split_documents": ([False, True], { "default": False})
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, extra_info:str, split_documents:bool = False):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info, split_documents)
        return (data, )

```
