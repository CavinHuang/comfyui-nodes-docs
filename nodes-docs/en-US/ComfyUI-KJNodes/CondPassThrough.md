# CondPassThrough
## Documentation
- Class name: `CondPassThrough`
- Category: `KJNodes/misc`
- Output node: `False`

The CondPassThrough node is designed to facilitate the direct passage of positive and negative conditioning data. It serves as a workaround to enable bypassing inputs in scenarios where the Set node's limitations would otherwise prevent such an operation.
## Input types
### Required
- **`positive`**
    - Represents the positive conditioning data to be passed through. It plays a crucial role in maintaining the integrity of the data flow, especially in bypass scenarios.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`negative`**
    - Represents the negative conditioning data to be passed through. It ensures that negative conditioning data can also be seamlessly integrated into the workflow without alteration.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Outputs the unmodified positive conditioning data, ensuring its availability for subsequent processing steps.
    - Python dtype: `tuple`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Outputs the unmodified negative conditioning data, maintaining its original form for further use.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CondPassThrough:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("CONDITIONING", ),
                "negative": ("CONDITIONING", ),
            }, 
    }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING",)
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "passthrough"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
    Simply passes through the positive and negative conditioning,
    workaround for Set node not allowing bypassed inputs.
"""

    def passthrough(self, positive, negative):
        return (positive, negative,)

```
