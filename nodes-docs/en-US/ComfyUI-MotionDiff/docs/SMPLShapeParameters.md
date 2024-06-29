---
tags:
- SMPLModel
---

# SMPL Shape Parameters
## Documentation
- Class name: `SMPLShapeParameters`
- Category: `MotionDiff/smpl`
- Output node: `False`

The SMPLShapeParameters node is designed to adjust the shape parameters of an SMPL model based on various anthropometric measurements. It encapsulates the functionality to modify an SMPL model's dimensions, such as size, thickness, and proportions of body parts, to achieve a desired appearance or match specific physical characteristics.
## Input types
### Required
- **`smpl`**
    - The SMPL model to be modified. This parameter is crucial as it serves as the base model whose shape parameters will be adjusted according to the provided measurements.
    - Comfy dtype: `SMPL`
    - Python dtype: `dict`
- **`size`**
    - Represents the overall size of the SMPL model, affecting its scale.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`thickness`**
    - Controls the thickness of the SMPL model, influencing its volume and bulk.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upper_body_height`**
    - Adjusts the height of the upper body, altering the torso length.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lower_body_height`**
    - Modifies the height of the lower body, affecting the leg length.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`muscle_mass`**
    - Determines the muscle mass of the SMPL model, impacting its muscular definition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`legs`**
    - Adjusts the proportions of the legs, influencing their shape and length.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`chest`**
    - Modifies the chest size, affecting the breadth and appearance of the torso.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`waist_height`**
    - Controls the height of the waist, influencing the body's overall proportions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`waist_width`**
    - Adjusts the width of the waist, affecting the model's silhouette.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`arms`**
    - Modifies the length and shape of the arms, influencing their appearance and proportion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`smpl`**
    - Comfy dtype: `SMPL`
    - The modified SMPL model with updated shape parameters reflecting the input measurements.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SMPLShapeParameters:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl": ("SMPL", ),
                "size": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "thickness": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "upper_body_height": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "lower_body_height": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "muscle_mass": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "legs": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "chest": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "waist_height": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "waist_width": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
                "arms": ("FLOAT", {"default": 0, "min": -100, "max": 100, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("SMPL",)
    CATEGORY = "MotionDiff/smpl"
    FUNCTION = "setparams"
    def setparams(self, smpl, size, thickness, upper_body_height, lower_body_height, muscle_mass, legs, chest, waist_height, waist_width, arms):
        shape_parameters = [size, thickness, upper_body_height, lower_body_height, muscle_mass, legs, chest, waist_height, waist_width, arms]
        smpl[2]["shape_parameters"] = shape_parameters
        return (smpl,)

```
