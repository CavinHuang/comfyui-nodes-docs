---
tags:
- LLM
- LlamaIndex
---

# ∞ CSV
## Documentation
- Class name: `LLMCSVReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMCSVReader node specializes in reading CSV files and converting them into a format suitable for llama_index Document processing. It allows for the customization of the reading process through various parameters, enabling the handling of different CSV structures and the inclusion of additional information.
## Input types
### Required
- **`path`**
    - Specifies the file path of the CSV file to be read. It is crucial for locating the file that needs to be processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`concat_rows`**
    - Determines whether rows from the CSV file should be concatenated. This affects how the data is structured in the resulting Document.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
### Optional
- **`extra_info`**
    - Allows for the inclusion of extra information in a JSON string format, which can be used to provide additional context or configuration for the reading process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The output is a Document or a list of Documents, depending on the reading configuration, representing the structured data extracted from the CSV file.
    - Python dtype: `Document or List[Document]`
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
