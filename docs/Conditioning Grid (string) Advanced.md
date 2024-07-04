
# Documentation
- Class name: Conditioning Grid (string) Advanced
- Category: Bmad/conditioning
- Output node: False

Conditioning Grid (string) Advanced节点通过使用AdvancedCLIPTextEncode为每个文本输入进行高级文本编码，从而增强了ConditioningGridCond的功能。它自动化了从文本输入生成条件的过程，这些条件随后被用作网格的AreaConditioners的输入，简化了复杂条件网格的创建过程。

# Input types
## Required
- clip
    - 用于编码文本输入的CLIP模型。它在决定生成的条件的质量和相关性方面起着至关重要的作用。
    - Comfy dtype: CLIP
    - Python dtype: comfy.sd.CLIP
- base
    - 作为网格基础条件层的基本文本输入。它被编码并集成到网格的整体条件中。
    - Comfy dtype: STRING
    - Python dtype: str
- columns
    - 指定网格中的列数。它决定了网格的水平维度，并影响条件的分布方式。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - 指定网格中的行数。它决定了网格的垂直维度，并影响条件的分布方式。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 每个网格单元的宽度。它影响应用于每个单元的条件的空间分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 每个网格单元的高度。它影响应用于每个单元的条件的空间分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- strength
    - 决定应用条件的强度。它影响条件对生成内容的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- token_normalization
    - 指定文本输入中标记的规范化方法，影响编码过程和产生的条件。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- weight_interpretation
    - 定义在编码过程中如何解释权重，影响条件对生成内容的影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- conditioning
    - 输出是一个复杂的条件网格，由编码的文本输入构建而成，可用于生成内容。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningGridStr_ADVEncode:
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

            "token_normalization": (["none", "mean", "length", "length+mean"],),
            "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],)
        }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "set_conditioning"
    CATEGORY = "Bmad/conditioning"

#def encode(self, clip: comfy.sd.CLIP, text: str, parser: str, mean_normalization: bool, multi_conditioning: bool, use_old_emphasis_implementation: bool, use_CFGDenoiser:bool,with_SDXL=False,text_g="",text_l=""):
    def set_conditioning(self, clip, base, columns, rows, width, height, strength,
                         token_normalization, weight_interpretation,
                         **kwargs):
        text_encode_node = AdvancedCLIPTextEncode()
        cond_grid_node = ConditioningGridCond()

        encoded_base = text_encode_node.encode(clip, base, token_normalization, weight_interpretation,'disable')[0]
        encoded_grid = {}
        for r in range(rows):
            for c in range(columns):
                cell = f"r{r + 1}_c{c + 1}"
                encoded_grid[cell] = text_encode_node.encode(clip, kwargs[cell], token_normalization, weight_interpretation,'disable')[0]

        return cond_grid_node.set_conditioning(encoded_base, columns, rows, width, height, strength, **encoded_grid)

```
