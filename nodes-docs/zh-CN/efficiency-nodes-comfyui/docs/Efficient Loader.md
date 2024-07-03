
# Documentation
- Class name: Efficient Loader
- Category: Efficiency Nodes/Loaders
- Output node: False

Efficient Loader节点旨在优化模型、VAE和其他依赖项的加载和初始化过程，适用于生成任务。它通过选择性地缓存和重用组件来高效管理资源，并支持通过检查点名称、LoRA配置和批量大小等参数进行自定义。该节点的目标是优化生成工作流的设置阶段，减少开销并促进更快的迭代。

# Input types
## Required
- ckpt_name
    - 指定要加载的模型的检查点名称，作为检索模型参数和配置的关键标识符。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- vae_name
    - 标识生成过程中要使用的VAE，对于定义视觉编码和解码机制至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clip_skip
    - 指定跳过CLIP层的间隔，优化模型在特定任务中的性能。
    - Comfy dtype: INT
    - Python dtype: tuple
- lora_name
    - 指定要加载的LoRA模型的名称（如适用），实现对模型参数的动态调整，无需完全重新训练。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_model_strength
    - 定义LoRA模型调整的强度，允许对模型行为进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_clip_strength
    - 决定应用LoRA时CLIP调整的强度，影响文本-图像对齐。
    - Comfy dtype: FLOAT
    - Python dtype: float
- positive
    - 正面条件文本，引导生成模型在输出中呈现所需属性。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面条件文本，指示生成模型在输出中避免某些属性。
    - Comfy dtype: STRING
    - Python dtype: str
- token_normalization
    - 定义标记规范化的方法，影响模型如何处理和解释文本输入。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- weight_interpretation
    - 决定如何解释权重，允许自定义模型的学习和适应过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- empty_latent_width
    - 指定空白潜在空间的宽度，为初始生成画布设置尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - 指定空白潜在空间的高度，为初始生成画布设置尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 确定并行处理的样本数量，直接影响内存使用和计算效率。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- lora_stack
    - 要应用的LoRA模型堆栈，通过多层实现复杂的模型调整。
    - Comfy dtype: LORA_STACK
    - Python dtype: list
- cnet_stack
    - 要应用的ControlNet模型堆栈，便于对生成过程进行高级控制。
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: list

# Output types
- MODEL
    - 加载并准备用于生成任务的主要模型，包括任何应用的修改（如LoRA）。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CONDITIONING+
    - 处理过的正面条件信息，准备用于指导生成过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- CONDITIONING-
    - 处理过的负面条件信息，准备用于避免不需要的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- LATENT
    - 基于指定尺寸准备的空白潜在空间张量，作为生成的起点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- VAE
    - 加载的VAE模型，对于在生成过程中编码和解码视觉信息至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- CLIP
    - 根据指定的跳过间隔加载和配置的CLIP模型，促进文本-图像对齐。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- DEPENDENCIES
    - 依赖项集合，包括模型名称、配置和参数，确保加载所有必要组件。
    - Comfy dtype: DEPENDENCIES
    - Python dtype: tuple


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [BatchPromptSchedule](../../ComfyUI_FizzNodes/Nodes/BatchPromptSchedule.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)



## Source code
```python
class TSC_EfficientLoader:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": { "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
                              "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
                              "clip_skip": ("INT", {"default": -1, "min": -24, "max": -1, "step": 1}),
                              "lora_name": (["None"] + folder_paths.get_filename_list("loras"),),
                              "lora_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              "lora_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              "positive": ("STRING", {"default": "CLIP_POSITIVE","multiline": True}),
                              "negative": ("STRING", {"default": "CLIP_NEGATIVE", "multiline": True}),
                              "token_normalization": (["none", "mean", "length", "length+mean"],),
                              "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),
                              "empty_latent_width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 64}),
                              "empty_latent_height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 64}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 262144})},
                "optional": {"lora_stack": ("LORA_STACK", ),
                             "cnet_stack": ("CONTROL_NET_STACK",)},
                "hidden": { "prompt": "PROMPT",
                            "my_unique_id": "UNIQUE_ID",},
                }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "DEPENDENCIES",)
    RETURN_NAMES = ("MODEL", "CONDITIONING+", "CONDITIONING-", "LATENT", "VAE", "CLIP", "DEPENDENCIES", )
    FUNCTION = "efficientloader"
    CATEGORY = "Efficiency Nodes/Loaders"

    def efficientloader(self, ckpt_name, vae_name, clip_skip, lora_name, lora_model_strength, lora_clip_strength,
                        positive, negative, token_normalization, weight_interpretation, empty_latent_width,
                        empty_latent_height, batch_size, lora_stack=None, cnet_stack=None, refiner_name="None",
                        ascore=None, prompt=None, my_unique_id=None, loader_type="regular"):

        # Clean globally stored objects
        globals_cleanup(prompt)

        # Create Empty Latent
        latent = torch.zeros([batch_size, 4, empty_latent_height // 8, empty_latent_width // 8]).cpu()

        # Retrieve cache numbers
        vae_cache, ckpt_cache, lora_cache, refn_cache = get_cache_numbers("Efficient Loader")

        if lora_name != "None" or lora_stack:
            # Initialize an empty list to store LoRa parameters.
            lora_params = []

            # Check if lora_name is not the string "None" and if so, add its parameters.
            if lora_name != "None":
                lora_params.append((lora_name, lora_model_strength, lora_clip_strength))

            # If lora_stack is not None or an empty list, extend lora_params with its items.
            if lora_stack:
                lora_params.extend(lora_stack)

            # Load LoRa(s)
            model, clip = load_lora(lora_params, ckpt_name, my_unique_id, cache=lora_cache, ckpt_cache=ckpt_cache, cache_overwrite=True)

            if vae_name == "Baked VAE":
                vae = get_bvae_by_ckpt_name(ckpt_name)
        else:
            model, clip, vae = load_checkpoint(ckpt_name, my_unique_id, cache=ckpt_cache, cache_overwrite=True)
            lora_params = None

        # Load Refiner Checkpoint if given
        if refiner_name != "None":
            refiner_model, refiner_clip, _ = load_checkpoint(refiner_name, my_unique_id, output_vae=False,
                                                             cache=refn_cache, cache_overwrite=True, ckpt_type="refn")
        else:
            refiner_model = refiner_clip = None

        # Extract clip_skips
        refiner_clip_skip = clip_skip[1] if loader_type == "sdxl" else None
        clip_skip = clip_skip[0] if loader_type == "sdxl" else clip_skip

        # Encode prompt based on loader_type
        positive_encoded, negative_encoded, clip, refiner_positive_encoded, refiner_negative_encoded, refiner_clip = \
            encode_prompts(positive, negative, token_normalization, weight_interpretation, clip, clip_skip,
                           refiner_clip, refiner_clip_skip, ascore, loader_type == "sdxl",
                           empty_latent_width, empty_latent_height)

        # Apply ControlNet Stack if given
        if cnet_stack:
            controlnet_conditioning = TSC_Apply_ControlNet_Stack().apply_cnet_stack(positive_encoded, negative_encoded, cnet_stack)
            positive_encoded, negative_encoded = controlnet_conditioning[0], controlnet_conditioning[1]

        # Check for custom VAE
        if vae_name != "Baked VAE":
            vae = load_vae(vae_name, my_unique_id, cache=vae_cache, cache_overwrite=True)

        # Data for XY Plot
        dependencies = (vae_name, ckpt_name, clip, clip_skip, refiner_name, refiner_clip, refiner_clip_skip,
                        positive, negative, token_normalization, weight_interpretation, ascore,
                        empty_latent_width, empty_latent_height, lora_params, cnet_stack)

        ### Debugging
        ###print_loaded_objects_entries()
        print_loaded_objects_entries(my_unique_id, prompt)

        if loader_type == "regular":
            return (model, positive_encoded, negative_encoded, {"samples":latent}, vae, clip, dependencies,)
        elif loader_type == "sdxl":
            return ((model, clip, positive_encoded, negative_encoded, refiner_model, refiner_clip,
                     refiner_positive_encoded, refiner_negative_encoded), {"samples":latent}, vae, dependencies,)

```
