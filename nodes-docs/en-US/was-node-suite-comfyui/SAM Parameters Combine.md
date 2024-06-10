---
tags:
- SAM
---

# SAM Parameters Combine
## Documentation
- Class name: `SAM Parameters Combine`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node combines the parameters of two SAM (Spatial Attention Model) operations, effectively merging their points and labels into a single set. It's designed to facilitate the application of multiple SAM operations on a single image or dataset by consolidating their parameters for streamlined processing.
## Input types
### Required
- **`sam_parameters_a`**
    - The first set of SAM parameters to be combined. It includes points and labels that specify regions of interest and their corresponding labels in an image.
    - Comfy dtype: `SAM_PARAMETERS`
    - Python dtype: `Dict[str, np.ndarray]`
- **`sam_parameters_b`**
    - The second set of SAM parameters to be combined. Similar to the first, it includes points and labels for regions of interest in an image.
    - Comfy dtype: `SAM_PARAMETERS`
    - Python dtype: `Dict[str, np.ndarray]`
## Output types
- **`sam_parameters`**
    - Comfy dtype: `SAM_PARAMETERS`
    - The combined SAM parameters, including points and labels from both input sets, ready for use in subsequent SAM operations.
    - Python dtype: `Dict[str, np.ndarray]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_SAM_Combine_Parameters:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "sam_parameters_a": ("SAM_PARAMETERS",),
                "sam_parameters_b": ("SAM_PARAMETERS",),
            }
        }

    RETURN_TYPES = ("SAM_PARAMETERS",)
    FUNCTION = "sam_combine_parameters"

    CATEGORY = "WAS Suite/Image/Masking"

    def sam_combine_parameters(self, sam_parameters_a, sam_parameters_b):
        parameters = {
            "points": np.concatenate(
                (sam_parameters_a["points"],
                sam_parameters_b["points"]),
                axis=0
            ),
            "labels": np.concatenate(
                (sam_parameters_a["labels"],
                sam_parameters_b["labels"])
            )
        }

        return (parameters,)

```
