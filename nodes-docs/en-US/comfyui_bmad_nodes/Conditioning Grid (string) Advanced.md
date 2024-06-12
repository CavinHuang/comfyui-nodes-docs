---
tags:
- Conditioning
---

# Conditioning Grid (string) Advanced
## Documentation
- Class name: `Conditioning Grid (string) Advanced`
- Category: `Bmad/conditioning`
- Output node: `False`

This node enhances the functionality of ConditioningGridCond by incorporating an advanced text encoding step for each text input using AdvancedCLIPTextEncode. It automates the process of generating conditioning from text inputs, which are then utilized as inputs for the grid's AreaConditioners, streamlining the creation of complex conditioning grids.
## Input types
### Required
- **`clip`**
    - The CLIP model used for encoding the text inputs. It plays a crucial role in determining the quality and relevance of the generated conditioning.
    - Comfy dtype: `CLIP`
    - Python dtype: `comfy.sd.CLIP`
- **`base`**
    - The base text input that serves as the foundational conditioning layer for the grid. It is encoded and integrated into the grid's overall conditioning.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`columns`**
    - Specifies the number of columns in the grid. It determines the grid's horizontal dimension and affects how the conditioning is distributed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rows`**
    - Specifies the number of rows in the grid. It determines the grid's vertical dimension and affects how the conditioning is distributed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - The width of each grid cell. It influences the spatial resolution of the conditioning applied to each cell.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of each grid cell. It influences the spatial resolution of the conditioning applied to each cell.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`strength`**
    - Determines the intensity of the conditioning applied. It affects how strongly the conditioning influences the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`token_normalization`**
    - Specifies the method for normalizing the tokens in the text inputs, affecting the encoding process and the resulting conditioning.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight_interpretation`**
    - Defines how the weights are interpreted during the encoding process, influencing the conditioning's impact on the generated content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a complex conditioning grid, constructed from the encoded text inputs, ready to be used for generating content.
    - Python dtype: `Dict[str, Any]`
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
