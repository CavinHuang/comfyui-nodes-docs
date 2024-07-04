
# Documentation
- Class name: LLMImageTextReader
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMImageTextReader节点用于读取和处理图像，根据用户定义的参数提取文本和附加信息。它利用底层的图像处理和文本提取技术，促进图像内容的分析和解释。

# Input types
## Required
- path
    - 指定要处理的图像文件路径。这是一个至关重要的参数，因为它决定了用于文本提取和进一步处理的源图像。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- parse_text
    - 一个布尔标志，指示是否应从图像中提取文本。这影响节点是否会对图像执行文本解析操作。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- extra_info
    - 包含额外信息的JSON格式字符串，可用于提供处理图像的附加上下文或指令。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 输出是包含图像处理和文本提取结果的文档，其结构化格式便于进一步分析或显示。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


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
