# ∞ Mbox
## Documentation
- Class name: `LLMMboxReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMMboxReader node specializes in reading email files and converting them into a structured document format, leveraging the capabilities of the llama_index Document model. It is designed to facilitate the processing and analysis of email data by transforming mbox files into a more accessible and analyzable form.
## Input types
### Required
- **`path`**
    - Specifies the filesystem path to the mbox file to be read. This path is essential for locating and accessing the file for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Provides additional, optional information in a string format that can be used to influence the reading process or handle specific requirements for processing the mbox file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - Returns the processed email data from the mbox file as a structured document, ready for further analysis or manipulation.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMMboxReader(MboxReader):
    """
    @NOTE: Reads Email files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/mbox/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.MboxReader
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
