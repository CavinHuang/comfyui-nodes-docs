# ∞ Docx
## Documentation
- Class name: `LLMDocxReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMDocxReader node specializes in reading Microsoft Word (.docx) files and converting them into a format suitable for further processing or analysis within the llama_index ecosystem. It leverages the capabilities of the DocxReader class to parse and extract document content, facilitating the integration of Word documents into data pipelines.
## Input types
### Required
- **`path`**
    - Specifies the file system path to the .docx file to be read. This path is essential for locating and accessing the file for content extraction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Provides additional, optional information in a string format that can be used to influence the reading process or to append extra metadata to the resulting document.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The output is a document object that encapsulates the content and structure of the read .docx file, ready for further processing within the llama_index ecosystem.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMDocxReader(DocxReader):
    """
    @NOTE: Reads MS Word files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/docs/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.DocxReader
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
