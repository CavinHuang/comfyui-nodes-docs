---
tags:
- LLM
- LLMImage
- LlamaIndex
---

# ∞ Image Text Parser
## Documentation
- Class name: `LLMImageTextReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMImageTextReader node is designed to read and process images, extracting text and additional information based on user-defined parameters. It leverages underlying image processing and text extraction technologies to facilitate the analysis and interpretation of image content.
## Input types
### Required
- **`path`**
    - Specifies the file path of the image to be processed. This is a crucial parameter as it determines the source image for text extraction and further processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`parse_text`**
    - A boolean flag indicating whether text should be extracted from the image. This affects whether the node will perform text parsing operations on the image.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`extra_info`**
    - A string containing extra information in JSON format that can be used to provide additional context or instructions for processing the image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The output is a document containing the results of the image processing and text extraction, structured in a format that can be further analyzed or displayed.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMImageTextReader(ImageReader):
    """
    @NOTE: Not sure what this does yet
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/image/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.ImageReader
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
    #			"keep_image": ([False, True], {"default": False}),
                "parse_text": ([False, True], {"default": False}),
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, parse_text:bool, extra_info:str, keep_image:bool=False, fs = None):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
    #	self._keep_image = keep_image
        self._parse_text = parse_text
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
