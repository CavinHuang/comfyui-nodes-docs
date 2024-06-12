---
tags:
- SAM
---

# SAM Parameters
## Documentation
- Class name: `SAM Parameters`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The SAM Parameters node is designed to generate and manage parameters for segmentation and masking operations within the WAS Suite's Image/Masking category. It abstracts the complexity of parameter configuration, allowing users to specify points and labels for segmentation tasks.
## Input types
### Required
- **`points`**
    - Defines the coordinates for segmentation points in a string format, which are crucial for determining the areas of interest within an image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`labels`**
    - Specifies the labels associated with each point, playing a key role in the segmentation process by categorizing different regions of interest.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`sam_parameters`**
    - Comfy dtype: `SAM_PARAMETERS`
    - A structured set of parameters including points and labels, ready for use in segmentation and masking operations.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_SAM_Parameters:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "points": ("STRING", {"default": "[128, 128]; [0, 0]", "multiline": False}),
                "labels": ("STRING", {"default": "[1, 0]", "multiline": False}),
            }
        }

    RETURN_TYPES = ("SAM_PARAMETERS",)
    FUNCTION = "sam_parameters"

    CATEGORY = "WAS Suite/Image/Masking"

    def sam_parameters(self, points, labels):
        parameters = {
            "points": np.asarray(np.matrix(points)),
            "labels": np.array(np.matrix(labels))[0]
        }

        return (parameters,)

```
