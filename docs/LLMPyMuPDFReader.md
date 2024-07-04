
# Documentation
- Class name: LLMPyMuPDFReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMPyMuPDFReader节点旨在读取PDF文件并将其转换为llama_index Document格式，利用PyMuPDF库进行高效处理。该节点可以从PDF文档中提取文本和潜在的元数据，使其可以在llama_index生态系统中进行进一步分析或处理。

# Input types
## Required
- path
    - 指定要读取的PDF文档的文件路径。这个路径对于定位和访问要处理的文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- metadata
    - 一个布尔标志，指示是否应该与文本一起从PDF文档中提取元数据。这个选项允许通过包含额外信息来进行更全面的文档分析。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
## Optional
- extra_info
    - 一个包含额外配置或信息的JSON格式字符串，可用于自定义读取过程。这个参数允许灵活地适应特定需求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 输出是一个Document对象，包含从PDF文件中提取的文本（以及可选的元数据），可以直接集成到llama_index生态系统中。
    - Comfy dtype: DOCUMENT
    - Python dtype: Document


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMPyMuPDFReader(PyMuPDFReader):
    """
    @NOTE: Reads PDF files into a llama_index Document using Pymu
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/pymu_pdf/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.PyMuPDFReader
    """

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
                "metadata": ([False, True], {"default": True}),
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, metadata:bool, extra_info:str):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, metadata, extra_info)
        return (data, )

```
