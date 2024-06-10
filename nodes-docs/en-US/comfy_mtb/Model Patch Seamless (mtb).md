---
tags:
- ModelGuidance
- ModelPatch
---

# Model Patch Seamless (mtb)
## Documentation
- Class name: `Model Patch Seamless (mtb)`
- Category: `mtb/textures`
- Output node: `False`

This node is designed to seamlessly patch models within the MTB framework, enhancing their functionality or performance without altering their core structure. It focuses on integrating modifications in a way that is transparent to the user, ensuring that the original model's capabilities are extended or optimized while maintaining its original workflow and outputs.
## Input types
### Required
- **`model`**
    - The model to be patched, aiming to enhance its functionality or performance seamlessly within the MTB framework.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`startStep`**
    - Defines the starting step for the patching process, allowing for targeted modifications within the model's operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`stopStep`**
    - Specifies the stopping step for the patching process, enabling precise control over the extent of model modifications.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tilingX`**
    - A boolean flag indicating whether tiling should be applied along the X-axis, affecting the model's processing of images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tilingY`**
    - A boolean flag indicating whether tiling should be applied along the Y-axis, impacting the model's image processing capabilities.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`Original Model (passthrough)`**
    - Comfy dtype: `MODEL`
    - The original model passed through without modifications, serving as a baseline for comparison.
    - Python dtype: `torch.nn.Module`
- **`Patched Model`**
    - Comfy dtype: `MODEL`
    - The modified version of the original model, enhanced with seamless patching to improve functionality or performance.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_ModelPatchSeamless:
    """Uses the stable diffusion 'hack' to infer seamless images by setting the model layers padding mode to circular (experimental)"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL",),
                "startStep": ("INT", {"default": 0}),
                "stopStep": ("INT", {"default": 999}),
                "tilingX": (
                    "BOOLEAN",
                    {"default": True},
                ),
                "tilingY": (
                    "BOOLEAN",
                    {"default": True},
                ),
            }
        }

    RETURN_TYPES = ("MODEL", "MODEL")
    RETURN_NAMES = (
        "Original Model (passthrough)",
        "Patched Model",
    )
    FUNCTION = "hack"

    CATEGORY = "mtb/textures"

    def apply_circular(self, model, startStep, stopStep, x, y):
        for layer in [
            layer
            for layer in model.modules()
            if isinstance(layer, torch.nn.Conv2d)
        ]:
            layer.padding_modeX = "circular" if x else "constant"
            layer.padding_modeY = "circular" if y else "constant"
            layer.paddingX = (
                layer._reversed_padding_repeated_twice[0],
                layer._reversed_padding_repeated_twice[1],
                0,
                0,
            )
            layer.paddingY = (
                0,
                0,
                layer._reversed_padding_repeated_twice[2],
                layer._reversed_padding_repeated_twice[3],
            )
            layer.paddingStartStep = startStep
            layer.paddingStopStep = stopStep
            layer.timestep = 0
            layer._conv_forward = conv_forward.__get__(layer, torch.nn.Conv2d)

        return model

    def hack(
        self,
        model,
        startStep,
        stopStep,
        tilingX,
        tilingY,
    ):
        hacked_model = copy.deepcopy(model)
        self.apply_circular(
            hacked_model.model, startStep, stopStep, tilingX, tilingY
        )
        return (model, hacked_model)

```
