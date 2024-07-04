
# Documentation
- Class name: LLMMarkdownReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMMarkdownReader节点专门用于读取和处理Markdown文档文件，例如GitHub的README文件，并将其转换为适合进一步分析或处理的结构化文档格式。这一功能使Markdown内容能够轻松集成到数据处理流程中，实现自动化的内容提取和转换。

# Input types
## Required
- path
    - 指定要读取的Markdown文件在文件系统中的路径。这个参数对于定位和访问待处理文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_info
    - 提供可选的额外信息，用于影响读取过程。这可能包括元数据或JSON字符串格式的配置选项。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 返回输入Markdown文件的结构化文档表示，可直接用于后续处理或分析。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMMarkdownReader(MarkdownReader):
    """
    @NOTE: Reads Markdown documentation files (like github readmes) into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/markdown/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.MarkdownReader
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
