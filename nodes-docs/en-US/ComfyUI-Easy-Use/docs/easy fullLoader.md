---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# EasyLoader (Full)
## Documentation
- Class name: `easy fullLoader`
- Category: `EasyUse/Loaders`
- Output node: `False`

The `easy fullLoader` node is designed to streamline the process of loading and configuring various components necessary for running Stable Diffusion models. It abstracts the complexities involved in setting up models, VAEs, CLIP models, and other configurations, providing a simplified interface for users to quickly get started with generating images.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model to be loaded, playing a crucial role in determining the model's weights and behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`config_name`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`vae_name`**
    - Indicates the name of the VAE (Variational Autoencoder) to be used, which is essential for the image generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_skip`**
    - A flag to skip loading the CLIP model, which can be useful for optimizing performance in certain scenarios.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`lora_name`**
    - Specifies the name of the LoRA (Low-Rank Adaptation) model to be used, if any, for enhancing model performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_model_strength`**
    - Determines the strength of the LoRA model's influence on the overall model performance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_clip_strength`**
    - Sets the strength of the LoRA model's influence specifically on the CLIP model's performance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - Defines the resolution of the generated images, directly affecting the output quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`empty_latent_width`**
    - Specifies the width of the latent space to be used for image generation, impacting the aspect ratio of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Specifies the height of the latent space, affecting the vertical dimension of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`positive`**
    - A positive prompt to guide the image generation towards desired attributes or themes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`positive_token_normalization`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`positive_weight_interpretation`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative`**
    - A negative prompt to steer the image generation away from certain attributes or themes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_token_normalization`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_weight_interpretation`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`batch_size`**
    - Determines the number of images to be generated in a single batch, influencing performance and output volume.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`model_override`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`clip_override`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`vae_override`**
    - unknown
    - Comfy dtype: `VAE`
    - Python dtype: `unknown`
- **`optional_lora_stack`**
    - Allows for the specification of an optional LoRA stack to further customize model performance.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `str`
- **`a1111_prompt_style`**
    - Enables the use of a specific prompt style, potentially altering the image generation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the configured pipeline for image generation.
    - Python dtype: `object`
- **`model`**
    - Comfy dtype: `MODEL`
    - Provides the loaded model configured for image generation.
    - Python dtype: `object`
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the loaded VAE used in the image generation process.
    - Python dtype: `object`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Provides the loaded CLIP model, if not skipped, used for text-to-image encoding.
    - Python dtype: `object`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Returns the positive embeddings generated from the positive prompt.
    - Python dtype: `object`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Returns the negative embeddings generated from the negative prompt.
    - Python dtype: `object`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Provides the latent space configuration used for image generation.
    - Python dtype: `object`
- **`ui`**
    - Provides a user interface component displaying the positive and negative wildcard prompts.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class fullLoader:

    @classmethod
    def INPUT_TYPES(cls):
        resolution_strings = [f"{width} x {height}" for width, height in BASE_RESOLUTIONS]
        a1111_prompt_style_default = False

        return {"required": {
            "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
            "config_name": (["Default", ] + folder_paths.get_filename_list("configs"), {"default": "Default"}),
            "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
            "clip_skip": ("INT", {"default": -1, "min": -24, "max": 0, "step": 1}),

            "lora_name": (["None"] + folder_paths.get_filename_list("loras"),),
            "lora_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            "lora_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

            "resolution": (resolution_strings,),
            "empty_latent_width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
            "empty_latent_height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),

            "positive": ("STRING", {"default": "Positive", "multiline": True}),
            "positive_token_normalization": (["none", "mean", "length", "length+mean"],),
            "positive_weight_interpretation": (["comfy",  "A1111", "comfy++", "compel", "fixed attention"],),

            "negative": ("STRING", {"default": "Negative", "multiline": True}),
            "negative_token_normalization": (["none", "mean", "length", "length+mean"],),
            "negative_weight_interpretation": (["comfy",  "A1111", "comfy++", "compel", "fixed attention"],),

            "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
        },
            "optional": {"model_override": ("MODEL",), "clip_override": ("CLIP",), "vae_override": ("VAE",), "optional_lora_stack": ("LORA_STACK",), "a1111_prompt_style": ("BOOLEAN", {"default": a1111_prompt_style_default}),},
            "hidden": {"prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "VAE", "CLIP", "CONDITIONING", "CONDITIONING", "LATENT")
    RETURN_NAMES = ("pipe", "model", "vae", "clip", "positive", "negative", "latent")

    FUNCTION = "adv_pipeloader"
    CATEGORY = "EasyUse/Loaders"

    def adv_pipeloader(self, ckpt_name, config_name, vae_name, clip_skip,
                       lora_name, lora_model_strength, lora_clip_strength,
                       resolution, empty_latent_width, empty_latent_height,
                       positive, positive_token_normalization, positive_weight_interpretation,
                       negative, negative_token_normalization, negative_weight_interpretation,
                       batch_size, model_override=None, clip_override=None, vae_override=None, optional_lora_stack=None, a1111_prompt_style=False, prompt=None,
                       my_unique_id=None
                       ):

        model: ModelPatcher | None = None
        clip: CLIP | None = None
        vae: VAE | None = None
        can_load_lora = True
        pipe_lora_stack = []

        # resolution
        if resolution != "自定义 x 自定义":
            try:
                width, height = map(int, resolution.split(' x '))
                empty_latent_width = width
                empty_latent_height = height
            except ValueError:
                raise ValueError("Invalid base_resolution format.")

        # Create Empty Latent
        latent = torch.zeros([batch_size, 4, empty_latent_height // 8, empty_latent_width // 8]).cpu()
        samples = {"samples": latent}

        # Clean models from loaded_objects
        easyCache.update_loaded_objects(prompt)

        log_node_warn("正在处理模型...")
        # 判断是否存在 模型或Lora叠加xyplot, 若存在优先缓存第一个模型
        xy_model_id = next((x for x in prompt if str(prompt[x]["class_type"]) in ["easy XYInputs: ModelMergeBlocks", "easy XYInputs: Checkpoint"]), None)
        xy_lora_id = next((x for x in prompt if str(prompt[x]["class_type"]) == "easy XYInputs: Lora"), None)
        if xy_lora_id is not None:
            can_load_lora = False
        if xy_model_id is not None:
            node = prompt[xy_model_id]
            if "ckpt_name_1" in node["inputs"]:
                ckpt_name_1 = node["inputs"]["ckpt_name_1"]
                model, clip, vae, clip_vision = easyCache.load_checkpoint(ckpt_name_1)
                can_load_lora = False
        # Load models
        elif model_override is not None and clip_override is not None and vae_override is not None:
            model = model_override
            clip = clip_override
            vae = vae_override
        elif model_override is not None:
            raise Exception(f"[ERROR] clip or vae is missing")
        elif vae_override is not None:
            raise Exception(f"[ERROR] model or clip is missing")
        elif clip_override is not None:
            raise Exception(f"[ERROR] model or vae is missing")
        else:
            model, clip, vae, clip_vision = easyCache.load_checkpoint(ckpt_name, config_name)

        if optional_lora_stack is not None and can_load_lora:
            for lora in optional_lora_stack:
                lora = {"lora_name": lora[0], "model": model, "clip": clip, "model_strength": lora[1], "clip_strength": lora[2]}
                model, clip = easyCache.load_lora(lora)
                lora['model'] = model
                lora['clip'] = clip
                pipe_lora_stack.append(lora)

        if lora_name != "None" and can_load_lora:
            lora = {"lora_name": lora_name, "model": model, "clip": clip, "model_strength": lora_model_strength,
                    "clip_strength": lora_clip_strength}
            model, clip = easyCache.load_lora(lora)
            pipe_lora_stack.append(lora)

        # Check for custom VAE
        if vae_name not in ["Baked VAE", "Baked-VAE"]:
            vae = easyCache.load_vae(vae_name)
        # CLIP skip
        if not clip:
            raise Exception("No CLIP found")

        positive_embeddings_final, positive_wildcard_prompt, model, clip = prompt_to_cond('positive', model, clip, clip_skip, pipe_lora_stack, positive, positive_token_normalization, positive_weight_interpretation, a1111_prompt_style, my_unique_id, prompt, easyCache)
        negative_embeddings_final, negative_wildcard_prompt, model, clip = prompt_to_cond('negative', model, clip, clip_skip, pipe_lora_stack, negative, negative_token_normalization, negative_weight_interpretation, a1111_prompt_style, my_unique_id, prompt, easyCache)
        image = easySampler.pil2tensor(Image.new('RGB', (1, 1), (0, 0, 0)))

        log_node_warn("处理结束...")
        pipe = {"model": model,
                "positive": positive_embeddings_final,
                "negative": negative_embeddings_final,
                "vae": vae,
                "clip": clip,

                "samples": samples,
                "images": image,
                "seed": 0,

                "loader_settings": {"ckpt_name": ckpt_name,
                                    "vae_name": vae_name,

                                    "lora_name": lora_name,
                                    "lora_model_strength": lora_model_strength,
                                    "lora_clip_strength": lora_clip_strength,

                                    "lora_stack": pipe_lora_stack,

                                    "refiner_ckpt_name": None,
                                    "refiner_vae_name": None,
                                    "refiner_lora_name": None,
                                    "refiner_lora_model_strength": None,
                                    "refiner_lora_clip_strength": None,

                                    "clip_skip": clip_skip,
                                    "a1111_prompt_style": a1111_prompt_style,
                                    "positive": positive,
                                    "positive_l": None,
                                    "positive_g": None,
                                    "positive_token_normalization": positive_token_normalization,
                                    "positive_weight_interpretation": positive_weight_interpretation,
                                    "positive_balance": None,
                                    "negative": negative,
                                    "negative_l": None,
                                    "negative_g": None,
                                    "negative_token_normalization": negative_token_normalization,
                                    "negative_weight_interpretation": negative_weight_interpretation,
                                    "negative_balance": None,
                                    "empty_latent_width": empty_latent_width,
                                    "empty_latent_height": empty_latent_height,
                                    "batch_size": batch_size,
                                    "seed": 0,
                                    "empty_samples": samples, }
                }

        return {"ui": {"positive": positive_wildcard_prompt, "negative": negative_wildcard_prompt}, "result": (pipe, model, vae, clip, positive_embeddings_final, negative_embeddings_final, samples)}

```
