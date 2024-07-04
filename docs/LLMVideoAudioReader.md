
# Documentation
- Class name: LLMVideoAudioReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMVideoAudioReader节点专门用于读取多媒体文件，特别是Mp3和Mp4格式，并提取音频转录内容以创建结构化文档。这一过程使得多媒体内容能够被整合到基于文本的数据分析和处理工作流程中。

# Input types
## Required
- path
    - 指定要处理的Mp3或Mp4文件的文件路径。这个路径对于定位和访问文件以进行转录提取至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- extra_info
    - 提供可选的附加信息，可用于影响多媒体文件的处理。这可能包括音频处理参数或要包含在输出文档中的元数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 输出是一个包含从输入多媒体文件中提取的音频转录内容的结构化文档。这个文档已准备好进行进一步的处理或分析。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple[Document]


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
