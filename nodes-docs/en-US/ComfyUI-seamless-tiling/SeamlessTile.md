---
tags:
- Image
- Tiled
---

# Seamless Tile
## Documentation
- Class name: `SeamlessTile`
- Category: `conditioning`
- Output node: `False`

The SeamlessTile node enables the modification of a model to support seamless tiling in generated images. It can either modify the model in place or create a modified copy, depending on the user's choice, and supports different tiling modes including enabling tiling on both axes, only on the X-axis, or only on the Y-axis.
## Input types
### Required
- **`model`**
    - The model to be modified for seamless tiling. It is the core component that will undergo modifications to support different tiling modes.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`tiling`**
    - Specifies the tiling mode to apply to the model, which can be enabling tiling on both axes, only on the X-axis, or only on the Y-axis, or disabling it.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`copy_model`**
    - Determines whether to modify the original model in place or to create and modify a copy, allowing for non-destructive edits.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with seamless tiling capabilities applied according to the specified tiling mode.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeamlessTile:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "tiling": (["enable", "x_only", "y_only", "disable"],),
                "copy_model": (["Make a copy", "Modify in place"],),
            },
        }

    CATEGORY = "conditioning"

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "run"

    def run(self, model, copy_model, tiling):
        if copy_model == "Modify in place":
            model_copy = model
        else:
            model_copy = copy.deepcopy(model)
            
        if tiling == "enable":
            make_circular_asymm(model_copy.model, True, True)
        elif tiling == "x_only":
            make_circular_asymm(model_copy.model, True, False)
        elif tiling == "y_only":
            make_circular_asymm(model_copy.model, False, True)
        else:
            make_circular_asymm(model_copy.model, False, False)
        return (model_copy,)

```
