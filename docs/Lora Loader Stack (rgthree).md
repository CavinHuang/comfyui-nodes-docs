
# Documentation
- Class name: Lora Loader Stack (rgthree)
- Category: rgthree
- Output node: False

Lora Loader Stack (rgthree)节点旨在将多个LoRA(Low-Rank Adaptation)修改动态加载到给定的模型和CLIP中，基于指定的LoRA文件及其相关强度来增强或改变它们的能力。它允许顺序应用最多四个LoRA修改，为模型定制提供了灵活的机制。

# Input types
## Required
- model
    - model参数代表将应用LoRA修改的神经网络模型。它对于定义将被LoRA层增强或改变的基础架构至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数表示将使用LoRA修改进行调整的CLIP模型。它在指定LoRA增强的目标方面与主要模型一起发挥关键作用。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- lora_i
    - 指定要应用于模型和CLIP的LoRA文件。LoRA文件的选择直接影响修改的性质，允许进行有针对性的调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_i
    - 决定LoRA修改对模型和CLIP影响的强度，使得能够对适应效果进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 经过修改的神经网络模型，现在已经按照指定增强了最多四个LoRA修改。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 调整后的CLIP模型，反映了应用的LoRA修改的累积效果。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Text to Conditioning](../../was-node-suite-comfyui/Nodes/Text to Conditioning.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - Reroute
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [BNK_CLIPTextEncodeAdvanced](../../ComfyUI_ADV_CLIP_emb/Nodes/BNK_CLIPTextEncodeAdvanced.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [CLIPSetLastLayer](../../Comfy/Nodes/CLIPSetLastLayer.md)
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)



## Source code
```python
class RgthreeLoraLoaderStack:

    NAME = get_name('Lora Loader Stack')
    CATEGORY = get_category()

    @classmethod
    def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP", ),

                "lora_01": (['None'] + folder_paths.get_filename_list("loras"), ),
                "strength_01":("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "lora_02": (['None'] + folder_paths.get_filename_list("loras"), ),
                "strength_02":("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "lora_03": (['None'] + folder_paths.get_filename_list("loras"), ),
                "strength_03":("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "lora_04": (['None'] + folder_paths.get_filename_list("loras"), ),
                "strength_04":("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL", "CLIP")
    FUNCTION = "load_lora"

    def load_lora(self, model, clip, lora_01, strength_01, lora_02, strength_02, lora_03, strength_03, lora_04, strength_04):
        if lora_01 != "None" and strength_01 != 0:
            model, clip = LoraLoader().load_lora(model, clip, lora_01, strength_01, strength_01)
        if lora_02 != "None" and strength_02 != 0:
            model, clip = LoraLoader().load_lora(model, clip, lora_02, strength_02, strength_02)
        if lora_03 != "None" and strength_03 != 0:
            model, clip = LoraLoader().load_lora(model, clip, lora_03, strength_03, strength_03)
        if lora_04 != "None" and strength_04 != 0:
            model, clip = LoraLoader().load_lora(model, clip, lora_04, strength_04, strength_04)

        return (model, clip)

```
