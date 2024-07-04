
# Documentation
- Class name: easy imageInterrogator
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy imageInterrogator节点旨在根据输入的图像生成描述性提示。它通过不同的模式来调整分析过程,以满足所需的详细程度或速度。这一功能有助于为视觉内容创建文本表述,可用于进一步的图像生成或分析任务。

# Input types
## Required
- image
    - image参数是该节点将要分析以生成描述性提示的视觉内容。它是节点操作的核心,因为输出取决于对这个图像的解释。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mode
    - mode参数允许用户指定分析过程的详细程度或速度,提供如'fast'、'classic'、'best'和'negative'等选项。这个选择会影响提示的质量和生成时间。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- use_lowvram
    - use_lowvram参数使节点能够在低VRAM模式下运行,为显存有限的系统优化资源使用。这可能会影响分析过程的效率和结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- prompt
    - 输出的prompt是根据输入图像生成的文本描述,通过指定的分析模式反映了对视觉内容的解释。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imageInterrogator:
    @classmethod
    def INPUT_TYPES(self):
        return {
          "required": {
              "image": ("IMAGE",),
              "mode": (['fast','classic','best','negative'],),
              "use_lowvram": ("BOOLEAN", {"default": True}),
          }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "interrogate"
    CATEGORY = "EasyUse/Image"
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (True,)

    def interrogate(self, image, mode, use_lowvram=False):
      prompt = ci.image_to_prompt(image, mode, low_vram=use_lowvram)
      return {"ui":{"text":prompt},"result":(prompt,)}

```
