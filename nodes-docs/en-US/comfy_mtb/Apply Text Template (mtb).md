# Apply Text Template (mtb)
## Documentation
- Class name: `Apply Text Template (mtb)`
- Category: `mtb/utils`
- Output node: `False`

This node is designed for dynamic string interpolation, allowing users to insert variables into a template string. It provides a flexible way to generate customized text outputs by replacing placeholders within a template with actual values.
## Input types
### Required
- **`template`**
    - The template string with placeholders for variables, which will be dynamically replaced with actual values during execution. This parameter is essential for defining the structure and content of the output text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The resulting string after all placeholders in the template have been replaced with their corresponding values.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_ApplyTextTemplate:
    """
    Experimental node to interpolate strings from inputs.

    Interpolation just requires {}, for instance:

    Some string {var_1} and {var_2}
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "template": ("STRING", {"default": "", "multiline": True}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("string",)
    CATEGORY = "mtb/utils"
    FUNCTION = "execute"

    def execute(self, *, template: str, **kwargs):
        res = f"{template}"
        for k, v in kwargs.items():
            res = res.replace(f"{{{k}}}", f"{v}")

        return (res,)

```
