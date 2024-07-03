
# Documentation
- Class name: LLMImageVisionLLMReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMImageVisionLLMReader节点旨在读取和处理图像文件，利用大型语言模型（LLMs）来解释和提取视觉内容中的信息。它的目标是通过LLMs的视角，架起视觉数据与文本分析之间的桥梁，从而实现对图像的更深入理解。

# Input types
## Required
- path
    - 指定要处理的图像文件路径。这是一个至关重要的参数，因为它决定了节点将要分析的视觉数据的来源。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- extra_info
    - 以字符串格式提供可选的额外信息，可用于影响图像的处理过程。这可能包括特定任务的设置或参数。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 将处理后的数据以文档形式返回，封装了LLM从图像中提取的见解。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[Document]


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
