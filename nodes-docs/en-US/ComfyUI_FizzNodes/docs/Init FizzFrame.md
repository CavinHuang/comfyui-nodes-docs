---
tags:
- AnimationScheduling
- Frame
---

# Init Node Frame 📅🅕🅝
## Documentation
- Class name: `Init FizzFrame`
- Category: `FizzNodes 📅🅕🅝/FrameNodes`
- Output node: `False`

The Init FizzFrame node is designed to initialize the frame environment for further operations, setting up a foundational structure for managing and manipulating frame data within the FizzNodes framework.
## Input types
### Required
- **`frame`**
    - The 'frame' parameter is crucial as it serves as the primary identifier for the frame being initialized, dictating the starting point for frame-related operations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`positive_text`**
    - The 'positive_text' parameter allows for the specification of positive aspects or attributes associated with the frame, contributing to the frame's overall positive context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`negative_text`**
    - The 'negative_text' parameter enables the inclusion of negative aspects or attributes for the frame, adding to the frame's overall negative context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`general_positive`**
    - This parameter specifies general positive context that can be applied across frames, enhancing the positive aspect of the frame environment.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`general_negative`**
    - Similar to 'general_positive', this parameter adds a general negative context applicable across frames, contributing to the frame environment's negative aspect.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`previous_frame`**
    - The 'previous_frame' parameter is used to reference a prior frame, allowing for the continuation or modification of its context in the current frame initialization.
    - Comfy dtype: `FIZZFRAME`
    - Python dtype: `FIZZFRAME`
- **`clip`**
    - The 'clip' parameter is intended for including CLIP model information, which can be utilized for further processing or conditioning of the frame data.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
## Output types
- **`fizzframe`**
    - Comfy dtype: `FIZZFRAME`
    - Returns a FizzFrame object, representing the initialized frame with its specified attributes and contexts.
    - Python dtype: `FIZZFRAME`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Provides conditioning information derived from the frame's positive and negative texts, facilitating further contextual processing.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InitNodeFrame:
    def __init__(self):
        self.frames = {}
        self.thisFrame = {}

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "frame": ("INT", {"default": 0, "min": 0}),
                "positive_text": ("STRING", {"multiline": True}),
            },
            "optional": {
                "negative_text": ("STRING", {"multiline": True}),
                "general_positive": ("STRING", {"multiline": True}),
                "general_negative": ("STRING", {"multiline": True}),
                "previous_frame": ("FIZZFRAME", {"forceInput": True}),
                "clip": ("CLIP",),
            }
        }
    RETURN_TYPES = ("FIZZFRAME","CONDITIONING","CONDITIONING",)
    FUNCTION = "create_frame"

    CATEGORY = "FizzNodes 📅🅕🅝/FrameNodes"

    def create_frame(self, frame, positive_text, negative_text=None, general_positive=None, general_negative=None, previous_frame=None, clip=None):
        new_frame = {
            "positive_text": positive_text,
            "negative_text": negative_text,
        }

        if previous_frame:
            prev_frame = previous_frame.thisFrame
            new_frame["general_positive"] = prev_frame["general_positive"]
            new_frame["general_negative"] = prev_frame["general_negative"]
            new_frame["clip"] = prev_frame["clip"]
            self.frames = previous_frame.frames

        if general_positive:
            new_frame["general_positive"] = general_positive
        
        if general_negative:
            new_frame["general_negative"] = general_negative

        new_positive_text = f"{positive_text}, {new_frame['general_positive']}"
        new_negative_text = f"{negative_text}, {new_frame['general_negative']}"

        if clip:
            new_frame["clip"] = clip 

        pos_tokens = new_frame["clip"].tokenize(new_positive_text)        
        pos_cond, pos_pooled = new_frame["clip"].encode_from_tokens(pos_tokens, return_pooled=True)
        new_frame["pos_conditioning"] = {"cond": pos_cond, "pooled": pos_pooled}

        neg_tokens = new_frame["clip"].tokenize(new_negative_text)
        neg_cond, neg_pooled = new_frame["clip"].encode_from_tokens(neg_tokens, return_pooled=True)
        new_frame["neg_conditioning"] = {"cond": neg_cond, "pooled": neg_pooled}

        self.frames[frame] = new_frame
        self.thisFrame = new_frame

        return (self, [[pos_cond, {"pooled_output": pos_pooled}]], [[neg_cond, {"pooled_output": neg_pooled}]])

```
