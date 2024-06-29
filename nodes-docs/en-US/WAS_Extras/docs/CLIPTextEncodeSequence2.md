---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# CLIP Text Encode Sequence (v2)
## Documentation
- Class name: `CLIPTextEncodeSequence2`
- Category: `conditioning`
- Output node: `False`

This node is designed to encode text inputs into a sequence of conditionings suitable for guiding generative models. It processes each line of the input text, optionally using an advanced encoding method if available, and organizes the encoded data into a structured sequence that can be utilized for conditional generation tasks.
## Input types
### Required
- **`clip`**
    - The CLIP model used for encoding the text. It plays a crucial role in transforming textual descriptions into a format that can be understood by generative models.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`token_normalization`**
    - Determines whether or not to normalize tokens during encoding, impacting the consistency and quality of the generated output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`weight_interpretation`**
    - Controls how the weights are interpreted during the encoding process, potentially altering the emphasis on different aspects of the input text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`cond_keyframes_type`**
    - Specifies the type of keyframe conditioning to apply, influencing how the encoded text is structured into a sequence for generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`frame_count`**
    - The total number of frames to generate, affecting the distribution of conditionings across the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - The input text to be encoded. It is processed line by line, with each line potentially representing a separate conditioning for the generative model.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning_sequence`**
    - Comfy dtype: `CONDITIONING`
    - The sequence of encoded conditionings derived from the input text, ready for use in guiding generative models.
    - Python dtype: `list`
- **`cond_keyframes`**
    - Comfy dtype: `INT`
    - The calculated keyframe conditionings based on the input parameters, providing a structured approach to sequence generation.
    - Python dtype: `list`
- **`frame_count`**
    - Comfy dtype: `INT`
    - The total number of frames that will be generated, reflecting the input parameter.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CLIPTextEncodeSequence2:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip": ("CLIP", ),
                "token_normalization": (["none", "mean", "length", "length+mean"],),
                "weight_interpretation": (["comfy", "A1111", "compel", "comfy++"],),
                "cond_keyframes_type": (["linear", "sinus", "sinus_inverted", "half_sinus", "half_sinus_inverted"],),
                "frame_count": ("INT", {"default": 100, "min": 1, "max": 1024, "step": 1}),
                "text": ("STRING", {"multiline": True, "default": '''A portrait of a rosebud
A portrait of a blooming rosebud
A portrait of a blooming rose
A portrait of a rose'''}),
            }
        }
        
    RETURN_TYPES = ("CONDITIONING", "INT", "INT")
    RETURN_NAMES = ("conditioning_sequence", "cond_keyframes", "frame_count")
    IS_LIST_OUTPUT = (True, True, False)

    FUNCTION = "encode"
    CATEGORY = "conditioning"

    def encode(self, clip, text, cond_keyframes_type, frame_count, token_normalization, weight_interpretation):
        text = text.strip()
        conditionings = []
        for line in text.splitlines():
            if USE_BLK:
                encoded = blk_adv.encode(clip=clip, text=line, token_normalization=token_normalization, weight_interpretation=weight_interpretation)
            else:
                encoded = CLIPTextEncode.encode(clip=clip, text=line)

            conditionings.append([encoded[0][0][0], encoded[0][0][1]])

        conditioning_count = len(conditionings)
        cond_keyframes = self.calculate_cond_keyframes(cond_keyframes_type, frame_count, conditioning_count)

        return (conditionings, cond_keyframes, frame_count)

    def calculate_cond_keyframes(self, type, frame_count, conditioning_count):
        if type == "linear":
            return np.linspace(frame_count // conditioning_count, frame_count, conditioning_count, dtype=int).tolist()

        elif type == "sinus":
            # Create a sinusoidal distribution
            t = np.linspace(0, np.pi, conditioning_count)
            sinus_values = np.sin(t) 
            # Normalize the sinusoidal values to 0-1 range
            normalized_values = (sinus_values - sinus_values.min()) / (sinus_values.max() - sinus_values.min())
            # Scale to frame count and shift to avoid starting at frame 0
            scaled_values = normalized_values * (frame_count - 1) + 1
            # Ensure unique keyframes by rounding and converting to integer
            unique_keyframes = np.round(scaled_values).astype(int)
            # Deduplicate while preserving order
            unique_keyframes = np.unique(unique_keyframes, return_index=True)[1]
            return sorted(unique_keyframes.tolist())
    
        elif type == "sinus_inverted":
            return (np.cos(np.linspace(0, np.pi, conditioning_count)) * (frame_count - 1) + 1).astype(int).tolist()

        elif type == "half_sinus":
            return (np.sin(np.linspace(0, np.pi / 2, conditioning_count)) * (frame_count - 1) + 1).astype(int).tolist()

        elif type == "half_sinus_inverted":
            return (np.cos(np.linspace(0, np.pi / 2, conditioning_count)) * (frame_count - 1) + 1).astype(int).tolist()

        else:
            raise ValueError("Unsupported cond_keyframes_type: " + type)

```
