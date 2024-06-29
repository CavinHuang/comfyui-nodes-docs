---
tags:
- Image
- Pipeline
---

# pipeLoader
## Documentation
- Class name: `ttN pipeLoader_v2`
- Category: `ttN/pipe`
- Output node: `False`

This node is designed to load and initialize pipelines for various tasks within the tinyterraNodes framework, facilitating the setup and configuration of data processing and model interaction pipelines.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for model initialization, allowing for the selection of different model states.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`config_name`**
    - Determines the configuration name, enabling the selection from various predefined settings.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`vae_name`**
    - Specifies the VAE model name, allowing for the selection of different VAE models for processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`clip_skip`**
    - An integer value to skip certain CLIP model layers, optimizing performance based on specific requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loras`**
    - A string specifying LoRA parameters, enabling dynamic adjustment of LoRA layers for model refinement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`positive`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`positive_token_normalization`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`positive_weight_interpretation`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`negative_token_normalization`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_weight_interpretation`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`empty_latent_aspect`**
    - Defines the aspect ratio for empty latent space initialization, setting the groundwork for image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`empty_latent_width`**
    - Specifies the width for empty latent space, determining the initial dimensions for image generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Specifies the height for empty latent space, determining the initial dimensions for image generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - An integer seed for random number generation, ensuring reproducibility across pipeline executions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`model_override`**
    - Allows for the override of the default model, enabling the use of alternative models within the pipeline.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip_override`**
    - Allows for the override of the default CLIP model, integrating alternative visual understanding capabilities.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`optional_lora_stack`**
    - Optional parameter to specify a stack of LoRA adjustments, enhancing model performance with custom configurations.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `str`
- **`optional_controlnet_stack`**
    - Optional parameter to specify a stack of ControlNet adjustments, enabling fine-tuned control over model behavior.
    - Comfy dtype: `CONTROLNET_STACK`
    - Python dtype: `str`
- **`prepend_positive`**
    - Optional text to prepend to positive conditioning, enriching the context for desired attributes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prepend_negative`**
    - Optional text to prepend to negative conditioning, refining the context for undesired attributes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated pipeline configuration after processing inputs.
    - Python dtype: `dict`
- **`model`**
    - Comfy dtype: `MODEL`
    - unknown
    - Python dtype: `unknown`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The processed positive conditioning, ready for use in the pipeline.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The processed negative conditioning, ready for use in the pipeline.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
- **`vae`**
    - Comfy dtype: `VAE`
    - unknown
    - Python dtype: `unknown`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model parameter, integrated based on the optional input.
    - Python dtype: `str`
- **`seed`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`width`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`height`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`pos_string`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`neg_string`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - A user interface component generated by the node, providing interactive or informative elements.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeLoader_v2:
    version = '2.0.0'
    @classmethod
    def INPUT_TYPES(cls):
        aspect_ratios = ["width x height [custom]",
                        "512 x 512 [S] 1:1",
                        "768 x 768 [S] 1:1",
                        "910 x 910 [S] 1:1",

                        "512 x 682 [P] 3:4",
                        "512 x 768 [P] 2:3",
                        "512 x 910 [P] 9:16",

                        "682 x 512 [L] 4:3",
                        "768 x 512 [L] 3:2",
                        "910 x 512 [L] 16:9",
                        
                        "512 x 1024 [P] 1:2",
                        "1024 x 512 [L] 2:1",
                        ]

        return {"required": { 
                        "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                        "config_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),
                        "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
                        "clip_skip": ("INT", {"default": -1, "min": -24, "max": 0, "step": 1}),

                        "loras": ("STRING", {"placeholder": "<lora:loraName:weight:optClipWeight>", "multiline": True}),

                        "positive": ("STRING", {"default": "Positive","multiline": True, "dynamicPrompts": True}),
                        "positive_token_normalization": (["none", "mean", "length", "length+mean"],),
                        "positive_weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),

                        "negative": ("STRING", {"default": "Negative", "multiline": True, "dynamicPrompts": True}),
                        "negative_token_normalization": (["none", "mean", "length", "length+mean"],),
                        "negative_weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),

                        "empty_latent_aspect": (aspect_ratios, {"default":"512 x 512 [S] 1:1"}),
                        "empty_latent_width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "empty_latent_height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                        },                
                "optional": {
                    "model_override": ("MODEL",), 
                    "clip_override": ("CLIP",), 
                    "optional_lora_stack": ("LORA_STACK",),
                    "optional_controlnet_stack": ("CONTROLNET_STACK",),
                    "prepend_positive": ("STRING", {"default": None, "forceInput": True}),
                    "prepend_negative": ("STRING", {"default": None, "forceInput": True}),
                    },
                "hidden": {"prompt": "PROMPT", "ttNnodeVersion": ttN_pipeLoader_v2.version}, "my_unique_id": "UNIQUE_ID",}

    RETURN_TYPES = ("PIPE_LINE" ,"MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "INT", "INT", "INT", "STRING", "STRING")
    RETURN_NAMES = ("pipe","model", "positive", "negative", "latent", "vae", "clip", "seed", "width", "height", "pos_string", "neg_string")

    FUNCTION = "adv_pipeloader"
    CATEGORY = "ttN/pipe"

    def adv_pipeloader(self, ckpt_name, config_name, vae_name, clip_skip,
                       loras,
                       positive, positive_token_normalization, positive_weight_interpretation, 
                       negative, negative_token_normalization, negative_weight_interpretation, 
                       empty_latent_aspect, empty_latent_width, empty_latent_height, seed,
                       model_override=None, clip_override=None, optional_lora_stack=None, optional_controlnet_stack=None, prepend_positive=None, prepend_negative=None,
                       prompt=None, my_unique_id=None):

        model: ModelPatcher | None = None
        clip: CLIP | None = None
        vae: VAE | None = None

        # Create Empty Latent
        latent = sampler.emptyLatent(empty_latent_aspect, 1, empty_latent_width, empty_latent_height)
        samples = {"samples":latent}

        # Clean models from loaded_objects
        loader.update_loaded_objects(prompt)

        model, clip, vae = loader.load_main3(ckpt_name, config_name, vae_name, loras, model_override, clip_override, optional_lora_stack)

        positive_embedding = loader.embedding_encode(positive, positive_token_normalization, positive_weight_interpretation, clip, clip_skip, seed=seed, title='pipeLoader Positive', my_unique_id=my_unique_id, prepend_text=prepend_positive)
        negative_embedding = loader.embedding_encode(negative, negative_token_normalization, negative_weight_interpretation, clip, clip_skip, seed=seed, title='pipeLoader Negative', my_unique_id=my_unique_id, prepend_text=prepend_negative)

        if optional_controlnet_stack is not None:
            for cnt in optional_controlnet_stack:
                positive_embedding, negative_embedding = loader.load_controlNet(self, positive_embedding, negative_embedding, cnt[0], cnt[1], cnt[2], cnt[3], cnt[4])

        image = None

        pipe = {"model": model,
                "positive": positive_embedding,
                "negative": negative_embedding,
                "vae": vae,
                "clip": clip,

                "samples": samples,
                "images": image,
                "seed": seed,

                "loader_settings": {"ckpt_name": ckpt_name,
                                    "vae_name": vae_name,

                                    "loras": loras,

                                    "model_override": model_override,
                                    "clip_override": clip_override,
                                    "optional_lora_stack": optional_lora_stack,
                                    "optional_controlnet_stack": optional_controlnet_stack,
                                    "prepend_positive": prepend_positive,
                                    "prepend_negative": prepend_negative,

                                    "refiner_ckpt_name": None,
                                    "refiner_vae_name": None,
                                    "refiner_lora1_name": None,
                                    "refiner_lora1_model_strength": None,
                                    "refiner_lora1_clip_strength": None,
                                    "refiner_lora2_name": None,
                                    "refiner_lora2_model_strength": None,
                                    "refiner_lora2_clip_strength": None,
                                    
                                    "clip_skip": clip_skip,
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
                                    "seed": seed,
                                    "empty_samples": samples,}
        }

        final_positive = (prepend_positive + ' ' if prepend_positive else '') + (positive + ' ' if positive else '')
        final_negative = (prepend_negative + ' ' if prepend_negative else '') + (negative + ' ' if negative else '')

        return (pipe, model, positive_embedding, negative_embedding, samples, vae, clip, seed, empty_latent_width, empty_latent_height, final_positive, final_negative)

```
