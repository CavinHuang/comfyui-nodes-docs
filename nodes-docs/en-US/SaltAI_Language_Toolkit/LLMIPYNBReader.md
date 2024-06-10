# ∞ IPYNB
## Documentation
- Class name: `LLMIPYNBReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMIPYNBReader node specializes in reading and interpreting IPYNB (Jupyter Notebook) files, transforming them into a format suitable for further processing or analysis within the llama_index ecosystem. It leverages the structure and content of IPYNB files to extract documentation or data, facilitating integration with llama_index's document management capabilities.
## Input types
### Required
- **`path`**
    - Specifies the filesystem path to the IPYNB file to be read. This path is essential for locating and accessing the file for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Provides additional, optional information in a string format that can be used to influence the reading process or handle specific requirements for processing the IPYNB file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The processed data from the IPYNB file, formatted as a document suitable for use within the llama_index ecosystem.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMIPYNBReader(IPYNBReader):
    """
    @NOTE: Reads IPYNB documentation files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/ipynb/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.IPYNBReader
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
