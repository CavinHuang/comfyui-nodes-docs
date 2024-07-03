
# Documentation
- Class name: AV_LoraLoader
- Category: Art Venture/Loaders
- Output node: False

AV_LoraLoader节点用于加载并应用LoRA（低秩适应）模型到给定的模型和CLIP实例上。它可以选择性地用指定的LoRA模型覆盖默认模型，并可以启用或禁用加载过程。这一功能增强了模型的定制性和处理的灵活性，允许根据特定需求或偏好进行动态调整和优化。

# Input types
## Required
- model
    - model参数代表将要应用LoRA调整的神经网络模型，作为修改的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数表示将与主模型一起调整的CLIP模型，允许同步增强处理能力。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- lora_name
    - 指定要加载和应用的LoRA模型的名称，实现对基础模型和CLIP实例的有针对性修改。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_model
    - 指定应用于模型的LoRA调整强度，允许对适应过程进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 指定应用于CLIP模型的LoRA调整强度，实现对增强的精确定制。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- lora_override
    - 允许指定替代的LoRA模型以覆盖默认模型，提供模型定制的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- enabled
    - 布尔标志，决定是否执行LoRA加载和应用过程，提供对修改工作流的控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- model
    - 返回应用了LoRA调整的修改后的神经网络模型，反映了所做的增强或定制。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 返回应用了LoRA调整的修改后的CLIP模型，展示了对处理能力所做的增强或定制。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Lora Loader](../../was-node-suite-comfyui/Nodes/Lora Loader.md)
    - [CLIPTextEncode (BlenderNeko Advanced + NSP)](../../was-node-suite-comfyui/Nodes/CLIPTextEncode (BlenderNeko Advanced + NSP).md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class AVLoraLoader(LoraLoader):
    @classmethod
    def INPUT_TYPES(s):
        inputs = LoraLoader.INPUT_TYPES()
        inputs["optional"] = {
            "lora_override": ("STRING", {"default": "None"}),
            "enabled": ("BOOLEAN", {"default": True}),
        }
        return inputs

    CATEGORY = "Art Venture/Loaders"

    def load_lora(self, model, clip, lora_name, *args, lora_override="None", enabled=True, **kwargs):
        if not enabled:
            return (model, clip)

        if lora_override != "None":
            if lora_override not in folder_paths.get_filename_list("loras"):
                print(f"Warning: Not found Lora model {lora_override}. Use {lora_name} instead.")
            else:
                lora_name = lora_override

        return super().load_lora(model, clip, lora_name, *args, **kwargs)

```
