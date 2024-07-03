
# Documentation
- Class name: concat
- Category: klinter
- Output node: False

concat节点设计用于连接字符串，可能包括一个可选的额外字符串，遵循特定的指导原则。它抽象了字符串连接的过程，确保操作遵守预定义的格式规则，例如在连接的字符串之间添加空格以提高可读性和连贯性。

# Input types
## Required
- string_a
    - 要连接的主要字符串。它作为基础字符串，其他字符串将附加到它上面。
    - Comfy dtype: STRING
    - Python dtype: str
- string_b
    - 要连接到主要字符串的第二个字符串，用于增强基本内容。
    - Comfy dtype: STRING
    - Python dtype: str
- string_c
    - 一个可选的第三个字符串，可以连接到主要和第二个字符串上，为连接过程提供额外的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 连接最多三个字符串的结果，非空字符串之间可能添加可选的空格以确保适当的格式。
    - Comfy dtype: STRING
    - Python dtype: str


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
