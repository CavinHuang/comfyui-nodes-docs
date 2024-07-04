
# Documentation
- Class name: CLIPTextEncode SDXL Plus (JPS)
- Category: JPS Nodes/Conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点旨在使用为SDXL架构定制的CLIP模型对文本输入进行编码，从而增强文本输入以用于后续的处理或生成任务。它专注于优化和调节输入文本，以符合美学或特定的尺寸要求，利用CLIP模型的先进功能来解释和编码文本信息，以优化高分辨率图像的合成和操作。

# Input types
## Required
- width
    - 指定输出图像的宽度，影响条件输出的空间维度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定输出图像的高度，影响条件输出的空间维度。
    - Comfy dtype: INT
    - Python dtype: int
- res_factor
    - 指定输出分辨率的调整因子，影响条件输出的整体质量和细节。
    - Comfy dtype: INT
    - Python dtype: float
- text_pos
    - 要编码的正面文本输入，作为条件处理过程的关键组成部分，用于促进某些特质或主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_neg
    - 要编码的负面文本输入，用于在条件处理过程中降低或减少某些特质或主题的存在。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 用于文本标记化和编码的CLIP模型实例，是节点功能的核心。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module

# Output types
- cond_pos
    - 条件化的正面输出，包括经过编码的文本信息，旨在促进指定的特质或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: list[dict]
- cond_neg
    - 条件化的负面输出，包括经过编码的文本信息，旨在减少或降低指定的特质或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: list[dict]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLIPTextEncodeSDXL_Plus:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "width": ("INT", {"default": 1024.0, "min": 0, "max": 12288}),
            "height": ("INT", {"default": 1024.0, "min": 0, "max": 12288}),
            "res_factor": ("INT", {"default": 4, "min": 1, "max": 8}),
            "text_pos": ("STRING", {"multiline": True, "default": "", "dynamicPrompts": True}),
            "text_neg": ("STRING", {"multiline": True, "default": "", "dynamicPrompts": True}),
            "clip": ("CLIP", ),
            }}
    RETURN_TYPES = ("CONDITIONING","CONDITIONING",)
    RETURN_NAMES = ("cond_pos", "cond_neg",)
    FUNCTION = "execute"
    CATEGORY = "JPS Nodes/Conditioning"

    def execute(self, clip, width, height, res_factor, text_pos, text_neg):
        crop_w = 0
        crop_h = 0
        width = width*res_factor
        height = height*res_factor
        target_width = width
        target_height = height
        text_g_pos = text_l_pos = text_pos
        text_g_neg = text_l_neg = text_neg

        tokens_pos = clip.tokenize(text_g_pos)
        tokens_pos["l"] = clip.tokenize(text_l_pos)["l"]
        if len(tokens_pos["l"]) != len(tokens_pos["g"]):
            empty_pos = clip.tokenize("")
            while len(tokens_pos["l"]) < len(tokens_pos["g"]):
                tokens_pos["l"] += empty_pos["l"]
            while len(tokens_pos["l"]) > len(tokens_pos["g"]):
                tokens_pos["g"] += empty_pos["g"]
        cond_pos, pooled_pos = clip.encode_from_tokens(tokens_pos, return_pooled=True)

        tokens_neg = clip.tokenize(text_g_neg)
        tokens_neg["l"] = clip.tokenize(text_l_neg)["l"]
        if len(tokens_neg["l"]) != len(tokens_neg["g"]):
            empty_neg = clip.tokenize("")
            while len(tokens_neg["l"]) < len(tokens_neg["g"]):
                tokens_neg["l"] += empty_neg["l"]
            while len(tokens_pos["l"]) > len(tokens_pos["g"]):
                tokens_neg["g"] += empty_neg["g"]
        cond_neg, pooled_neg = clip.encode_from_tokens(tokens_neg, return_pooled=True)

        return ([[cond_pos, {"pooled_output": pooled_pos, "width": width, "height": height, "crop_w": crop_w, "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]], [[cond_neg, {"pooled_output": pooled_neg, "width": width, "height": height, "crop_w": crop_w, "crop_h": crop_h, "target_width": target_width, "target_height": target_height}]])

```
