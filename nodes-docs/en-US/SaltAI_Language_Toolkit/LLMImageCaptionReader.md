---
tags:
- LLM
- LlamaIndex
---

# ∞ Image BLIP Caption
## Documentation
- Class name: `LLMImageCaptionReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMImageCaptionReader node is designed to interpret and describe image files by generating captions, effectively converting visual content into descriptive text documents. This process facilitates the integration of image data into text-based indexing and search systems, such as the llama_index Document structure.
## Input types
### Required
- **`path`**
    - Specifies the file path of the image to be captioned. This is a crucial input as it determines the source image for caption generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`prompt`**
    - An optional text input that can guide or influence the caption generation process, allowing for more tailored or context-specific descriptions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`extra_info`**
    - Optional additional information provided as a string, which can be used to pass extra parameters or context for the caption generation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The output is a document object that contains the generated caption, encapsulating the image description in a structured text format.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMImageCaptionReader(ImageCaptionReader):
    """
    @NOTE: Describes the image file as if it were captioning it into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/image_caption/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.ImageCaptionReader
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
                "prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": ""}),
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, prompt:str, extra_info:str, keep_image:bool=False):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
    #	self._keep_image = keep_image
        self._prompt = prompt
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
