---
tags:
- AnimationScheduling
- Frame
---

# Node Frame 📅🅕🅝
## Documentation
- Class name: `FizzFrame`
- Category: `FizzNodes 📅🅕🅝/FrameNodes`
- Output node: `False`

The FizzFrame node is designed for creating and managing frames within a narrative or sequence, allowing for the dynamic generation of content based on positive and negative textual inputs. It leverages conditioning and pooling techniques to encode textual information, facilitating the creation of nuanced and contextually relevant frames.
## Input types
### Required
- **`frame`**
    - Specifies the identifier for the frame being created or manipulated. It serves as a key to organize and access frames within the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`previous_frame`**
    - An optional reference to a previous frame, allowing for the inheritance of certain attributes and ensuring continuity within the sequence.
    - Comfy dtype: `FIZZFRAME`
    - Python dtype: `FizzFrame`
- **`positive_text`**
    - The primary textual content intended to convey a positive aspect or sentiment within the frame. It forms the basis of the frame's positive conditioning.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`negative_text`**
    - Optional textual content intended to convey a negative aspect or sentiment within the frame. It complements the positive text to provide a balanced perspective.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`fizzframe`**
    - Comfy dtype: `FIZZFRAME`
    - The newly created or updated frame, encapsulating the positive and negative conditioning along with any inherited or specified attributes.
    - Python dtype: `FizzFrame`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The conditioning information derived from the textual inputs, including both the condition and pooled output for positive and negative texts.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NodeFrame:

    def __init__(self):
        self.frames = {}
        self.thisFrame = {}

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "frame": ("INT", {"default": 0, "min": 0}),
                "previous_frame": ("FIZZFRAME", {"forceInput": True}),
                "positive_text": ("STRING", {"multiline": True}),
            },
            "optional": {
                "negative_text": ("STRING", {"multiline": True}),
            }
        }
    RETURN_TYPES = ("FIZZFRAME","CONDITIONING","CONDITIONING",)
    FUNCTION = "create_frame"

    CATEGORY = "FizzNodes 📅🅕🅝/FrameNodes"

    def create_frame(self, frame, previous_frame, positive_text, negative_text=None):
        self.frames = previous_frame.frames
        prev_frame = previous_frame.thisFrame
        
        new_positive_text = f"{positive_text}, {prev_frame['general_positive']}"
        new_negative_text = f"{negative_text}, {prev_frame['general_negative']}"

        pos_tokens = prev_frame["clip"].tokenize(new_positive_text)        
        pos_cond, pos_pooled = prev_frame["clip"].encode_from_tokens(pos_tokens, return_pooled=True)

        neg_tokens = prev_frame["clip"].tokenize(new_negative_text)
        neg_cond, neg_pooled = prev_frame["clip"].encode_from_tokens(neg_tokens, return_pooled=True)

        new_frame = {
            "positive_text": positive_text,
            "negative_text": negative_text,
            "general_positive": prev_frame["general_positive"],
            "general_negative": prev_frame["general_negative"],
            "clip": prev_frame["clip"],
            "pos_conditioning": {"cond": pos_cond, "pooled": pos_pooled},
            "neg_conditioning": {"cond": neg_cond, "pooled": neg_pooled},
        }
        self.thisFrame = new_frame
        self.frames[frame] = new_frame

        return (self, [[pos_cond, {"pooled_output": pos_pooled}]], [[neg_cond, {"pooled_output": neg_pooled}]])

```
