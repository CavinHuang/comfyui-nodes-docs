
# Documentation
- Class name: LLMImageCaptionReader
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMImageCaptionReader节点旨在解释和描述图像文件，通过生成说明文字将视觉内容转换为描述性文本文档。这一过程有助于将图像数据整合到基于文本的索引和搜索系统中，例如llama_index文档结构。

# Input types
## Required
- path
    - 指定要生成说明文字的图像文件路径。这是一个关键输入，因为它决定了用于生成说明文字的源图像。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prompt
    - 可选的文本输入，可以引导或影响说明文字生成过程，允许生成更加定制化或具有特定上下文的描述。
    - Comfy dtype: STRING
    - Python dtype: str
- extra_info
    - 可选的附加信息，以字符串形式提供，可用于传递说明文字生成过程的额外参数或上下文。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 输出是一个包含生成的说明文字的文档对象，以结构化文本格式封装图像描述。
    - Comfy dtype: DOCUMENT
    - Python dtype: str


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
