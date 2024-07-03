
# Documentation
- Class name: SaltCLIPTextEncodeSequence
- Category: SALT/Scheduling/Conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltCLIPTextEncodeSequence 节点专门用于根据文本提示的时间表生成一系列条件，以用于音频可视化。它利用 CLIP 模型将文本提示编码为条件，根据帧数进行调整，并应用令牌标准化和权重解释策略，以根据特定的可视化需求定制输出。

# Input types
## Required
- clip
    - 用于将文本提示编码为条件格式的 CLIP 模型。它在解释文本并将其转换为可用于生成可视化的形式方面起着至关重要的作用。
    - Comfy dtype: CLIP
    - Python dtype: object
- token_normalization
    - 指定从文本提示生成的标记的标准化方法，影响文本如何被处理和编码为条件。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- weight_interpretation
    - 决定在编码过程中如何解释权重，影响最终用于可视化的条件输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- frame_count
    - 需要生成条件的总帧数，指导序列生成过程。
    - Comfy dtype: INT
    - Python dtype: int
- text
    - 以结构化格式提供的文本提示时间表，规定序列中每一帧的内容和时间。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- conditioning_sequence
    - 基于提供的文本提示和帧数生成的条件序列，专门用于音频可视化目的。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[object]
- frame_count
    - 已生成条件的总帧数，反映输入的帧数。
    - Comfy dtype: INT
    - Python dtype: int


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
