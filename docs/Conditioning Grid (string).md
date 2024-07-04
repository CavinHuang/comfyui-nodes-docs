
# Documentation
- Class name: Conditioning Grid (string)
- Category: Bmad/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Conditioning Grid (string)节点旨在自动化网格布局的条件生成过程。它通过使用ClipTextEncode节点对文本输入进行编码，将每个文本输入转化为条件，然后应用到网格的AreaConditioners上。这种方法简化了生成任务中条件化网格的创建过程。

# Input types
## Required
- clip
    - clip参数是用于将文本输入编码成条件的CLIP模型。它在解释文本并将其转换为可用于条件化的格式方面起着关键作用。
    - Comfy dtype: CLIP
    - Python dtype: comfy.sd.CLIP
- base
    - base参数是作为网格基础条件的基本文本输入。这个输入会被编码并用作进一步条件化的起点。
    - Comfy dtype: STRING
    - Python dtype: str
- columns
    - columns参数定义了网格的列数。它决定了网格的水平维度，并影响文本输入的组织和条件化方式。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - rows参数定义了网格的行数。它决定了网格的垂直维度，并影响文本输入的组织和条件化方式。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - width参数设定了网格中每个单元格的宽度（以像素为单位）。这影响了应用于每个网格单元的条件化的空间分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数设定了网格中每个单元格的高度（以像素为单位）。这影响了应用于每个网格单元的条件化的空间分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- strength
    - strength参数控制了应用于网格的条件化强度。这个参数影响条件化效果对生成内容的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出的conditioning是网格的最终条件化结果，可直接用于生成任务。它封装了应用于网格布局的编码文本输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningGridStr:
    """
    Node similar to ConditioningGridCond, but automates an additional step, using a ClipTextEncode per text input.
    Each conditioning obtained from the text inputs is then used as input for the Grid's AreaConditioners.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "clip": ("CLIP",),
            "base": ("STRING", {"default": '', "multiline": False}),
            "columns": grid_len_INPUT,
            "rows": grid_len_INPUT,
            "width": ("INT", {"default": 256, "min": 16, "max": 2048, "step": 1}),
            "height": ("INT", {"default": 256, "min": 16, "max": 2048, "step": 1}),
            "strength": ("FLOAT", {"default": 3, }),
        }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "set_conditioning"
    CATEGORY = "Bmad/conditioning"

    def set_conditioning(self, clip, base, columns, rows, width, height, strength, **kwargs):
        text_encode_node = nodes.CLIPTextEncode()
        cond_grid_node = ConditioningGridCond()

        encoded_base = text_encode_node.encode(clip, base)[0]
        encoded_grid = {}
        for r in range(rows):
            for c in range(columns):
                cell = f"r{r + 1}_c{c + 1}"
                encoded_grid[cell] = text_encode_node.encode(clip, kwargs[cell])[0]

        return cond_grid_node.set_conditioning(encoded_base, columns, rows, width, height, strength, **encoded_grid)

```
