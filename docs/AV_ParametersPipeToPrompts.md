
# Documentation
- Class name: AV_ParametersPipeToPrompts
- Category: Art Venture/Parameters
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_ParametersPipeToPrompts节点旨在将参数管道转换为特定的提示输出，从而根据输入的参数管道生成正面提示、负面提示、图像和蒙版输出。该节点在艺术创作流程中扮演着关键角色，能够将抽象的参数集转化为具体、可操作的提示和视觉元素。

# Input types
## Required
- pipe
    - 'pipe'输入是一个字典，用作各种参数的容器，作为节点提取特定值以生成提示和视觉输出的源。它是节点操作的核心，决定了生成输出的内容。
    - Comfy dtype: PIPE
    - Python dtype: Dict

# Output types
- pipe
    - 返回原始输入参数管道，允许在后续节点中进行进一步处理或利用。
    - Comfy dtype: PIPE
    - Python dtype: Dict
- positive
    - 根据输入参数生成正面提示文本。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 根据输入参数生成负面提示文本。
    - Comfy dtype: STRING
    - Python dtype: str
- image
    - 如果在输入参数中指定，则生成图像输出。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[ImageType]
- mask
    - 如果在输入参数中指定，则生成蒙版输出。
    - Comfy dtype: MASK
    - Python dtype: Optional[MaskType]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVParametersPipeToPrompts:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE",),
            },
        }

    RETURN_TYPES = (
        "PIPE",
        "STRING",
        "STRING",
        "IMAGE",
        "MASK",
    )
    RETURN_NAMES = (
        "pipe",
        "positive",
        "negative",
        "image",
        "mask",
    )
    CATEGORY = "Art Venture/Parameters"
    FUNCTION = "parameter_pipe_to_prompt"

    def parameter_pipe_to_prompt(self, pipe: Dict = {}):
        positive = pipe.get("positive", None)
        negative = pipe.get("negative", None)
        image = pipe.get("image", None)
        mask = pipe.get("mask", None)

        return (
            pipe,
            positive,
            negative,
            image,
            mask,
        )

```
