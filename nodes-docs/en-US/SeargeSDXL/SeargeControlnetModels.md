---
tags:
- ControlNet
---

# Controlnet Models Selector v2
## Documentation
- Class name: `SeargeControlnetModels`
- Category: `Searge/UI/Inputs`
- Output node: `False`

The SeargeControlnetModels node is designed to facilitate the selection and application of various controlnet models within a generative AI pipeline. It abstracts the complexity of choosing and integrating different controlnet models, which are essential for modifying or enhancing generated content based on specific control parameters or conditions.
## Input types
### Required
- **`clip_vision`**
    - Specifies the CLIP vision model to be used, potentially including a 'none' option to indicate no specific CLIP vision model is required. This input is crucial for determining the visual understanding context for the controlnet model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`canny_checkpoint`**
    - Refers to the specific checkpoint for the Canny edge detection model within the controlnet framework, including a 'none' option. It's used to apply edge detection features to the generated content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`depth_checkpoint`**
    - Indicates the checkpoint for the depth estimation model, allowing for depth-aware modifications to the generated content. This parameter includes a 'none' option to skip depth processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`recolor_checkpoint`**
    - Specifies the checkpoint for the recoloring model, enabling color adjustments or transformations in the generated content. Includes a 'none' option for cases where recoloring is not required.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sketch_checkpoint`**
    - Denotes the checkpoint for the sketch model, used to apply sketch-like effects or transformations to the generated content. A 'none' option is included for flexibility.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`custom_checkpoint`**
    - Allows for the specification of a custom controlnet model checkpoint, providing additional flexibility in content modification. Includes a 'none' option.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`data`**
    - Optional stream of data that can be used for additional processing or as part of the controlnet model's input. This parameter provides flexibility in handling complex workflows.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `str`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - The output data stream resulting from the application of the controlnet models, encapsulating all modifications and enhancements made to the generated content.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeControlnetModels:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip_vision": (UI.CLIP_VISION_WITH_NONE(),),
                "canny_checkpoint": (UI.CONTROLNETS_WITH_NONE(),),
                "depth_checkpoint": (UI.CONTROLNETS_WITH_NONE(),),
                "recolor_checkpoint": (UI.CONTROLNETS_WITH_NONE(),),
                "sketch_checkpoint": (UI.CONTROLNETS_WITH_NONE(),),
                "custom_checkpoint": (UI.CONTROLNETS_WITH_NONE(),),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(clip_vision, canny_checkpoint, depth_checkpoint, recolor_checkpoint, sketch_checkpoint,
                    custom_checkpoint):
        return {
            UI.F_CLIP_VISION_CHECKPOINT: clip_vision,
            UI.F_CANNY_CHECKPOINT: canny_checkpoint,
            UI.F_DEPTH_CHECKPOINT: depth_checkpoint,
            UI.F_RECOLOR_CHECKPOINT: recolor_checkpoint,
            UI.F_SKETCH_CHECKPOINT: sketch_checkpoint,
            UI.F_CUSTOM_CHECKPOINT: custom_checkpoint,
        }

    def get(self, clip_vision, canny_checkpoint, depth_checkpoint, recolor_checkpoint, sketch_checkpoint,
            custom_checkpoint, data=None):
        if data is None:
            data = {}

        data[UI.S_CONTROLNET_MODELS] = self.create_dict(
            clip_vision,
            canny_checkpoint,
            depth_checkpoint,
            recolor_checkpoint,
            sketch_checkpoint,
            custom_checkpoint,
        )

        return (data,)

```
