---
tags:
- DataConversion
- DataTypeConversion
- Integer
- NumericConversion
---

# Display Int (rgthree)
## Documentation
- Class name: `Display Int (rgthree)`
- Category: `rgthree`
- Output node: `True`

The Display Int node is designed to showcase integer values within the user interface. It serves as a straightforward mechanism for visually representing integer data, making it easier for users to interpret and understand numerical information.
## Input types
### Required
- **`input`**
    - This parameter represents the integer value to be displayed. It is essential for the node's operation as it determines the numerical data that will be visualized in the user interface.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`ui`**
    - This output parameter provides a user interface element that displays the integer value passed to the node.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeDisplayInt:
  """Old DisplayInt node.

  Can be ported over to DisplayAny if https://github.com/comfyanonymous/ComfyUI/issues/1527 fixed.
  """

  NAME = get_name('Display Int')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(s):
    return {
      "required": {
        "input": ("INT", {
          "forceInput": True
        }),
      },
    }

  RETURN_TYPES = ()
  FUNCTION = "main"
  OUTPUT_NODE = True

  def main(self, input=None):
    return {"ui": {"text": (input,)}}

```
