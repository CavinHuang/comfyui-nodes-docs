# ∞ XML
## Documentation
- Class name: `LLMXMLReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMXMLReader node specializes in reading XML files and converting them into a format suitable for further processing or analysis within the llama_index ecosystem. It leverages the XMLReader base to parse XML documents, enriching them with optional additional information if provided.
## Input types
### Required
- **`path`**
    - Specifies the filesystem path to the XML file to be read. This is a crucial input as it determines the source document for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Allows for the inclusion of additional, user-defined information that can be utilized during the reading process, offering a way to pass extra context or directives.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - Outputs the processed document in a format that is compatible with the llama_index ecosystem, ready for further analysis or manipulation.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMXMLReader(XMLReader):
    """
    @NOTE: Reads XML files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/xml/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.XMLReader
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
