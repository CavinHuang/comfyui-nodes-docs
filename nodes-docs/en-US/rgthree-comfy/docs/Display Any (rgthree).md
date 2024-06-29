---
tags:
- DataTypeAgnostic
- Debugging
---

# Display Any (rgthree)
## Documentation
- Class name: `Display Any (rgthree)`
- Category: `rgthree`
- Output node: `True`

The Display Any node is designed to display any type of data, handling various data formats and types gracefully. It attempts to serialize the input data into a JSON string for display, falling back to a simple string representation if serialization fails, thereby ensuring that any data can be visualized.
## Input types
### Required
- **`source`**
    - The 'source' parameter accepts any type of data, making this node highly versatile for displaying diverse data formats. It plays a crucial role in the node's ability to handle and visualize any input data, regardless of its complexity or type.
    - Comfy dtype: `*`
    - Python dtype: `AnyType`
## Output types
- **`ui`**
    - The 'ui' output parameter provides a user interface element, specifically a text display, that visualizes the input data. This allows for the easy display of any data type in a readable format.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeDisplayAny:
  """Display any data node."""

  NAME = get_name('Display Any')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "source": (any, {}),
      },
    }

  RETURN_TYPES = ()
  FUNCTION = "main"
  OUTPUT_NODE = True

  def main(self, source=None):
    value = 'None'
    if source is not None:
      try:
        value = json.dumps(source)
      except Exception:
        try:
          value = str(source)
        except Exception:
          value = 'source exists, but could not be serialized.'

    return {"ui": {"text": (value,)}}

```
