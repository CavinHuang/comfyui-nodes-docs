
# Documentation
- Class name: LLMPandasCSVReader
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMPandasCSVReader 节点专门用于读取 CSV 文件并将其转换为 llama_index Documents，同时提供了额外的配置选项来连接行和列。该节点通过允许自定义连接策略，增强了处理 CSV 数据的灵活性，使其适用于广泛的数据准备任务。

# Input types
## Required
- path
    - 指定要读取的 CSV 文件的文件路径，作为节点的主要数据源。路径的有效性直接影响节点访问和处理指定 CSV 文件的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- concat_rows
    - 决定在读取过程中是否应该连接行，影响数据在输出 Documents 中的汇总和呈现方式。此选项允许根据特定分析需求定制数据结构。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- col_joiner
    - 指定在连接行时用于连接列值的字符串，影响连接数据的格式和可读性。此参数允许精确控制数据的呈现方式。
    - Comfy dtype: STRING
    - Python dtype: str
- row_joiner
    - 指定用于连接行值的字符串，影响输出 Documents 的结构和组织。这允许自定义数据格式，提高节点在各种数据分析场景中的适应性。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- extra_info
    - 允许包含额外的用户定义信息，与 CSV 数据一起处理。此参数可以用上下文或元数据丰富输出 Documents，从而增加节点在复杂数据处理任务中的实用性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 将处理后的数据作为 llama_index Documents 输出，可供进一步处理或分析。这些 Documents 的结构和内容由输入参数塑造，实现定制化的数据准备。
    - Comfy dtype: DOCUMENT
    - Python dtype: Document


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMPandasCSVReader(PandasCSVReader):
    """
    @NOTE: Reads CSV files into a llama_index Document, with some additional joiner config
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/tabular/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.PandasCSVReader
    """

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
                "concat_rows": ([False, True], {"default": True}),
                "col_joiner": ("STRING", {"default":""}),
                "row_joiner": ("STRING", {"default":""}),
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
    			#"pandas_config": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path, concat_rows, col_joiner, row_joiner, extra_info:str="{}", fs = None):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        self._concat_rows=concat_rows
        self._col_joiner=col_joiner
        self._row_joiner=row_joiner
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
