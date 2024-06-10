---
tags:
- LLM
- LlamaIndex
---

# ∞ Pandas CSV
## Documentation
- Class name: `LLMPandasCSVReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMPandasCSVReader node specializes in reading CSV files and transforming them into llama_index Documents, incorporating additional configuration options for joining rows and columns. This node enhances the flexibility in processing CSV data by allowing custom concatenation strategies, making it suitable for a wide range of data preparation tasks.
## Input types
### Required
- **`path`**
    - Specifies the file path to the CSV file to be read, serving as the primary data source for the node. The path's validity directly impacts the node's ability to access and process the specified CSV file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`concat_rows`**
    - Determines whether rows should be concatenated during the reading process, affecting how data is aggregated and presented in the output Documents. This option allows for tailored data structuring to meet specific analysis needs.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`col_joiner`**
    - Specifies the string to be used for joining column values when concatenating rows, influencing the format and readability of the concatenated data. This parameter enables precise control over the data's presentation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`row_joiner`**
    - Specifies the string to be used for joining row values, impacting the structure and organization of the output Documents. This allows for customized data formatting, enhancing the node's adaptability to various data analysis scenarios.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Allows for the inclusion of additional, user-defined information to be processed along with the CSV data. This parameter can enrich the output Documents with context or metadata, thereby increasing the node's utility in complex data processing tasks.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - Outputs the processed data as llama_index Documents, ready for further processing or analysis. The structure and content of these Documents are shaped by the input parameters, enabling tailored data preparation.
    - Python dtype: `Document`
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
