---
tags:
- LLM
- LlamaIndex
---

# ∞ Video/Audio
## Documentation
- Class name: `LLMVideoAudioReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMVideoAudioReader node specializes in reading multimedia files, specifically Mp3 and Mp4 formats, and extracting audio transcripts to create a structured document. This process enables the integration of multimedia content into text-based data analysis and processing workflows.
## Input types
### Required
- **`path`**
    - Specifies the file path to the Mp3 or Mp4 file to be processed. This path is essential for locating and accessing the file for transcript extraction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Provides additional, optional information that can be used to influence the processing of the multimedia file. This could include parameters for audio processing or metadata to be included in the output document.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The output is a structured document containing the extracted audio transcript from the input multimedia file. This document is ready for further processing or analysis.
    - Python dtype: `tuple[Document]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMVideoAudioReader(VideoAudioReader):
    """
    @NOTE: Reads Mp3 and Mp4 files and parses audio transcript into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/video_audio/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.VideoAudioReader
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
