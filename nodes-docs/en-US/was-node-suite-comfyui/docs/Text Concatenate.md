---
tags:
- Concatenate
- Text
---

# Text Concatenate
## Documentation
- Class name: `Text Concatenate`
- Category: `WAS Suite/Text`
- Output node: `False`

The Text Concatenate node is designed to merge multiple text inputs into a single string, using a specified delimiter. It offers the option to clean up whitespace, ensuring that the concatenated result is tidy and adheres to the desired formatting.
## Input types
### Required
- **`delimiter`**
    - Specifies the character or string used to separate each text input in the concatenated result. It plays a crucial role in defining the structure and readability of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clean_whitespace`**
    - Determines whether leading and trailing whitespace should be removed from each text input before concatenation, ensuring a clean and consistent output format. This parameter should be provided as a boolean value.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
### Optional
- **`text_a`**
    - Accepts a text input as a string. This input is one of the strings to be concatenated, allowing for dynamic and flexible text merging.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_b`**
    - Accepts a text input as a string. This input is one of the strings to be concatenated, allowing for dynamic and flexible text merging.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_c`**
    - Accepts a text input as a string. This input is one of the strings to be concatenated, allowing for dynamic and flexible text merging.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_d`**
    - Accepts a text input as a string. This input is one of the strings to be concatenated, allowing for dynamic and flexible text merging.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The final string resulting from the concatenation of all provided text inputs, formatted according to the specified delimiter and whitespace cleaning settings.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)
    - [Text Concatenate](../../was-node-suite-comfyui/Nodes/Text Concatenate.md)
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - MileHighStyler
    - [CR Text Concatenate](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Text Concatenate.md)



## Source code
```python
class WAS_Text_Concatenate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "delimiter": ("STRING", {"default": ", "}),
                "clean_whitespace": (["true", "false"],),
            },
            "optional": {
                "text_a": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_b": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_c": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_d": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_concatenate"

    CATEGORY = "WAS Suite/Text"

    def text_concatenate(self, delimiter, clean_whitespace, **kwargs):
        text_inputs: list[str] = []

        # Handle special case where delimiter is "\n" (literal newline).
        if delimiter == "\\n":
            delimiter = "\n"

        # Iterate over the received inputs in sorted order.
        for k in sorted(kwargs.keys()):
            v = kwargs[k]

            # Only process string input ports.
            if isinstance(v, str):
                if clean_whitespace == "true":
                    # Remove leading and trailing whitespace around this input.
                    v = v.strip()

                # Only use this input if it's a non-empty string, since it
                # never makes sense to concatenate totally empty inputs.
                # NOTE: If whitespace cleanup is disabled, inputs containing
                # 100% whitespace will be treated as if it's a non-empty input.
                if v != "":
                    text_inputs.append(v)

        # Merge the inputs. Will always generate an output, even if empty.
        merged_text = delimiter.join(text_inputs)

        return (merged_text,)

```
