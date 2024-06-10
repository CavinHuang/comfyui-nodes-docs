---
tags:
- LLM
- LlamaIndex
---

# ∞ Unstructured File
## Documentation
- Class name: `LLMUnstructuredReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMUnstructuredReader node is designed to read and process unstructured files, converting them into a format suitable for indexing and further analysis by the llama_index system. It supports a variety of file types, making it a versatile tool for ingesting raw data into structured document formats.
## Input types
### Required
- **`path`**
    - Specifies the file path to the unstructured file that needs to be read. It is crucial for locating and accessing the file for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`split_documents`**
    - A boolean flag indicating whether the input file should be split into multiple documents based on certain criteria. This affects how the data is segmented and structured.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
### Optional
- **`extra_info`**
    - An optional string containing additional information or parameters in JSON format that can be used to customize the reading process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The processed data from the unstructured file, structured as a document or a list of documents, ready for indexing and analysis.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMUnstructuredReader(UnstructuredReader):
    """
    @NOTE: Reads unstructured (most kinds of) files into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/unstructured/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.UnstructuredReader
    """

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
                "split_documents": ([False, True], { "default": False})
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, extra_info:str, split_documents:bool = False):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info, split_documents)
        return (data, )

```
