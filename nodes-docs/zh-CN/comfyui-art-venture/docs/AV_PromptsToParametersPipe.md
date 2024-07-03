
# Documentation
- Class name: AV_PromptsToParametersPipe
- Category: Art Venture/Parameters
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_PromptsToParametersPipe节点旨在将文本提示转换为结构化的参数管道，以便将用户定义的正面和负面提示整合到更广泛的艺术生成或修改管道中。它允许通过将这些提示与可选的图像和遮罩输入一起纳入处理流程，从而实现内容的动态定制。

# Input types
## Required
- positive
    - 正面提示代表了在艺术生成过程中希望包含的所需属性或元素，作为输出创作的指导。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面提示指定了在艺术生成过程中要排除的属性或元素，通过避免不需要的特征来帮助细化输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- pipe
    - 一个结构化的数据管道，可以选择性地提供，以包含现有参数以供进一步处理或修改。
    - Comfy dtype: PIPE
    - Python dtype: Dict
- image
    - 一个可选的图像输入，可用于影响艺术生成过程，提供视觉上下文或修改基础。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[Image]
- mask
    - 一个可选的遮罩输入，可用于指定所提供图像中的兴趣区域或排除区域，有助于进行有针对性的修改或增强。
    - Comfy dtype: MASK
    - Python dtype: Optional[Mask]

# Output types
- pipe
    - 输出是一个结构化的参数管道，其中包含了提供的正面和负面提示，以及可选的图像和遮罩数据，用于定制化的艺术生成。
    - Comfy dtype: PIPE
    - Python dtype: Dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVPromptsToParametersPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("STRING", {"multiline": True, "default": "Positive"}),
                "negative": ("STRING", {"multiline": True, "default": "Negative"}),
            },
            "optional": {
                "pipe": ("PIPE",),
                "image": ("IMAGE",),
                "mask": ("MASK",),
            },
        }

    RETURN_TYPES = ("PIPE",)
    CATEGORY = "Art Venture/Parameters"
    FUNCTION = "prompt_to_parameter_pipe"

    def prompt_to_parameter_pipe(self, positive, negative, pipe: Dict = {}, image=None, mask=None):
        pipe["positive"] = positive
        pipe["negative"] = negative
        pipe["image"] = image
        pipe["mask"] = mask
        return (pipe,)

```
