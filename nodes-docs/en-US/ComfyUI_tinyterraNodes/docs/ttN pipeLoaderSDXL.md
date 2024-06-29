---
tags:
- Image
- Pipeline
---

# pipeLoaderSDXL v1 (Legacy)
## Documentation
- Class name: `ttN pipeLoaderSDXL`
- Category: `ttN/legacy`
- Output node: `False`

The `ttN pipeLoaderSDXL` node is designed to load and initialize large-scale models specifically tailored for the ComfyUI environment, facilitating the seamless integration and utilization of advanced deep learning models within custom pipelines.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model to be loaded, crucial for initializing the model with pre-trained weights.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Identifies the VAE model to be loaded, essential for the generation or manipulation of images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora1_name`**
    - Names the first LoRA model to be applied, allowing for adaptive adjustments to the model's behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora1_model_strength`**
    - Defines the strength of the first LoRA model's influence on the model, adjusting how significantly the model's outputs are modified.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora1_clip_strength`**
    - Specifies the strength of the first LoRA model's influence on CLIP, tuning the interaction between text and image representations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora2_name`**
    - Names the second LoRA model, enabling further customization of the model's output through additional adaptive adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora2_model_strength`**
    - Defines the strength of the second LoRA model's influence on the model, further customizing output modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora2_clip_strength`**
    - Specifies the strength of the second LoRA model's influence on CLIP, further tuning the interaction between text and image representations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_ckpt_name`**
    - Specifies the checkpoint name for the refiner model, essential for refining the outputs with another set of pre-trained weights.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`refiner_vae_name`**
    - Identifies the VAE model used for refining, crucial for the post-processing or enhancement of generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`refiner_lora1_name`**
    - Names the first LoRA model used in refining, allowing for adaptive adjustments to the refiner model's behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`refiner_lora1_model_strength`**
    - Defines the strength of the first LoRA model's influence on the refiner model, adjusting the refinement process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_lora1_clip_strength`**
    - Specifies the strength of the first LoRA model's influence on CLIP during refinement, tuning the refined interaction between text and image representations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_lora2_name`**
    - Names the second LoRA model used in refining, enabling further customization of the refinement process through additional adaptive adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`refiner_lora2_model_strength`**
    - Defines the strength of the second LoRA model's influence on the refiner model, further customizing the refinement modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_lora2_clip_strength`**
    - Specifies the strength of the second LoRA model's influence on CLIP during refinement, further tuning the refined interaction between text and image representations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_skip`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`positive`**
    - Specifies the positive prompts or conditions to guide the model's generation towards desired themes or concepts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`positive_token_normalization`**
    - Determines the method for normalizing positive tokens, affecting how the model interprets and weights these inputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive_weight_interpretation`**
    - Defines how the model should interpret the weight of positive inputs, influencing the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative`**
    - Specifies the negative prompts or conditions to avoid in the model's generation, helping to steer clear of undesired themes or concepts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_token_normalization`**
    - Determines the method for normalizing negative tokens, affecting how the model interprets and weights these inputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative_weight_interpretation`**
    - Defines how the model should interpret the weight of negative inputs, influencing the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`empty_latent_width`**
    - Specifies the width of the empty latent space to be generated, setting the dimensions for image generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Specifies the height of the empty latent space to be generated, setting the dimensions for image generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`seed`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`sdxl_pipe`**
    - Comfy dtype: `PIPE_LINE_SDXL`
    - Outputs the enhanced pipeline configuration, incorporating the specified models, conditionings, and settings for further processing.
    - Python dtype: `dict`
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the main model component loaded and configured for use, ready for integration into the pipeline.
    - Python dtype: `str`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Generates conditioning that aligns with the specified positive inputs, tailored to guide the model towards desired themes.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Generates conditioning that avoids specified negative inputs, ensuring outputs remain within desired content boundaries.
    - Python dtype: `str`
- **`vae`**
    - Comfy dtype: `VAE`
    - Returns the VAE component used in the pipeline, crucial for image generation and manipulation.
    - Python dtype: `str`
- **`clip`**
    - Comfy dtype: `CLIP`
    - Provides the CLIP model component, enabling advanced text-to-image and image-to-text processing capabilities.
    - Python dtype: `str`
- **`refiner_model`**
    - Comfy dtype: `MODEL`
    - Returns the refiner model component, used for further refining and enhancing the generated outputs.
    - Python dtype: `str`
- **`refiner_positive`**
    - Comfy dtype: `CONDITIONING`
    - Generates conditioning that aligns with the specified positive inputs for the refiner model, tailored to refine outcomes towards desired themes.
    - Python dtype: `str`
- **`refiner_negative`**
    - Comfy dtype: `CONDITIONING`
    - Generates conditioning that avoids specified negative inputs for the refiner model, ensuring refined outputs remain within desired content boundaries.
    - Python dtype: `str`
- **`refiner_vae`**
    - Comfy dtype: `VAE`
    - Returns the VAE component used for refining, crucial for the enhancement of generated images.
    - Python dtype: `str`
- **`refiner_clip`**
    - Comfy dtype: `CLIP`
    - Provides the CLIP model component used in refining, enabling enhanced text-to-image and image-to-text processing capabilities during refinement.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Outputs the latent representation used in the pipeline, essential for controlling the generative aspects of the model.
    - Python dtype: `str`
- **`seed`**
    - Comfy dtype: `INT`
    - Returns the seed value used for initializing random processes, ensuring reproducibility of the pipeline's outputs.
    - Python dtype: `int`
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
