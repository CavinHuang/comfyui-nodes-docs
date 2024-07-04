
# Documentation
- Class name: Eff. Loader SDXL
- Category: Efficiency Nodes/Loaders
- Output node: False

Eff. Loader SDXL节点旨在高效加载并准备用于SDXL（超级扩散XL）流程的模型和数据。它负责初始化和配置基础模型和细化模型，处理clip跳过、美学评分等各种参数，以优化加载过程，从而提高生成任务的性能和效率。

# Input types
## Required
- base_ckpt_name
    - 指定基础模型的检查点名称，对于使用预训练权重初始化模型至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- base_clip_skip
    - 确定在基础模型中要跳过的clip层数，影响模型的性能和输出质量。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_ckpt_name
    - 定义细化模型的检查点名称，使得通过细化来增强生成的输出成为可能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- refiner_clip_skip
    - 指示在细化模型中要跳过的clip层数，用于优化细化过程。
    - Comfy dtype: INT
    - Python dtype: int
- positive_ascore
    - 正面反馈的美学评分，用于引导模型生成更具吸引力的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- negative_ascore
    - 负面反馈的美学评分，帮助模型避开不太理想的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- vae_name
    - 过程中使用的VAE名称，对于模型的数据编码和解码至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 正面输入数据或条件，用于引导模型朝特定生成目标发展。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面输入数据或条件，用于避免生成的输出中出现某些模式或主题。
    - Comfy dtype: STRING
    - Python dtype: str
- token_normalization
    - 控制令牌的规范化，影响模型对输入数据的解释和处理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- weight_interpretation
    - 调整模型如何解释不同输入的权重，影响正面和负面反馈之间的平衡。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- empty_latent_width
    - 指定空白潜在空间的宽度，配置模型初始化的维度。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - 定义空白潜在空间的高度，为生成过程设置空间维度。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 单次批处理中处理的样本数量，影响加载操作的效率和速度。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- lora_stack
    - 可选的LoRA堆栈配置，通过LoRA（低秩适应）技术增强模型性能。
    - Comfy dtype: LORA_STACK
    - Python dtype: str
- cnet_stack
    - 可选的ControlNet堆栈配置，通过受控网络调整进一步优化模型输出。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: str

# Output types
- SDXL_TUPLE
    - Comfy dtype: SDXL_TUPLE
    - 包含基础模型和细化模型、clips以及编码后的正面和负面反馈的元组，为SDXL流程做好准备。
    - Python dtype: tuple
- LATENT
    - Comfy dtype: LATENT
    - 由VAE生成的潜在空间样本，对生成过程至关重要。
    - Python dtype: dict
- VAE
    - Comfy dtype: VAE
    - 过程中使用的VAE模型，对数据的编码和解码至关重要。
    - Python dtype: object
- DEPENDENCIES
    - Comfy dtype: DEPENDENCIES
    - 操作所需依赖项的集合，包括模型名称、clip信息和配置参数。
    - Python dtype: tuple


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler SDXL (Eff.)](../../efficiency-nodes-comfyui/Nodes/KSampler SDXL (Eff.).md)
    - [Unpack SDXL Tuple](../../efficiency-nodes-comfyui/Nodes/Unpack SDXL Tuple.md)
    - Reroute
    - [XY Plot](../../efficiency-nodes-comfyui/Nodes/XY Plot.md)



## Source code
```python
class TSC_EfficientLoaderSDXL(TSC_EfficientLoader):

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": { "base_ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
                              "base_clip_skip": ("INT", {"default": -2, "min": -24, "max": -1, "step": 1}),
                              "refiner_ckpt_name": (["None"] + folder_paths.get_filename_list("checkpoints"),),
                              "refiner_clip_skip": ("INT", {"default": -2, "min": -24, "max": -1, "step": 1}),
                              "positive_ascore": ("FLOAT", {"default": 6.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
                              "negative_ascore": ("FLOAT", {"default": 2.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
                              "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
                              "positive": ("STRING", {"default": "CLIP_POSITIVE", "multiline": True}),
                              "negative": ("STRING", {"default": "CLIP_NEGATIVE", "multiline": True}),
                              "token_normalization": (["none", "mean", "length", "length+mean"],),
                              "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),
                              "empty_latent_width": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 64}),
                              "empty_latent_height": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 64}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 64})},
                "optional": {"lora_stack": ("LORA_STACK", ), "cnet_stack": ("CONTROL_NET_STACK",),},
                "hidden": { "prompt": "PROMPT", "my_unique_id": "UNIQUE_ID",},
                }

    RETURN_TYPES = ("SDXL_TUPLE", "LATENT", "VAE", "DEPENDENCIES",)
    RETURN_NAMES = ("SDXL_TUPLE", "LATENT", "VAE", "DEPENDENCIES", )
    FUNCTION = "efficientloaderSDXL"
    CATEGORY = "Efficiency Nodes/Loaders"

    def efficientloaderSDXL(self, base_ckpt_name, base_clip_skip, refiner_ckpt_name, refiner_clip_skip, positive_ascore,
                            negative_ascore, vae_name, positive, negative, token_normalization, weight_interpretation,
                            empty_latent_width, empty_latent_height, batch_size, lora_stack=None, cnet_stack=None,
                            prompt=None, my_unique_id=None):
        clip_skip = (base_clip_skip, refiner_clip_skip)
        lora_name = "None"
        lora_model_strength = lora_clip_strength = 0
        return super().efficientloader(base_ckpt_name, vae_name, clip_skip, lora_name, lora_model_strength, lora_clip_strength,
                        positive, negative, token_normalization, weight_interpretation, empty_latent_width, empty_latent_height,
                        batch_size, lora_stack=lora_stack, cnet_stack=cnet_stack, refiner_name=refiner_ckpt_name,
                        ascore=(positive_ascore, negative_ascore), prompt=prompt, my_unique_id=my_unique_id, loader_type="sdxl")

```
