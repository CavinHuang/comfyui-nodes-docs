
# Documentation
- Class name: LLMCSVReader
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/jmiller641/SALT/blob/dev/ComfyUI-SALT/saltDocumentation.md

LLMCSVReader节点专门用于读取CSV文件并将其转换为适合llama_index文档处理的格式。它允许通过各种参数来自定义读取过程，从而能够处理不同的CSV结构并包含额外信息。

# Input types
## Required
- path
    - 指定要读取的CSV文件的文件路径。这对于定位需要处理的文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- concat_rows
    - 决定是否应该连接CSV文件中的行。这会影响结果文档中数据的结构。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
## Optional
- extra_info
    - 允许以JSON字符串格式包含额外信息，可用于为读取过程提供额外的上下文或配置。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 输出是一个Document或Document列表，取决于读取配置，代表从CSV文件中提取的结构化数据。
    - Comfy dtype: DOCUMENT
    - Python dtype: Document or List[Document]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMCSVReader(CSVReader):
    """
    @NOTE: Reads CSV files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/tabular/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.CSVReader
    """

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
                "concat_rows": ([False,True], {"default":True}),
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, concat_rows:bool, extra_info:str):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        self.concat_rows = concat_rows
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
