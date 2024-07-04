
# Documentation
- Class name: LoraLoader (dirty)
- Category: Bmad/api/dirty loaders
- Output node: False

LoraLoader节点旨在动态加载并应用LoRA（低秩适应）调整到模型和CLIP实例，基于指定的参数。它通过集成LoRA修改来促进模型行为和性能的定制，这可以增强或改变模型的能力，而无需重新训练。

# Input types
## Required
- model
    - 将应用LoRA调整的模型。它是节点操作的核心，因为它决定了将被修改的基础模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 将应用LoRA调整的CLIP实例。此参数允许与主模型一起定制CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- lora_name
    - 包含要应用的调整的LoRA文件的名称。此参数指定将集成到模型和CLIP实例中的LoRA修改。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- strength_model
    - 应用于模型的LoRA调整的强度。此参数控制修改的强度，影响模型的行为。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 应用于CLIP实例的LoRA调整的强度。此参数控制修改的强度，影响CLIP的行为。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 应用了LoRA调整的修改后模型。此输出反映了LoRA修改与原始模型的集成，增强或改变了其能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 应用了LoRA调整的修改后CLIP实例。此输出反映了LoRA修改与原始CLIP的集成，增强或改变了其能力。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - Reroute
    - [VideoLinearCFGGuidance](../../Comfy/Nodes/VideoLinearCFGGuidance.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [ModelSamplingDiscrete](../../Comfy/Nodes/ModelSamplingDiscrete.md)
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)
    - KSampler //Inspire
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)



## Source code
```python
class DirtyLoraLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL",),
                             "clip": ("CLIP",),
                             "lora_name": ("STRING", {"default": ""}),
                             "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             }}

    RETURN_TYPES = ("MODEL", "CLIP")
    FUNCTION = "load_lora"

    CATEGORY = "Bmad/api/dirty loaders"

    def load_lora(self, model, clip, lora_name, strength_model, strength_clip):
        lora_name = DirtyLoaderUtils.find_matching_filename(
            lora_name, folder_paths.get_filename_list("loras"))

        loader = nodes.LoraLoader()
        return loader.load_lora(model, clip, lora_name, strength_model, strength_clip)

```
