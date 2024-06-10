---
tags:
- Conditioning
---

# Conditioning Parameters v2
## Documentation
- Class name: `SeargeConditioningParameters`
- Category: `Searge/UI/Inputs`
- Output node: `False`

The SeargeConditioningParameters node is designed to manage and configure the conditioning parameters for image generation processes. It focuses on adjusting various scales and scores that influence the conditioning of positive and negative prompts, as well as refining and targeting specific aspects of the generated images. This node plays a crucial role in fine-tuning the aesthetic and thematic direction of the output.
## Input types
### Required
- **`base_conditioning_scale`**
    - Specifies the scale for base conditioning, affecting the foundational aspects of image generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_conditioning_scale`**
    - Determines the scale for refiner conditioning, influencing the refinement process of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`target_conditioning_scale`**
    - Sets the scale for target conditioning, targeting specific attributes or qualities in the image generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`positive_conditioning_scale`**
    - Adjusts the scale for positive conditioning, enhancing desired features or themes in the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`negative_conditioning_scale`**
    - Modifies the scale for negative conditioning, reducing or avoiding undesired aspects in the images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`positive_aesthetic_score`**
    - Defines the aesthetic score for positive prompts, influencing the visual appeal of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`negative_aesthetic_score`**
    - Sets the aesthetic score for negative prompts, impacting the avoidance of certain visual elements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`precondition_mode`**
    - Specifies the mode of preconditioning, determining how preconditions are applied to the image generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`precondition_strength`**
    - Determines the strength of the preconditioning, affecting the intensity of applied preconditions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`data`**
    - unknown
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `unknown`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - Returns a dictionary of updated conditioning parameters, encapsulating all adjustments made to scales, scores, and modes for image generation.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeConditioningParameters:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "base_conditioning_scale": ("FLOAT", {"default": 2.0, "min": 0.5, "max": 4.0, "step": 0.25},),
                "refiner_conditioning_scale": ("FLOAT", {"default": 2.0, "min": 0.5, "max": 4.0, "step": 0.25},),
                "target_conditioning_scale": ("FLOAT", {"default": 2.0, "min": 0.5, "max": 4.0, "step": 0.25},),
                "positive_conditioning_scale": ("FLOAT", {"default": 1.5, "min": 0.25, "max": 2.0, "step": 0.25},),
                "negative_conditioning_scale": ("FLOAT", {"default": 0.75, "min": 0.25, "max": 2.0, "step": 0.25},),
                "positive_aesthetic_score": ("FLOAT", {"default": 6.0, "min": 0.5, "max": 10.0, "step": 0.5},),
                "negative_aesthetic_score": ("FLOAT", {"default": 2.5, "min": 0.5, "max": 10.0, "step": 0.5},),
                "precondition_mode": (UI.PRECONDITION_MODES,),
                "precondition_strength": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.05},),
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
    def create_dict(base_conditioning_scale, refiner_conditioning_scale, target_conditioning_scale,
                    positive_conditioning_scale, negative_conditioning_scale,
                    positive_aesthetic_score, negative_aesthetic_score,
                    precondition_mode, precondition_strength):
        return {
            UI.F_BASE_CONDITIONING_SCALE: round(base_conditioning_scale, 3),
            UI.F_REFINER_CONDITIONING_SCALE: round(refiner_conditioning_scale, 3),
            UI.F_TARGET_CONDITIONING_SCALE: round(target_conditioning_scale, 3),
            UI.F_POSITIVE_CONDITIONING_SCALE: round(positive_conditioning_scale, 3),
            UI.F_NEGATIVE_CONDITIONING_SCALE: round(negative_conditioning_scale, 3),
            UI.F_POSITIVE_AESTHETIC_SCORE: round(positive_aesthetic_score, 3),
            UI.F_NEGATIVE_AESTHETIC_SCORE: round(negative_aesthetic_score, 3),
            UI.F_PRECONDITION_MODE: precondition_mode,
            UI.F_PRECONDITION_STRENGTH: round(precondition_strength, 3),
        }

    def get(self, base_conditioning_scale, refiner_conditioning_scale, target_conditioning_scale,
            positive_conditioning_scale, negative_conditioning_scale,
            positive_aesthetic_score, negative_aesthetic_score,
            precondition_mode, precondition_strength, data=None):
        if data is None:
            data = {}

        data[UI.S_CONDITIONING_PARAMETERS] = self.create_dict(
            base_conditioning_scale,
            refiner_conditioning_scale,
            target_conditioning_scale,
            positive_conditioning_scale,
            negative_conditioning_scale,
            positive_aesthetic_score,
            negative_aesthetic_score,
            precondition_mode,
            precondition_strength,
        )

        return (data,)

```
