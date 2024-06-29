---
tags:
- RandomGeneration
- Randomization
---

# Text Shuffle
## Documentation
- Class name: `Text Shuffle`
- Category: `WAS Suite/Text/Operations`
- Output node: `False`

The `Text Shuffle` node is designed to randomly shuffle the segments of a given text string based on a specified separator. This functionality allows for the creation of varied and unpredictable text sequences, which can be useful in data augmentation, testing, or creating randomized outputs for creative purposes.
## Input types
### Required
- **`text`**
    - The `text` parameter is the input text string to be shuffled. The shuffling process rearranges the segments of this text, creating a new, randomized sequence.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`separator`**
    - The `separator` parameter defines the character or string that delimits the segments of the input text to be shuffled. This allows for flexible segmentation based on the specific needs of the text being processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - The `seed` parameter sets the seed for the random number generator, ensuring reproducibility of the shuffle operation. This is useful for maintaining consistency across different runs or experiments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a new text string with its segments shuffled in a random order, based on the specified separator.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Shuffle:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "separator": ("STRING", {"default": ',', "multiline": False}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "shuffle"

    CATEGORY = "WAS Suite/Text/Operations"

    def shuffle(self, text, separator, seed):

        if seed is not None:
            random.seed(seed)

        text_list = text.split(separator)
        random.shuffle(text_list)
        new_text = separator.join(text_list)

        return (new_text, )

```
