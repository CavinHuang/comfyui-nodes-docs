---
tags:
- AnimationScheduling
- Frame
- Keyframe
---

# Keyframe Keys To Batch Keys 📅🅕🅝
## Documentation
- Class name: `convertKeyframeKeysToBatchKeys`
- Category: `FizzNodes 📅🅕🅝/HelperNodes`
- Output node: `False`

The `convertKeyframeKeysToBatchKeys` node is designed to transform individual frame keys into a format suitable for batch processing, specifically by calculating a new key value that aligns with the batch's indexing requirements. This transformation facilitates the integration of frame-specific data into batch-oriented workflows, ensuring that each frame's data is correctly positioned within the batch structure.
## Input types
### Required
- **`input`**
    - Represents the individual frame key to be transformed. This parameter is crucial for identifying the specific frame whose data needs to be integrated into a batch process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_latents`**
    - Specifies the total number of latent variables or elements in the batch. This parameter is essential for correctly calculating the new key value, ensuring that the frame's data aligns with the batch's indexing structure.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The transformed key value, ready for use in batch processing. This output is critical for aligning the frame's data with the batch's indexing requirements, facilitating efficient batch operations.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class convertKeyframeKeysToBatchKeys:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input": ("INT", {"forceInput": True, "default": 0}),
                "num_latents": ("INT", {"default": 16}),
            }
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "concat"

    CATEGORY = "FizzNodes 📅🅕🅝/HelperNodes"

    def concat(self, input, num_latents):
        c = input * num_latents -1
        return (c,)

```
