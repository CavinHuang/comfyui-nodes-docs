---
tags:
- LLM
- LlamaIndex
---

# ∞ Markdown
## Documentation
- Class name: `LLMMarkdownReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMMarkdownReader node is designed to read and process Markdown documentation files, such as GitHub READMEs, converting them into a structured document format suitable for further analysis or processing. This functionality facilitates the integration of Markdown content into data pipelines, enabling automated content extraction and transformation.
## Input types
### Required
- **`path`**
    - Specifies the file system path to the Markdown file to be read. This parameter is essential for locating and accessing the file for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Provides additional, optional information that can be used to influence the reading process. This could include metadata or configuration options in a JSON string format.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - Returns a structured document representation of the input Markdown file, ready for further processing or analysis.
    - Python dtype: `tuple`
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
