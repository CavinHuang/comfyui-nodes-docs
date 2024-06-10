# ∞ Pptx
## Documentation
- Class name: `LLMPptxReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMPptxReader node is designed to read Microsoft PowerPoint (PPTX) files and convert them into a format that can be processed by llama_index, potentially including the interpretation of images within the documents.
## Input types
### Required
- **`path`**
    - Specifies the file path to the PowerPoint (PPTX) file to be read. This is essential for locating and accessing the file for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Provides additional information or instructions in a string format, which can be used to influence how the document is read or processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - Outputs the content of the PowerPoint file as a document in a format compatible with llama_index.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMPptxReader(PptxReader):
    """
    @NOTE: Reads MS Powerpoint files into a llama_index Document, not sure if images are interpreted
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/slides/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.PptxReader
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
