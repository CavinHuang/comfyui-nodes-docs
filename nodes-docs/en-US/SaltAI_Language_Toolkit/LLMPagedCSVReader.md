---
tags:
- LLM
- LlamaIndex
---

# ∞ Paged CSV
## Documentation
- Class name: `LLMPagedCSVReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMPagedCSVReader node specializes in reading CSV files and converting them into a structured document format with paging capabilities. It allows for efficient handling and processing of large CSV files by segmenting them into manageable pages.
## Input types
### Required
- **`path`**
    - Specifies the file path of the CSV file to be read. This is essential for locating and accessing the file for reading.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`encoding`**
    - Defines the character encoding of the CSV file, such as UTF-8, to ensure correct interpretation of text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`delimiter`**
    - Sets the character used to separate columns in the CSV file, typically a comma (,).
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`quotechar`**
    - Indicates the character used to wrap text containing the delimiter, commonly a double quote (").
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Allows for the inclusion of additional, optional information that may be relevant for processing the CSV file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - Returns a structured document format that represents the content of the CSV file, segmented into pages for easier handling.
    - Python dtype: `Document`
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
