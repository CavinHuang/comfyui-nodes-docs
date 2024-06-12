# ∞ RTF
## Documentation
- Class name: `LLMRTFReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMRTFReader node specializes in reading RTF (Rich Text Format) files and converting them into a format suitable for further processing or analysis within the llama_index ecosystem. It leverages the capabilities of the RTFReader to parse and extract data from RTF files, facilitating the integration of rich text content into data pipelines.
## Input types
### Required
- **`path`**
    - Specifies the file path to the RTF document to be read. It is essential for locating and accessing the file for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Provides additional information or parameters in a string format that can be used to customize the reading process of the RTF file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The output is a document object that represents the parsed content of the RTF file, ready for further processing or analysis.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMRTFReader(RTFReader):
    """
    @NOTE: Reads RTF rich text files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/rtf/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.RTFReader
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
