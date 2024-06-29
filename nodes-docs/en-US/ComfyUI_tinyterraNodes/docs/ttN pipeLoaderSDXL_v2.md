---
tags:
- Image
- Pipeline
---

# pipeLoaderSDXL
## Documentation
- Class name: `ttN pipeLoaderSDXL_v2`
- Category: `ttN/pipe`
- Output node: `False`

This node is designed to load and initialize the Stable Diffusion XL model for image generation tasks, providing an enhanced version with optimizations for larger scale operations.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the Stable Diffusion XL model, crucial for loading the correct model version for image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`config_name`**
    - Defines the configuration name, essential for setting up the model with the appropriate parameters and optimizations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Names the VAE used in conjunction with the Stable Diffusion XL model, important for the image generation process and quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_skip`**
    - Determines the number of layers to skip in the CLIP model, affecting the integration of textual guidance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loras`**
    - Specifies LoRA modifications to apply, enhancing model capabilities with additional parameters.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`refiner_ckpt_name`**
    - Names the checkpoint for the refiner model, used to refine or alter the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`refiner_config_name`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`positive_g`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`positive_l`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`negative_g`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`negative_l`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`conditioning_aspect`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`conditioning_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`conditioning_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`crop_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`crop_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`target_aspect`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`target_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`target_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`positive_ascore`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`negative_ascore`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`empty_latent_aspect`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`empty_latent_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`empty_latent_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`seed`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
### Optional
- **`model_override`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`clip_override`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`optional_lora_stack`**
    - unknown
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `unknown`
- **`optional_controlnet_stack`**
    - unknown
    - Comfy dtype: `CONTROLNET_STACK`
    - Python dtype: `unknown`
- **`refiner_model_override`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`refiner_clip_override`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`prepend_positive_g`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`prepend_positive_l`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`prepend_negative_g`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`prepend_negative_l`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
## Output types
- **`sdxl_pipe`**
    - Comfy dtype: `PIPE_LINE_SDXL`
    - Provides the initialized Stable Diffusion XL pipeline, ready for image generation tasks.
    - Python dtype: `dict`
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the loaded model component of the Stable Diffusion XL pipeline.
    - Python dtype: `torch.nn.Module`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Outputs the positive conditioning component, guiding the image generation towards desired themes.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Outputs the negative conditioning component, steering the image generation away from undesired themes.
    - Python dtype: `str`
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the loaded VAE component, crucial for the image encoding and decoding processes.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Outputs the loaded CLIP model component, used for textual guidance in image generation.
    - Python dtype: `torch.nn.Module`
- **`refiner_model`**
    - Comfy dtype: `MODEL`
    - Provides the loaded refiner model component, used for refining or altering the generated images.
    - Python dtype: `torch.nn.Module`
- **`refiner_positive`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`refiner_negative`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`refiner_clip`**
    - Comfy dtype: `CLIP`
    - unknown
    - Python dtype: `unknown`
- **`latent`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
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
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeLoaderSDXL_v2:
    version = '2.0.0'
    @classmethod
    def INPUT_TYPES(cls):
        aspect_ratios = ["width x height [custom]",
                         "1024 x 1024 [S] 1:1",

                        "640 x 1536 [P] 9:21",
                        "704 x 1472 [P] 9:19",
                        "768 x 1344 [P] 9:16",
                        "768 x 1216 [P] 5:8",
                        "832 x 1216 [P] 2:3",
                        "896 x 1152 [P] 3:4",

                        "1536 x 640 [L] 21:9",
                        "1472 x 704 [L] 19:9",
                        "1344 x 768 [L] 16:9",
                        "1216 x 768 [L] 8:5",
                        "1216 x 832 [L] 3:2",
                        "1152 x 896 [L] 4:3",
                        ]
        relative_ratios = ["width x height [custom]",
                           "1x Empty Latent Aspect",
                           "2x Empty Latent Aspect",
                           "3x Empty Latent Aspect",
                           "4x Empty Latent Aspect",
                           "5x Empty Latent Aspect",
                           "6x Empty Latent ASpect",
                           "7x Empty Latent Aspect",
                           "8x Empty Latent Aspect",
                           ]

        return {"required": { 
                        "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                        "config_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),
                        "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
                        "clip_skip": ("INT", {"default": -2, "min": -24, "max": 0, "step": 1}),

                        "loras": ("STRING", {"placeholder": "Loras - <lora:loraName:weight:optClipWeight>", "multiline": True}),

                        "refiner_ckpt_name": (["None"] + folder_paths.get_filename_list("checkpoints"), ),
                        "refiner_config_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),

                        "positive_g": ("STRING", {"placeholder": "Linguistic Positive (positive_g)","multiline": True, "dynamicPrompts": True}),
                        "positive_l": ("STRING", {"placeholder": "Supporting Terms (positive_l)", "multiline": True, "dynamicPrompts": True}),
                        "negative_g": ("STRING", {"placeholder": "negative_g", "multiline": True, "dynamicPrompts": True}),
                        "negative_l": ("STRING", {"placeholder": "negative_l", "multiline": True, "dynamicPrompts": True}),

                        "conditioning_aspect": (relative_ratios, {"default": "2x Empty Latent Aspect"}),
                        "conditioning_width": ("INT", {"default": 2048.0, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "conditioning_height": ("INT", {"default": 2048.0, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        
                        "crop_width": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION}),
                        "crop_height": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION}),

                        "target_aspect": (relative_ratios, {"default": "1x Empty Latent Aspect"}),
                        "target_width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
                        "target_height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
                        
                        "positive_ascore": ("INT", {"default": 6.0, "min": 0, "step": 0.1}),
                        "negative_ascore": ("INT", {"default": 2.0, "min": 0, "step": 0.1}),

                        "empty_latent_aspect": (aspect_ratios, {"default": "1024 x 1024 [S] 1:1"}),
                        "empty_latent_width": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "empty_latent_height": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                        },                
                "optional": {
                    "model_override": ("MODEL",),
                    "clip_override": ("CLIP",),
                    "optional_lora_stack": ("LORA_STACK",),
                    "optional_controlnet_stack": ("CONTROLNET_STACK",),
                    "refiner_model_override": ("MODEL",),
                    "refiner_clip_override": ("CLIP",),
                    "prepend_positive_g": ("STRING", {"default": None, "forceInput": True}),
                    "prepend_positive_l": ("STRING", {"default": None, "forceInput": True}),
                    "prepend_negative_g": ("STRING", {"default": None, "forceInput": True}),
                    "prepend_negative_l": ("STRING", {"default": None, "forceInput": True}),
                    },
                "hidden": {"prompt": "PROMPT", "ttNnodeVersion": ttN_pipeLoaderSDXL_v2.version}, "my_unique_id": "UNIQUE_ID",}

    RETURN_TYPES = ("PIPE_LINE_SDXL" ,"MODEL", "CONDITIONING", "CONDITIONING", "VAE", "CLIP", "MODEL", "CONDITIONING", "CONDITIONING", "CLIP", "LATENT", "INT", "INT", "INT", "STRING", "STRING")
    RETURN_NAMES = ("sdxl_pipe","model", "positive", "negative", "vae", "clip", "refiner_model", "refiner_positive", "refiner_negative", "refiner_clip", "latent", "seed", "width", "height", "pos_string", "neg_string")


    FUNCTION = "sdxl_pipeloader"
    CATEGORY = "ttN/pipe"

    def sdxl_pipeloader(self, ckpt_name, config_name, vae_name, clip_skip, loras,
                        refiner_ckpt_name, refiner_config_name,
                        conditioning_aspect, conditioning_width, conditioning_height, crop_width, crop_height, target_aspect, target_width, target_height,
                        positive_g, positive_l, negative_g, negative_l,
                        positive_ascore, negative_ascore,
                        empty_latent_aspect, empty_latent_width, empty_latent_height, seed,
                        model_override=None, clip_override=None, optional_lora_stack=None, optional_controlnet_stack=None,
                        refiner_model_override=None, refiner_clip_override=None,
                        prepend_positive_g=None, prepend_positive_l=None, prepend_negative_g=None, prepend_negative_l=None,
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

        if refiner_ckpt_name not in ["None", None]:
            refiner_model, refiner_clip, refiner_vae = loader.load_main3(refiner_ckpt_name, refiner_config_name, vae_name, refiner_model_override, refiner_clip_override)
        else:
            refiner_model, refiner_clip, refiner_vae = None, None, None


        if empty_latent_aspect and empty_latent_aspect != "width x height [custom]":
            empty_latent_width, empty_latent_height = empty_latent_aspect.replace(' ', '').split('[')[0].split('x')

        if conditioning_aspect and conditioning_aspect != "width x height [custom]":
            conditioning_factor = conditioning_aspect.split('x')[0]
            conditioning_width = int(conditioning_factor) * int(empty_latent_width)
            conditioning_height = int(conditioning_factor) * int(empty_latent_height)

        if target_aspect and target_aspect != "width x height [custom]":
            target_factor = target_aspect.split('x')[0]
            target_width = int(target_factor) * int(empty_latent_width)
            target_height = int(target_factor) * int(empty_latent_height)


        positive_embedding, refiner_positive_embedding = loader.embedding_encodeXL(positive_g, clip, clip_skip, seed=seed, title='pipeLoaderSDXL Positive', my_unique_id=my_unique_id, prepend_text=prepend_positive_g, text2=positive_l, prepend_text2=prepend_positive_l, width=conditioning_width, height=conditioning_height, crop_width=crop_width, crop_height=crop_height, target_width=target_width, target_height=target_height, refiner_clip=refiner_clip, ascore=positive_ascore)
        negative_embedding, refiner_negative_embedding = loader.embedding_encodeXL(negative_g, clip, clip_skip, seed=seed, title='pipeLoaderSDXL Negative', my_unique_id=my_unique_id, prepend_text=prepend_negative_g, text2=negative_l, prepend_text2=prepend_negative_l, width=conditioning_width, height=conditioning_height, crop_width=crop_width, crop_height=crop_height, target_width=target_width, target_height=target_height, refiner_clip=refiner_clip, ascore=negative_ascore)


        if optional_controlnet_stack is not None:
            for cnt in optional_controlnet_stack:
                positive_embedding, negative_embedding = loader.load_controlNet(self, positive_embedding, negative_embedding, cnt[0], cnt[1], cnt[2], cnt[3], cnt[4])
                refiner_positive_embedding, refiner_negative_embedding = loader.load_controlNet(self, refiner_positive_embedding, refiner_negative_embedding, cnt[0], cnt[1], cnt[2], cnt[3], cnt[4])

        image = None

        sdxl_pipe = {"model": model,
                    "positive": positive_embedding,
                    "negative": negative_embedding,
                    "vae": vae,
                    "clip": clip,

                    "refiner_model": refiner_model,
                    "refiner_positive": refiner_positive_embedding,
                    "refiner_negative": refiner_negative_embedding,
                    "refiner_clip": refiner_clip,

                    "samples": samples,
                    "images": image,
                    "seed": seed,

                "loader_settings": {"ckpt_name": ckpt_name,
                                    "config_name": config_name,
                                    "vae_name": vae_name,
                                    "clip_skip": None,
                                    "loras": loras,

                                    "refiner_ckpt_name": refiner_ckpt_name,
                                    "refiner_config_name": refiner_config_name,
                                    "refiner_clip_skip": None,

                                    "model_override": model_override,
                                    "clip_override": clip_override,
                                    "optional_lora_stack": optional_lora_stack,
                                    "optional_controlnet_stack": optional_controlnet_stack,
                                    "refiner_model_override": refiner_model_override,
                                    "refiner_clip_override": refiner_clip_override,

                                    "prepend_positive_g": prepend_positive_g,
                                    "prepend_positive_l": prepend_positive_l,
                                    "prepend_negative_g": prepend_negative_g,
                                    "prepend_negative_l": prepend_negative_l,

                                    "conditioning_width": conditioning_width,
                                    "conditioning_height": conditioning_height,

                                    "positive_g": positive_g,
                                    "positive_l": positive_l,

                                    "negative_g": negative_g,
                                    "negative_l": negative_l,

                                    "positive_ascore": positive_ascore,
                                    "negative_ascore": negative_ascore,

                                    "empty_latent_width": empty_latent_width,
                                    "empty_latent_height": empty_latent_height,
                                    "seed": seed,
                                    "empty_samples": samples,}
        }

        final_positive = (prepend_positive_g + ' ' if prepend_positive_g else '') + (positive_g + ' ' if positive_g else '') + (prepend_positive_l + ' ' if prepend_positive_l else '') + (positive_l + ' ' if positive_l else '')
        final_negative = (prepend_negative_g + ' ' if prepend_negative_g else '') + (negative_g + ' ' if negative_g else '') + (prepend_negative_l + ' ' if prepend_negative_l else '') + (negative_l + ' ' if negative_l else '')

        return (sdxl_pipe, model, positive_embedding, negative_embedding, vae, clip, refiner_model, refiner_positive_embedding, refiner_negative_embedding, refiner_clip, samples, seed, empty_latent_width, empty_latent_height, final_positive, final_negative)

```
