---
tags:
- Concatenate
- Text
---

# String Concatenate 📅🅕🅝
## Documentation
- Class name: `StringConcatenate`
- Category: `FizzNodes 📅🅕🅝/FrameNodes`
- Output node: `False`

The `StringConcatenate` node is designed to merge multiple pairs of text and frame identifiers into a single string representation. This node is crucial for scenarios requiring the aggregation of textual data associated with specific frames, facilitating the creation of a structured text list that maps frame identifiers to their corresponding text.
## Input types
### Required
- **`text_a`**
    - `text_a` is the initial piece of text to be concatenated. Its inclusion is essential for starting the construction of the text list, serving as the foundation upon which additional text-frame pairs can be appended.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`frame_a`**
    - `frame_a` represents the frame identifier associated with `text_a`. It is crucial for mapping `text_a` to a specific frame in the resulting text list, thereby organizing the text in a structured manner.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`text_b`**
    - `text_b` is the second piece of text to be concatenated. It is appended to `text_a`, contributing to the expansion of the text list with more text-frame mappings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`frame_b`**
    - `frame_b` represents the frame identifier associated with `text_b`. Its inclusion further structures the text list by mapping `text_b` to another specific frame.
    - Comfy dtype: `INT`
    - Python dtype: `str`
### Optional
- **`text_c`**
    - `text_c` is an optional third piece of text that can be concatenated if provided. It allows for the inclusion of additional text-frame pairs, enhancing the comprehensiveness of the text list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`frame_c`**
    - `frame_c`, if provided, represents the frame identifier for `text_c`. Including this parameter allows for the mapping of `text_c` to a specific frame, further enriching the text list.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`text_d`**
    - `text_d` is an optional fourth piece of text for concatenation. Its provision enables the extension of the text list with more detailed text-frame associations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`frame_d`**
    - `frame_d` represents the frame identifier for `text_d` if provided. It plays a key role in associating `text_d` with a specific frame, adding more structure to the text list.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`text_e`**
    - `text_e` is an optional fifth piece of text for concatenation. Including this text allows for a broader representation of text-frame pairs in the text list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`frame_e`**
    - `frame_e` represents the frame identifier for `text_e` if provided. It is important for mapping `text_e` to a specific frame, contributing to the detailed structuring of the text list.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`text_f`**
    - `text_f` is an optional sixth piece of text for concatenation. Its inclusion further expands the text list with additional text-frame mappings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`frame_f`**
    - `frame_f` represents the frame identifier for `text_f` if provided. Including this parameter enhances the text list by associating `text_f` with a specific frame.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`text_g`**
    - `text_g` is an optional seventh piece of text for concatenation. It allows for the inclusion of more text-frame pairs, maximizing the comprehensiveness of the text list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`frame_g`**
    - `frame_g` represents the frame identifier for `text_g` if provided. Its inclusion is crucial for mapping `text_g` to a specific frame, thereby completing the structured text list.
    - Comfy dtype: `INT`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a structured string that maps frame identifiers to their corresponding texts. This output is significant as it provides a comprehensive and organized representation of text associated with specific frames, facilitating further processing or analysis.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringConcatenate:
    def __init__(self):
        pass

    defaultPrompt = """"0" :"",
    "12" :"",
    "24" :"",
    "36" :"",
    "48" :"",
    "60" :"",
    "72" :"",
    "84" :"",
    "96" :"",
    "108" :"",
    "120" :""
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text_a": ("STRING", {"forceInput": True, "multiline": True, "default": ""}),
                "frame_a": ("INT", {"default": 0}),
                "text_b": ("STRING", {"forceInput": True, "multiline": True, "default": ""}),
                "frame_b": ("INT", {"default": 12})
            },
            "optional": {
                "text_c": ("STRING", {"forceInput": True, "multiline": True, "default": ""}),
                "frame_c": ("INT", {"default": 24}),
                "text_d": ("STRING", {"forceInput": True, "multiline": True, "default": ""}),
                "frame_d": ("INT", {"default": 36}),
                "text_e": ("STRING", {"forceInput": True, "multiline": True, "default": ""}),
                "frame_e": ("INT", {"default": 48}),
                "text_f": ("STRING", {"forceInput": True, "multiline": True, "default": ""}),
                "frame_f": ("INT", {"default": 60}),
                "text_g": ("STRING", {"forceInput": True, "multiline": True, "default": ""}),
                "frame_g": ("INT", {"default": 72})
            }
        }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "frame_concatenate_list"

    CATEGORY = "FizzNodes 📅🅕🅝/FrameNodes"

    def frame_concatenate_list(self, text_a, frame_a, text_b, frame_b, text_c=None, frame_c=None, text_d=None,
                               frame_d=None, text_e=None, frame_e=None, text_f=None, frame_f=None, text_g=None,
                               frame_g=None):

        text_a = text_a.replace('\n', '')
        text_b = text_b.replace('\n', '')
        text_c = text_c.replace('\n', '') if text_c is not None else None
        text_d = text_d.replace('\n', '') if text_d is not None else None
        text_e = text_e.replace('\n', '') if text_e is not None else None
        text_f = text_f.replace('\n', '') if text_f is not None else None
        text_g = text_g.replace('\n', '') if text_g is not None else None

        text_list = f'"{frame_a}": "{text_a}",'
        text_list += f'"{frame_b}": "{text_b}",'

        if frame_c is not None and text_c is not None:
            text_list += f'"{frame_c}": "{text_c}",'

        if frame_d is not None and text_d is not None:
            text_list += f'"{frame_d}": "{text_d}",'

        if frame_e is not None and text_e is not None:
            text_list += f'"{frame_e}": "{text_e}",'

        if frame_f is not None and text_f is not None:
            text_list += f'"{frame_f}": "{text_f}",'

        if frame_g is not None and text_g is not None:
            text_list += f'"{frame_g}": "{text_g}",'

        return (text_list,)

```
