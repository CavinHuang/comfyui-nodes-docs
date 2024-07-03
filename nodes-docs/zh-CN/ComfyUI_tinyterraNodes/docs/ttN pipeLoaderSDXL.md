
# Documentation
- Class name: ttN pipeLoaderSDXL
- Category: ttN/legacy
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ttN pipeLoaderSDXL 节点旨在为 ComfyUI 环境加载和初始化大规模模型，促进在自定义管道中无缝集成和利用先进的深度学习模型。

# Input types
## Required
- ckpt_name
    - 指定要加载的模型的检查点名称，对于使用预训练权重初始化模型至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- vae_name
    - 标识要加载的 VAE 模型，对于生成或操作图像至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora1_name
    - 命名要应用的第一个 LoRA 模型，允许对模型行为进行自适应调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora1_model_strength
    - 定义第一个 LoRA 模型对模型的影响强度，调整模型输出的修改程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora1_clip_strength
    - 指定第一个 LoRA 模型对 CLIP 的影响强度，调整文本和图像表示之间的交互。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora2_name
    - 命名第二个 LoRA 模型，通过额外的自适应调整实现模型输出的进一步定制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora2_model_strength
    - 定义第二个 LoRA 模型对模型的影响强度，进一步定制输出修改。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora2_clip_strength
    - 指定第二个 LoRA 模型对 CLIP 的影响强度，进一步调整文本和图像表示之间的交互。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_ckpt_name
    - 指定优化器模型的检查点名称，对于使用另一组预训练权重优化输出至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- refiner_vae_name
    - 标识用于优化的 VAE 模型，对于生成图像的后处理或增强至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- refiner_lora1_name
    - 命名用于优化的第一个 LoRA 模型，允许对优化器模型的行为进行自适应调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- refiner_lora1_model_strength
    - 定义第一个 LoRA 模型对优化器模型的影响强度，调整优化过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_lora1_clip_strength
    - 指定优化过程中第一个 LoRA 模型对 CLIP 的影响强度，调整优化后的文本和图像表示之间的交互。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_lora2_name
    - 命名用于优化的第二个 LoRA 模型，通过额外的自适应调整实现优化过程的进一步定制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- refiner_lora2_model_strength
    - 定义第二个 LoRA 模型对优化器模型的影响强度，进一步定制优化修改。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_lora2_clip_strength
    - 指定优化过程中第二个 LoRA 模型对 CLIP 的影响强度，进一步调整优化后的文本和图像表示之间的交互。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_skip
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- positive
    - 指定正面提示或条件，引导模型生成朝向期望的主题或概念。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_token_normalization
    - 确定正面标记的归一化方法，影响模型如何解释和权衡这些输入。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive_weight_interpretation
    - 定义模型应如何解释正面输入的权重，影响生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative
    - 指定模型生成中要避免的负面提示或条件，帮助避开不希望的主题或概念。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_token_normalization
    - 确定负面标记的归一化方法，影响模型如何解释和权衡这些输入。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative_weight_interpretation
    - 定义模型应如何解释负面输入的权重，影响生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- empty_latent_width
    - 指定要生成的空潜在空间的宽度，设置图像生成的维度。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - 指定要生成的空潜在空间的高度，设置图像生成的维度。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- seed
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown

# Output types
- sdxl_pipe
    - Comfy dtype: PIPE_LINE_SDXL
    - 输出增强的管道配置，整合指定的模型、条件和设置，以供进一步处理。
    - Python dtype: dict
- model
    - Comfy dtype: MODEL
    - 返回加载并配置好供使用的主要模型组件，可随时集成到管道中。
    - Python dtype: str
- positive
    - Comfy dtype: CONDITIONING
    - 生成与指定正面输入相一致的条件，旨在引导模型朝向期望的主题。
    - Python dtype: str
- negative
    - Comfy dtype: CONDITIONING
    - 生成避开指定负面输入的条件，确保输出保持在期望的内容边界内。
    - Python dtype: str
- vae
    - Comfy dtype: VAE
    - 返回管道中使用的 VAE 组件，对图像生成和操作至关重要。
    - Python dtype: str
- clip
    - Comfy dtype: CLIP
    - 提供 CLIP 模型组件，实现高级文本到图像和图像到文本的处理能力。
    - Python dtype: str
- refiner_model
    - Comfy dtype: MODEL
    - 返回优化器模型组件，用于进一步优化和增强生成的输出。
    - Python dtype: str
- refiner_positive
    - Comfy dtype: CONDITIONING
    - 为优化器模型生成与指定正面输入相一致的条件，旨在将优化结果引向期望的主题。
    - Python dtype: str
- refiner_negative
    - Comfy dtype: CONDITIONING
    - 为优化器模型生成避开指定负面输入的条件，确保优化后的输出保持在期望的内容边界内。
    - Python dtype: str
- refiner_vae
    - Comfy dtype: VAE
    - 返回用于优化的 VAE 组件，对生成图像的增强至关重要。
    - Python dtype: str
- refiner_clip
    - Comfy dtype: CLIP
    - 提供优化中使用的 CLIP 模型组件，在优化过程中实现增强的文本到图像和图像到文本处理能力。
    - Python dtype: str
- latent
    - Comfy dtype: LATENT
    - 输出管道中使用的潜在表示，对控制模型的生成方面至关重要。
    - Python dtype: str
- seed
    - Comfy dtype: INT
    - 返回用于初始化随机过程的种子值，确保管道输出的可重复性。
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeLoaderSDXL:
    version = '1.1.2'
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": { 
                        "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                        "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
                        
                        "lora1_name": (["None"] + folder_paths.get_filename_list("loras"),),
                        "lora1_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                        "lora1_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                        "lora2_name": (["None"] + folder_paths.get_filename_list("loras"),),
                        "lora2_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                        "lora2_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                        "refiner_ckpt_name": (["None"] + folder_paths.get_filename_list("checkpoints"), ),
                        "refiner_vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),

                        "refiner_lora1_name": (["None"] + folder_paths.get_filename_list("loras"),),
                        "refiner_lora1_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                        "refiner_lora1_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                        "refiner_lora2_name": (["None"] + folder_paths.get_filename_list("loras"),),
                        "refiner_lora2_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                        "refiner_lora2_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                        "clip_skip": ("INT", {"default": -2, "min": -24, "max": 0, "step": 1}),

                        "positive": ("STRING", {"default": "Positive","multiline": True}),
                        "positive_token_normalization": (["none", "mean", "length", "length+mean"],),
                        "positive_weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),

                        "negative": ("STRING", {"default": "Negative", "multiline": True}),
                        "negative_token_normalization": (["none", "mean", "length", "length+mean"],),
                        "negative_weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),

                        "empty_latent_width": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "empty_latent_height": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                        },
                "hidden": {"prompt": "PROMPT", "ttNnodeVersion": ttN_pipeLoaderSDXL.version}, "my_unique_id": "UNIQUE_ID"}

    RETURN_TYPES = ("PIPE_LINE_SDXL" ,"MODEL", "CONDITIONING", "CONDITIONING", "VAE", "CLIP", "MODEL", "CONDITIONING", "CONDITIONING", "VAE", "CLIP", "LATENT", "INT",)
    RETURN_NAMES = ("sdxl_pipe","model", "positive", "negative", "vae", "clip", "refiner_model", "refiner_positive", "refiner_negative", "refiner_vae", "refiner_clip", "latent", "seed",)

    FUNCTION = "adv_pipeloader"
    CATEGORY = "ttN/legacy"

    def adv_pipeloader(self, ckpt_name, vae_name,
                       lora1_name, lora1_model_strength, lora1_clip_strength,
                       lora2_name, lora2_model_strength, lora2_clip_strength,
                       refiner_ckpt_name, refiner_vae_name,
                       refiner_lora1_name, refiner_lora1_model_strength, refiner_lora1_clip_strength,
                       refiner_lora2_name, refiner_lora2_model_strength, refiner_lora2_clip_strength,
                       clip_skip,
                       positive, positive_token_normalization, positive_weight_interpretation, 
                       negative, negative_token_normalization, negative_weight_interpretation, 
                       empty_latent_width, empty_latent_height, batch_size, seed, prompt=None, my_unique_id=None):

        def SDXL_loader(ckpt_name, vae_name,
                            lora1_name, lora1_model_strength, lora1_clip_strength,
                            lora2_name, lora2_model_strength, lora2_clip_strength,
                            positive, positive_token_normalization, positive_weight_interpretation, 
                            negative, negative_token_normalization, negative_weight_interpretation,):
            
            model: ModelPatcher | None = None
            clip: CLIP | None = None
            vae: VAE | None = None

            # Load models
            model, clip, vae = loader.load_checkpoint(ckpt_name)

            if lora1_name != "None":
                model, clip = loader.load_lora(lora1_name, model, clip, lora1_model_strength, lora1_clip_strength)

            if lora2_name != "None":
                model, clip = loader.load_lora(lora2_name, model, clip, lora2_model_strength, lora2_clip_strength)

            # Check for custom VAE
            if vae_name not in ["Baked VAE", "Baked-VAE"]:
                vae = loader.load_vae(vae_name)

            # CLIP skip
            if not clip:
                raise Exception("No CLIP found")
            
            clipped = clip.clone()
            if clip_skip != 0:
                clipped.clip_layer(clip_skip)

            positive = loader.nsp_parse(positive, seed, title="pipeLoaderSDXL positive", my_unique_id=my_unique_id)

            positive_embeddings_final, positive_pooled = advanced_encode(clipped, positive, positive_token_normalization, positive_weight_interpretation, w_max=1.0, apply_to_pooled='enable')
            positive_embeddings_final = [[positive_embeddings_final, {"pooled_output": positive_pooled}]]

            negative = loader.nsp_parse(negative, seed)

            negative_embeddings_final, negative_pooled = advanced_encode(clipped, negative, negative_token_normalization, negative_weight_interpretation, w_max=1.0, apply_to_pooled='enable')
            negative_embeddings_final = [[negative_embeddings_final, {"pooled_output": negative_pooled}]]

            return model, positive_embeddings_final, negative_embeddings_final, vae, clip

        # Create Empty Latent
        latent = sampler.emptyLatent(None, batch_size, empty_latent_width, empty_latent_height)
        samples = {"samples":latent}

        model, positive_embeddings, negative_embeddings, vae, clip = SDXL_loader(ckpt_name, vae_name,
                                                                                    lora1_name, lora1_model_strength, lora1_clip_strength,
                                                                                    lora2_name, lora2_model_strength, lora2_clip_strength,
                                                                                    positive, positive_token_normalization, positive_weight_interpretation,
                                                                                    negative, negative_token_normalization, negative_weight_interpretation)
        
        if refiner_ckpt_name != "None":
            refiner_model, refiner_positive_embeddings, refiner_negative_embeddings, refiner_vae, refiner_clip = SDXL_loader(refiner_ckpt_name, refiner_vae_name,
                                                                                                                                refiner_lora1_name, refiner_lora1_model_strength, refiner_lora1_clip_strength,
                                                                                                                                refiner_lora2_name, refiner_lora2_model_strength, refiner_lora2_clip_strength, 
                                                                                                                                positive, positive_token_normalization, positive_weight_interpretation,
                                                                                                                                negative, negative_token_normalization, negative_weight_interpretation)
        else:
            refiner_model, refiner_positive_embeddings, refiner_negative_embeddings, refiner_vae, refiner_clip = None, None, None, None, None

        # Clean models from loaded_objects
        loader.update_loaded_objects(prompt)

        image = ttNsampler.pil2tensor(Image.new('RGB', (1, 1), (0, 0, 0)))

        pipe = {"model": model,
                "positive": positive_embeddings,
                "negative": negative_embeddings,
                "vae": vae,
                "clip": clip,

                "refiner_model": refiner_model,
                "refiner_positive": refiner_positive_embeddings,
                "refiner_negative": refiner_negative_embeddings,
                "refiner_vae": refiner_vae,
                "refiner_clip": refiner_clip,

                "samples": samples,
                "images": image,
                "seed": seed,
 
                "loader_settings": {"ckpt_name": ckpt_name,
                                    "vae_name": vae_name,

                                    "lora1_name": lora1_name,
                                    "lora1_model_strength": lora1_model_strength,
                                    "lora1_clip_strength": lora1_clip_strength,
                                    "lora2_name": lora2_name,
                                    "lora2_model_strength": lora2_model_strength,
                                    "lora2_clip_strength": lora2_clip_strength,
                                    "lora3_name": None,
                                    "lora3_model_strength": None,
                                    "lora3_clip_strength": None,

                                    "refiner_ckpt_name": refiner_ckpt_name,
                                    "refiner_vae_name": refiner_vae_name,
                                    "refiner_lora1_name": refiner_lora1_name,
                                    "refiner_lora1_model_strength": refiner_lora1_model_strength,
                                    "refiner_lora1_clip_strength": refiner_lora1_clip_strength,
                                    "refiner_lora2_name": refiner_lora2_name,
                                    "refiner_lora2_model_strength": refiner_lora2_model_strength,
                                    "refiner_lora2_clip_strength": refiner_lora2_clip_strength,

                                    "clip_skip": clip_skip,
                                    "positive_balance": None,
                                    "positive": positive,
                                    "positive_l": None,
                                    "positive_g": None,
                                    "positive_token_normalization": positive_token_normalization,
                                    "positive_weight_interpretation": positive_weight_interpretation,
                                    "negative_balance": None,
                                    "negative": negative,
                                    "negative_l": None,
                                    "negative_g": None,
                                    "negative_token_normalization": negative_token_normalization,
                                    "negative_weight_interpretation": negative_weight_interpretation,
                                    "empty_latent_width": empty_latent_width,
                                    "empty_latent_height": empty_latent_height,
                                    "batch_size": batch_size,
                                    "seed": seed,
                                    "empty_samples": samples,}
        }

        return (pipe, model, positive_embeddings, negative_embeddings, vae, clip, refiner_model, refiner_positive_embeddings, refiner_negative_embeddings, refiner_vae, refiner_clip, samples, seed)

```
