---
tags:
- Concatenate
---

# Concat String (Klinter)
## Documentation
- Class name: `concat`
- Category: `klinter`
- Output node: `False`

The `concat` node is designed to concatenate strings, potentially including an optional additional string, following specific guidelines. It abstracts the process of string concatenation, ensuring that the operation adheres to predefined formatting rules, such as adding spaces between concatenated strings for readability and coherence.
## Input types
### Required
- **`string_a`**
    - The primary string to be concatenated. It serves as the base string to which other strings are appended.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`string_b`**
    - The second string to be concatenated to the primary string, enhancing the base content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`string_c`**
    - An optional third string that can be concatenated to the primary and second strings, providing additional flexibility in the concatenation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The result of concatenating up to three strings, with optional spaces between non-empty strings for proper formatting.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class concat:
    """Class for concatenating strings with optional additional string, following klinter guidelines."""

    @classmethod
    def INPUT_TYPES(cls):
        """Defines the input types for the concatenation operation."""
        return {
            "required": {
                "string_a": ("STRING", {"forceInput": True, "default": "", "multiline": True}),
                "string_b": ("STRING", {"forceInput": True, "default": "", "multiline": True}),
                # Assuming string_c remains optional as indicated
                "string_c": ("STRING", {"default": "", "multiline": True}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "concat"
    CATEGORY = "klinter"

    def concat(self, string_a, string_b, string_c=""):
        """Concatenates up to three strings, adding a space between non-empty strings."""
        # Ensure each non-empty string ends with a space for proper concatenation
        string_a_with_space = f"{string_a} " if string_a else ""
        string_b_with_space = f"{string_b} " if string_b else ""
        string_c_with_space = f"{string_c} " if string_c else ""

        # Concatenate the strings and remove any trailing space
        concatenated_string = (string_a_with_space + string_b_with_space + string_c_with_space).rstrip()

        return (concatenated_string,)

```
