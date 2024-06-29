---
tags:
- String
- Text
---

# Any To String (mtb)
## Documentation
- Class name: `Any To String (mtb)`
- Category: `mtb/converters`
- Output node: `False`

This node is designed to convert various types of inputs into their string representations, aiming to provide a versatile solution for handling and displaying different data types as strings.
## Input types
### Required
- **`input`**
    - Accepts a wide range of input types, including strings, tensors, images, numpy arrays, and dictionaries, converting them into a string format that describes their characteristics.
    - Comfy dtype: `*`
    - Python dtype: `Union[str, torch.Tensor, PIL.Image.Image, np.ndarray, dict]`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs a string representation of the input, detailing its type and key characteristics.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_AnyToString:
    """Tries to take any input and convert it to a string."""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"input": ("*")},
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "do_str"
    CATEGORY = "mtb/converters"

    def do_str(self, input):
        if isinstance(input, str):
            return (input,)
        elif isinstance(input, torch.Tensor):
            return (f"Tensor of shape {input.shape} and dtype {input.dtype}",)
        elif isinstance(input, Image.Image):
            return (f"PIL Image of size {input.size} and mode {input.mode}",)
        elif isinstance(input, np.ndarray):
            return (
                f"Numpy array of shape {input.shape} and dtype {input.dtype}",
            )

        elif isinstance(input, dict):
            return (
                f"Dictionary of {len(input)} items, with keys {input.keys()}",
            )

        else:
            log.debug(f"Falling back to string conversion of {input}")
            return (str(input),)

```
