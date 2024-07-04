
# Documentation
- Class name: LLMPagedCSVReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMPagedCSVReader节点专门用于读取CSV文件并将其转换为具有分页功能的结构化文档格式。它通过将大型CSV文件分割成可管理的页面，实现了高效的处理和操作。

# Input types
## Required
- path
    - 指定要读取的CSV文件的文件路径。这对于定位和访问文件以进行读取是必不可少的。
    - Comfy dtype: STRING
    - Python dtype: str
- encoding
    - 定义CSV文件的字符编码，如UTF-8，以确保正确解释文本。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- delimiter
    - 设置用于分隔CSV文件中列的字符，通常是逗号(,)。
    - Comfy dtype: STRING
    - Python dtype: str
- quotechar
    - 指示用于包裹包含分隔符的文本的字符，通常是双引号(")。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 允许包含可能与处理CSV文件相关的额外可选信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 返回一个结构化文档格式，代表CSV文件的内容，并分段为多个页面以便于处理。
    - Comfy dtype: DOCUMENT
    - Python dtype: Document


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMPagedCSVReader(PagedCSVReader):
    """
    @NOTE: Reads CSV files into a llama_index Document list, with paging
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/paged_csv/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.PagedCSVReader
    """

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
                "encoding": ([
                    "utf-8"
                ],),
                "delimiter": ("STRING", { "default": ","}),
                "quotechar": ("STRING", { "default": '"'}),
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, encoding:str, delimiter:str, quotechar:str):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        self._encoding = encoding
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info, delimiter, quotechar)
        return (data, )

```
