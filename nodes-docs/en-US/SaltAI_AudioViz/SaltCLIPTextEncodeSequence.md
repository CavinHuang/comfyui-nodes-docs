---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# CLIPTextEncode Scheduled Sequence
## Documentation
- Class name: `SaltCLIPTextEncodeSequence`
- Category: `SALT/Scheduling/Conditioning`
- Output node: `False`

The SaltCLIPTextEncodeSequence node is designed for generating a sequence of conditionings based on a schedule of text prompts for audio visualization. It utilizes CLIP models to encode text prompts into conditionings, adjusting for frame counts and applying token normalization and weight interpretation strategies to tailor the output for specific visualization needs.
## Input types
### Required
- **`clip`**
    - The CLIP model used for encoding the text prompts into a conditioning format. It plays a crucial role in interpreting the text and converting it into a form that can be utilized for generating visualizations.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`token_normalization`**
    - Specifies the method for normalizing the tokens generated from the text prompts, affecting how the text is processed and encoded into conditionings.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`weight_interpretation`**
    - Determines how the weights are interpreted during the encoding process, influencing the final conditioning output for visualization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`frame_count`**
    - The total number of frames for which conditionings need to be generated, guiding the sequence generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - A schedule of text prompts provided in a structured format, dictating the content and timing for each frame in the sequence.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning_sequence`**
    - Comfy dtype: `CONDITIONING`
    - A sequence of conditionings generated based on the provided text prompts and frame count, tailored for audio visualization purposes.
    - Python dtype: `List[object]`
- **`frame_count`**
    - Comfy dtype: `INT`
    - The total number of frames for which conditionings have been generated, reflecting the input frame count.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltCLIPTextEncodeSequence:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip": ("CLIP",),
                "token_normalization": (["none", "mean", "length", "length+mean"],),
                "weight_interpretation": (["comfy", "A1111", "compel", "comfy++"],),
                "frame_count": ("INT", {"default": 100, "min": 1, "max": 1024, "step": 1}),
                "text": ("STRING", {"multiline": True, "placeholder": '''"0": "A portrait of a rosebud",
"25": "A portrait of a blooming rosebud",
"50": "A portrait of a blooming rose",
"75": "A portrait of a rose"'''}),
            }
        }
        
    RETURN_TYPES = ("CONDITIONING", "INT")
    RETURN_NAMES = ("conditioning_sequence", "frame_count")

    FUNCTION = "encode"
    CATEGORY = "SALT/Scheduling/Conditioning"

    def encode(self, clip, text, frame_count, token_normalization, weight_interpretation):
        
        try:
            text_dict = json.loads("{"+text+"}")
        except json.JSONDecodeError as e:
            raise ValueError("Unable to decode propmt schedule:", e)

        conditionings = []
        prev_frame_num = 0
        prev_encoded = None
        for frame_num, prompt in sorted(text_dict.items(), key=lambda item: int(item[0])):
            frame_num = int(frame_num)
            if USE_BLK:
                encoded = blk_adv.encode(clip=clip, text=prompt, token_normalization=token_normalization, weight_interpretation=weight_interpretation)
            else:
                encoded = CLIPTextEncode.encode(clip=clip, text=prompt)
            for _ in range(prev_frame_num, frame_num):
                conditionings.append(prev_encoded)
            prev_encoded = [encoded[0][0][0], encoded[0][0][1]]
            prev_frame_num = frame_num
        for _ in range(prev_frame_num, frame_count):
            conditionings.append(prev_encoded)

        conditioning_count = len(conditionings)

        return (conditionings, conditioning_count)

    def cond_easing(self, type, frame_count, conditioning_count):
        if type == "linear":
            return np.linspace(frame_count // conditioning_count, frame_count, conditioning_count, dtype=int).tolist()
        elif type == "sinus":
            t = np.linspace(0, np.pi, conditioning_count)
            sinus_values = np.sin(t)
            normalized_values = (sinus_values - sinus_values.min()) / (sinus_values.max() - sinus_values.min())
            scaled_values = normalized_values * (frame_count - 1) + 1
            unique_keyframes = np.round(scaled_values).astype(int)
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
