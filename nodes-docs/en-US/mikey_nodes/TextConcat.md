---
tags:
- Concatenate
- Text
---

# Text Concat (Mikey)
## Documentation
- Class name: `TextConcat`
- Category: `Mikey/Text`
- Output node: `False`

The TextConcat node is designed to merge multiple text inputs into a single string, offering the flexibility to specify a delimiter for the concatenation. This functionality is particularly useful for combining pieces of text in a customizable manner.
## Input types
### Required
- **`delimiter`**
    - Specifies the character or string used to separate the concatenated texts. Its presence allows for customizable spacing or formatting between the merged text inputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`text1`**
    - Represents the first optional text input to be concatenated. If provided, it contributes to the final merged string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - Represents the second optional text input to be concatenated. If provided, it contributes to the final merged string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text3`**
    - Represents the third optional text input to be concatenated. If provided, it contributes to the final merged string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text4`**
    - Represents the fourth optional text input to be concatenated. If provided, it contributes to the final merged string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text5`**
    - Represents the fifth optional text input to be concatenated. If provided, it contributes to the final merged string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a single string that results from the concatenation of the provided text inputs, separated by the specified delimiter.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Prompt With Style V3](../../mikey_nodes/Nodes/Prompt With Style V3.md)



## Source code
```python
class TextConcat:
    # takes 5 text inputs and concatenates them into a single string
    # with an option for delimiter
    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'delimiter': ('STRING', {'default': ' '})},
                'optional': {'text1': ('STRING', {'default': ''}),
                             'text2': ('STRING', {'default': ''}),
                             'text3': ('STRING', {'default': ''}),
                             'text4': ('STRING', {'default': ''}),
                             'text5': ('STRING', {'default': ''}),
                             }}

    RETURN_TYPES = ('STRING',)
    FUNCTION = 'concat'
    CATEGORY = 'Mikey/Text'

    def concat(self, delimiter, text1, text2, text3, text4, text5):
        # search and replace
        # concatenate the strings
        # text values might be none
        texts = []
        if text1:
            texts.append(text1)
        if text2:
            texts.append(text2)
        if text3:
            texts.append(text3)
        if text4:
            texts.append(text4)
        if text5:
            texts.append(text5)
        text = delimiter.join(texts)
        return (text,)

```
