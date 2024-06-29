---
tags:
- LLM
- LLMImage
- LlamaIndex
---

# ∞ Image Vision LLM
## Documentation
- Class name: `LLMImageVisionLLMReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMImageVisionLLMReader node is designed to read and process image files, leveraging large language models (LLMs) to interpret and extract information from visual content. It aims to bridge the gap between visual data and textual analysis, enabling a deeper understanding of images through the lens of LLMs.
## Input types
### Required
- **`path`**
    - Specifies the file path to the image to be processed. It is a crucial parameter as it determines the source of the visual data the node will analyze.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Provides additional, optional information in a string format that can be used to influence the processing of the image. This could include settings or parameters specific to the task at hand.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - Returns the processed data as documents, encapsulating the insights extracted from the image by the LLM.
    - Python dtype: `List[Document]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMImageVisionLLMReader(ImageVisionLLMReader):
    """
    @NOTE: Not sure what this does yet
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/image_vision_llm/base.py
    @Documentation:https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.ImageVisionLLMReader
    """

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
                #"warning": ("STRING", {"default":"WARNING: This downloads a 15GB file in two parts."}),
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, warning:str, extra_info:str):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
